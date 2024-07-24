<template>
  <div class="right">
    <el-scrollbar height="400px">
      <!-- 聊天区域 -->
      <div class="allReply" v-for="(item, index) in messages" :key="item.id">
        <!-- 左侧回复 -->
        <div class="chat" v-if="!item.deleted&&item.textSystem!=null">
          <img src="../../assets/image/gpt.png" alt="GPT Logo" class="chatgptLogo" v-if="isGptShow" />
          <div class="chat-messages">
            <div class="message">
              <div v-html="item.textSystem" class="content"></div>
              <div class="date">
                {{ formatTimestamp(item.timestamp) }}
              </div>
              <div class="delate" @click="delateMsg(index)">
                <i class="el-icon-delete"></i>
                <div class="text">删除</div>
              </div>
              <div class="copy" @click="copyMsg(index)">
                <i class="el-icon-copy-document"></i>
                <div class="text">复制</div>
              </div>
            </div>
            <div class="question-buttons"  v-if="index == messages.length -1">
              <!-- 使用 v-for 循环创建按钮 -->
              <button
                  v-for="(questionText, index) in questions"
                  :key="index"
                  class="button-basic question-button"
                  @click="sendQuestion(questionText)"
              >
                {{ questionText }}
              </button>
            </div>
          </div>

        </div>
        <!-- 右侧发送 -->
        <div class="chat2" v-if="!item.deleted2&&item.text!=null">
          <div class="chat-messages2">
            <div class="message">
              <div class="content" v-html="item.text"></div>
              <div class="date">
                {{ formatTimestamp(item.timestamp) }}
              </div>
              <div class="delate2" @click="delateMsg(index)">
                <div class="text">删除</div>
                <i class="el-icon-delete"></i>
              </div>
              <div class="copy2" @click="copyMsg(index)">
                <div class="text">复制</div>
                <i class="el-icon-copy-document"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div class="chat-input">
      <el-input
          v-model="input"
          @keyup.enter.native="sendMessage"
          :placeholder=hint
          :disabled="control"
          type="textarea"
          :rows="3"
          autosize
          :style="{ maxHeight: '100px', overflowY: 'auto' }"></el-input>
      <div class="clear" @click="clearInput">
        <i class="el-icon-brush"></i>
        <div class="text" style="color: #007bff">清空输入</div>
      </div>
      <el-button
          class="button"
          type="primary"

          @click="sendMessage"
      >发送</el-button>
    </div>



   </div>
</template>

<script >
import {Message, MessageBox} from "element-ui";
import axios from "axios";

export default {
  data() {
    return {
      messages: [], // 总回复
      input: '',
      isGptShow: false,
      //控制输入框是否能输出
      control:false,
      //控制输出框的hint
      hint:'试着输入点什么...',
      answer:[],
      answer1:'',
      questions:[],
    };
  },
  methods: {
    async sendPostRequest() {
      const url = 'https://api.coze.cn/open_api/v2/chat';
      const headers = {
        'Authorization': 'your-Authorization',
        'Accept': '*/*',
       'Host': 'api.coze.cn',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
      };

      var data = {
        "conversation_id": "123",
        "bot_id":"your-bot-id",
        "user": "user-id",
        "query": this.input,
        "stream": false,
      };

      try {
        this.input = '';
        const response = await axios.post(url, data, { headers });
      console.log(response.data.messages)
        this.answer1=''
        this.answer=[];
        var j=0;
        for(var i=0;i<response.data.messages.length;i++){
          // 变
          if(response.data.messages[i].type == 'answer') {
            this.answer[j++]=response.data.messages[i].content.replace(/\n/g, '<br>');
            this.answer1+=response.data.messages[i].content.replace(/\n/g, '<br>');
          }
        }
        var question = [];
        for(var i = 0; i < response.data.messages.length; i++) {
          if(response.data.messages[i].type == 'follow_up') {
            question.push(response.data.messages[i].content);
          }
        }
        this.questions = question; // 将问题数组赋值给 Vue 实例的数据属性
        // 输出解析并填充后的对象
       console.log(this.answer);

        const newMessage = {
          id: Date.now(),
          text: null,
          textSystem: this.answer1, // 使用函数返回值作为系统回复
          timestamp: new Date(),
        };
        this.messages.push(newMessage);


        this.$nextTick(() => { // 使用 this.$nextTick
          const messageElements = document.getElementsByClassName('message');
          const lastMessageElement = messageElements[messageElements.length - 1];
          lastMessageElement.scrollIntoView({behavior: 'smooth', block: 'end'});
          this.control=false;
          this.hint='试着输入点什么...'
        });


      } catch (error) {
        console.error('Error:', error);
        this.responseData = 'Error occurred. Check the console for details.';
      }
    },

    sendMessage() {
      this.isGptShow = true;
      var a=this.input
      this.sendPostRequest();


      const newMessage = {
        id: Date.now(),
        text: a,
        textSystem: null, // 使用函数返回值作为系统回复
        timestamp: new Date(),
      };
      this.messages.push(newMessage);

      this.$nextTick(() => { // 使用 this.$nextTick
        const messageElements = document.getElementsByClassName('message');
        const lastMessageElement = messageElements[messageElements.length - 1];
        lastMessageElement.scrollIntoView({behavior: 'smooth', block: 'end'});
      });
      this.control=true;
      this.hint="请耐心等待结果"

    },
    // 定义 processJsonData 函数，用于处理 JSON 数据并返回系统回复
    processJsonData(input) {
      // 这里可以写处理 JSON 数据的逻辑
      // 例如，解析输入的 JSON 并根据内容生成回复
      try {
        const jsonData = JSON.parse(input);
        // 根据解析的 JSON 数据来生成回复
        return jsonData;
      } catch (error) {
        // 如果输入不是有效的 JSON，返回错误信息
        return '输入的不是有效的 JSON 数据';
      }
    },
    sendQuestion(questionText) {
      // 将问题文本设置为输入框的值
      this.input = questionText;
      // 调用 sendMessage 方法发送问题
      this.sendMessage();
    },
    clearInput() {
      this.input = '';
    },
    formatTimestamp(timestamp) {
      return new Intl.DateTimeFormat('default', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(timestamp);
    },
    copyMsg(index) {
      try {
        let textToCopy; // 声明变量用于保存要复制的文本

        // 检查消息是否被标记为删除
        if (this.messages[index].deleted2) {
          textToCopy = ''; // 如果是用户消息且被删除，则不复制任何内容
        } else if (this.messages[index].deleted) {
          textToCopy = ''; // 如果是系统消息且被删除，则不复制任何内容
        } else {
          // 根据消息类型复制相应的文本
          textToCopy = this.messages[index].text || this.messages[index].textSystem;
        }
        // 创建临时 textarea 元素来执行复制操作
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed'; // 防止出现滚动条
        document.body.appendChild(textarea);
        // 选择文本并尝试复制
        textarea.select();
        const success = document.execCommand('copy');
        // 从 DOM 中移除 textarea
        document.body.removeChild(textarea);
        // 根据复制操作是否成功显示相应的消息
        if (success) {
          Message({
            type: 'success',
            message: '复制成功',
          });
        } else {
          Message({
            type: 'error',
            message: '复制失败，请手动复制',
          });
        }
      } catch (err) {
        console.error('复制出错:', err);
        Message({
          type: 'error',
          message: '复制出错，请手动复制',
        });
      }
    },
    delateMsg(index) {
      MessageBox.confirm('是否删除此数据吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // 移除消息
        this.messages.splice(index, 1);

        Message({
          type: 'success',
          message: '删除成功',
        });
      }).catch(() => {
        // 用户点击取消时的操作，如有需要
      });
    },
  },
};
</script>

<style lang="less" scoped>

.cardTop {
  margin-bottom: 20px;
  color: #27264d;
  font-size: 32px;
  opacity: 0.85;
  display: flex;
}
  .right {
    flex: 1; // 确保右侧容器占据可用空间
    display: flex;
    flex-direction: column; // 使用列布局
    min-height: 0; // 确保容器可以缩小以适应内容
    position: relative; // 为绝对定位的子元素提供参考

    // 公共区域
    .message {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      position: relative;
      margin-bottom: 10px;
      .content {
        font-size: 16px;
        line-height: 1.8;
        height: auto;
        background: #f4f6f8;
        padding: 10px 5px;
        border: 1px solid #ccc;
        border-radius: 7px;
        word-wrap: break-word;
        flex-wrap: wrap;
        cursor: default; /* 将光标设置为默认样式 */
        font-family: 'Microsoft YaHei', '微软雅黑', sans-serif; /* 设置字体族为微软雅黑 */
      }

      .date {
        position: absolute;
        align-self: flex-start;
        bottom: -20px;
        right: 0;
        color: #ccc;
        font-size: 14px;
      }
      .delate {
        position: absolute;
        align-self: flex-end;
        bottom: 0px;
        right: -60px;
        display: flex;
        align-items: center;
        .text {
          color: #1296db;
          opacity: 0;
          padding-left: 5px;
        }
      }
      .delate:hover {
        cursor: pointer;
      }
      .delate:hover .text {
        opacity: 1;
      }
      .copy {
        position: absolute;
        align-self: flex-end;
        bottom: 30px;
        right: -60px;
        display: flex;
        align-items: center;
        .text {
          color: #1296db;
          opacity: 0;
          padding-left: 5px;
        }
      }
      .copy:hover {
        cursor: pointer;
      }
      .copy:hover .text {
        opacity: 1;
      }
    }

    // 左侧系统的输出
    .chat {
      padding: 10px;
      display: flex;
      flex-direction: column;
      position: relative;
      flex-grow: 1;
      margin-bottom: 20px;
      .chatgptLogo {
        width: 42px;
        height: 26px;
        position: absolute;
        top: 0px;
      }

      .chat-messages {
        flex-grow: 1;
        margin-right: 200px;
        height: auto; /* 让聊天内容区域自适应内容高度 */
        border-radius: 10px; /* 设置圆角 */
        padding: 15px; /* 内边距 */
        min-width: 400px;
      }
      /* 基础按钮样式 */
      .button-basic {
        padding: 6px 12px; /* 减小内边距 */
        font-size: 0.875rem; /* 减小字体大小 */
        color: #ffffff;
        background-color: #0056b3;
        border: none;
        border-radius: 6px; /* 减小圆角 */
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        outline: none;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
      }

      /* 鼠标悬停时的按钮样式 */
      .button-basic:hover {
        background-color: #007bff;
        transform: translateY(-1px); /* 轻微上移 */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      /* 定义问题按钮样式 */
      .question-button {
        margin: 3px 6px; /* 减小按钮之间的水平间距 */
        //margin-bottom: 15px; /* 减小按钮与下方内容的垂直间距 */
      }

      /* 响应式设计 */
      @media (max-width: 768px) {
        .button-basic {
          padding: 8px 16px; // 在小屏幕上保持较小的内边距
          font-size: 0.85rem; /* 在小屏幕上进一步减小字体大小 */
        }
      }

      /* 按钮组的布局 */
      .button-group {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px; /* 减小按钮之间的间隔 */
        margin-top: 20px; /* 减小按钮组与消息内容的间距 */
      }
    }

    // 右侧自己的输出
    .chat2 {
      padding: 10px;
      display: flex;
      flex-direction: column;
      position: relative;
      flex-grow: 1;
      margin-bottom: 20px;
      .chat-messages2 {
        margin-left: 200px;
        height: auto;;
        flex-grow: 1;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        max-height: 350px; // 设置最大高度限制
        border-radius: 10px; // 设置圆角
        padding: 15px; // 内边距

        .delate2 {
          position: absolute;
          align-self: flex-end;
          bottom: 0px;
          left: -60px;
          display: flex;
          align-items: center;
          .text {
            color:#007bff;
            opacity: 0;
            padding-left: 5px;
          }
        }
        .delate2:hover {
          cursor: pointer;
        }
        .delate2:hover .text {
          opacity: 1;
        }
        .copy2 {
          position: absolute;
          align-self: flex-end;
          bottom: 30px;
          left: -60px;
          display: flex;
          align-items: center;
          .text {
            color: #1296db;
            opacity: 0;
            padding-left: 5px;
          }
        }
        .copy2:hover {
          cursor: pointer;
        }
        .copy2:hover .text {
          opacity: 1;
        }
      }
    }

    // 输入框区域
    .chat-input {
      position: fixed; // 固定位置
      align-items: center;
      height:25px;
      bottom: 0; // 底部对齐
      width: 86%; // 宽度
      display: flex;

      justify-content: space-between;
      padding: 10px;
      background-color: #F0F0F0; /* 输入框部分的背景颜色 */
      z-index: 1000; // 确保输入框在页面其他元素之上
      box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1); // 添加阴影以提升层次感

      .clear {
        width: 40px;
        height: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        .text {
          color: #1296db;
          opacity: 0;
          padding-left: 5px;
        }
      }

      .clear:hover {
        cursor: pointer;
        width: 100px;
      }
    }
  }
  :deep(.el-card__body) {
    display: flex;
    width: 100%;
  }
  :deep(.el-input__inner) {
    white-space: pre-wrap;
    word-break: break-all;
    height: 27px;
  }

</style>