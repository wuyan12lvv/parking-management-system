<template>
  <!-- 将所有顶级元素包裹在一个父元素中 -->
  <div class="all">
    <el-container class="up">
      <el-main>
        <!-- 轮播图组件 -->
        <el-carousel :interval="5000" arrow="always" type="card">
          <el-carousel-item v-for="(item, index) in carouselImages" :key="index">
            <img :src="item" class="carousel-image" alt="轮播图">
          </el-carousel-item>
        </el-carousel>
      </el-main>
    </el-container>
    <!-- 加载器 -->
<!--    <div class="page-container">-->
      <!-- 上方内容 -->
    <el-container class="under">
      <el-container class="top-content">

        <el-container>
          <div class="textbox">欢迎您开始体验我们的Coze-AI智能交互平台
            这里融合了扣子（Coze）的先进语言模型API和火山引擎的强大云服务能力</div>
        </el-container>

          <el-container class="loader">
            <div class="box box-1">
              <div class="side-left"></div>
              <div class="side-right"></div>
              <div class="side-top"></div>
            </div>
            <div class="box box-2">
              <div class="side-left"></div>
              <div class="side-right"></div>
              <div class="side-top"></div>
            </div>
            <div class="box box-3">
              <div class="side-left"></div>
              <div class="side-right"></div>
              <div class="side-top"></div>
            </div>
            <div class="box box-4">
              <div class="side-left"></div>
              <div class="side-right"></div>
              <div class="side-top"></div>
            </div>
          </el-container>
      </el-container>

      <el-container class="bottom-content">
          <el-container class="cube-loader">
            <div class="cube-top"></div>
            <div class="cube-wrapper">
              <span style="--i:0" class="cube-span"></span>
              <span style="--i:1" class="cube-span"></span>
              <span style="--i:2" class="cube-span"></span>
              <span style="--i:3" class="cube-span"></span>
            </div>
          </el-container>

        <el-container >
          <div class="textbox">立即开始使用---探索智能交互的新境界</div>
        </el-container>

      </el-container>
    </el-container>
<el-container class="but">
    <button @click="navigateToChatManage">
      开始使用 CozeAi
    </button>
</el-container>
  </div>
</template>

<script>
export default {
  name: "IndexMain",
  data() {
    return {
      // 轮播图图片数组
      carouselImages: [
        require('../../assets/image/gpt.png'),
        require('../../assets/image/gpt1.png'),
        require('../../assets/image/gpt2.png')
      ]
    };
  },
  methods: {
    navigateToChatManage() {
      this.$router.push('/chat');
    }
  }
};
</script>

<style lang="less" scoped>
.carousel-image {
  width: 100%;
  height: 100%;
  display: block; /* 避免图片下方有空隙 */
}

.all {
  flex: 1; // 确保右侧容器占据可用空间
  display: flex;
  flex-direction: column; // 使用列布局
  min-height: 0; // 容器可以缩小以适应内容
  position: relative;
  justify-content: center;
  }

.up {
  margin-bottom: 20px; /* 增加上下间距 */
  //width: auto;
}

.under {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
}

.top-content, .bottom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.textbox {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
}

.textbox-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.textbox {
  color: #323232;
  font-size: 30px;
  margin-top: 10px;
  text-align: center; /* 文本居中 */
  word-wrap: break-word; /* 允许文本换行 */
  width: 600px;
}

.loader {
  scale: 3;
  height: 50px;
  width: 80px;
}

    .box {
      position: relative;
      opacity: 0;
      left:150px;
    }

    .side-left {
      position: absolute;
      background-color: #286cb5;
      width: 19px;
      height: 5px;
      transform: skew(0deg, -25deg);
      top: 14px;
      left: 10px;
    }

    .side-right {
      position: absolute;
      background-color: #2f85e0;
      width: 19px;
      height: 5px;
      transform: skew(0deg, 25deg);
      top: 14px;
      left: -9px;
    }

    .side-top {
      position: absolute;
      background-color: #5fa8f5;
      width: 20px;
      height: 20px;
      rotate: 45deg;
      transform: skew(-20deg, -20deg);
    }

    .box-1 {
      animation: from-left 4s infinite;
    }

    .box-2 {
      animation: from-right 4s infinite;
      animation-delay: 1s;
    }

    .box-3 {
      animation: from-left 4s infinite;
      animation-delay: 2s;
    }

    .box-4 {
      animation: from-right 4s infinite;
      animation-delay: 3s;
    }

    @keyframes from-left {
      0% {
        z-index: 20;
        opacity: 0;
        translate: -20px -6px;
      }

      20% {
        z-index: 10;
        opacity: 1;
        translate: 0px 0px;
      }

      40% {
        z-index: 9;
        translate: 0px 4px;
      }

      60% {
        z-index: 8;
        translate: 0px 8px;
      }

      80% {
        z-index: 7;
        opacity: 1;
        translate: 0px 12px;
      }

      100% {
        z-index: 5;
        translate: 0px 30px;
        opacity: 0;
      }
    }

    @keyframes from-right {
      0% {
        z-index: 20;
        opacity: 0;
        translate: 20px -6px;
      }

      20% {
        z-index: 10;
        opacity: 1;
        translate: 0px 0px;
      }

      40% {
        z-index: 9;
        translate: 0px 4px;
      }

      60% {
        z-index: 8;
        translate: 0px 8px;
      }

      80% {
        z-index: 7;
        opacity: 1;
        translate: 0px 12px;
      }

      100% {
        z-index: 5;
        translate: 0px 30px;
        opacity: 0;
      }
    }

.cube-loader {
  position: relative;
  width: 75px;
  height: 75px;
  transform-style: preserve-3d;
  animation: animate 4s linear infinite;
  left: -380px;
}

@keyframes animate {
  0% {
    transform: rotateX(-30deg) rotateY(0);
  }

  100% {
    transform: rotateX(-30deg) rotateY(360deg);
  }
}

.cube-loader .cube-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.cube-loader .cube-wrapper .cube-span {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotateY(calc(90deg * var(--i))) translateZ(37.5px);
  background: linear-gradient(
      to bottom,
      hsl(330, 3.13%, 25.1%) 0%,
      hsl(177.27, 21.71%, 32.06%) 5.5%,
      hsl(176.67, 34.1%, 36.88%) 12.1%,
      hsl(176.61, 42.28%, 40.7%) 19.6%,
      hsl(176.63, 48.32%, 43.88%) 27.9%,
      hsl(176.66, 53.07%, 46.58%) 36.6%,
      hsl(176.7, 56.94%, 48.91%) 45.6%,
      hsl(176.74, 62.39%, 50.91%) 54.6%,
      hsl(176.77, 69.86%, 52.62%) 63.4%,
      hsl(176.8, 76.78%, 54.08%) 71.7%,
      hsl(176.83, 83.02%, 55.29%) 79.4%,
      hsl(176.85, 88.44%, 56.28%) 86.2%,
      hsl(176.86, 92.9%, 57.04%) 91.9%,
      hsl(176.88, 96.24%, 57.59%) 96.3%,
      hsl(176.88, 98.34%, 57.93%) 99%,
      hsl(176.89, 99.07%, 58.04%) 100%
  );
}

.cube-top {
  position: absolute;
  width:75px;
  height:75px;
  background: hsl(330, 3.13%, 25.1%) 0%;
  /* width 75px / 2 = 37.5px */
  transform: rotateX(90deg) translateZ(37.5px);
  transform-style: preserve-3d;
}
.cube-top::before {
  content: '';
  position: absolute;
  width: 75px;
  height: 75px;
  background: hsl(176, 42%, 40%);
  transform: translateZ(-90px);
  filter: blur(10px);
  box-shadow: 0 0 10px #323232,
  0 0 20px hsl(176, 42%, 40%),
  0 0 30px #323232,
  0 0 40px hsl(176, 42%, 40%);
}
.but {
  button {
    width: 10em;
    height: 3.5em;
    border: 3px ridge #149CEA;
    outline: none;
    background-color: transparent; /* 设置背景为透明 */
    color: darkslategray;
    transition: 1s;
    border-radius: 0.3em;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    text-align: center;
    line-height: 3.5em;
  }

  button::after {
    content: "";
    position: absolute;
    top: -10px;
    left: 3%;
    width: 95%;
    height: 40%;
    background-color: transparent;
    transition: 0.5s;
    transform-origin: center;
  }

  button::before {
    content: "";
    transform-origin: center;
    position: absolute;
    top: 30%;
    left: 3%;
    width: 30%;
    height: 20%;
    background-color: transparent;
    transition: 0.5s;
  }

  button:hover::before, button:hover::after {
    transform: scale(0)
  }

  button:hover {
    box-shadow: inset 0px 0px 25px #1479EA;
  }
}
</style>