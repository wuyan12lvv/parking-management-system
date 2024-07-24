<template>
  <div class="main">
    <h1 class="welcome-text">{{ welcomeMessage }} {{ user.name }}</h1>
    <el-descriptions class="profile" title="个人中心" border>
      <el-descriptions-item label="账号">{{ user.no }}</el-descriptions-item>
      <el-descriptions-item label="电话">{{ user.phone }}</el-descriptions-item>
      <el-descriptions-item label="性别">
        <el-tag :type="userSexType" effect="dark">
          <i :class="userSexIcon"></i> {{ userSexText }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="角色">
        <el-tag type="success" effect="dark">{{ userRoleText }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="管理">
        <el-button size="small" type="primary" @click="editUser">修改个人信息</el-button>
      </el-descriptions-item>
    </el-descriptions>

    <el-dialog
        title="编辑用户信息"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
        custom-class="user-dialog"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="账号" prop="no">
          <el-input v-model="form.no" disabled></el-input>
        </el-form-item>
        <el-form-item label="名字" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>
    <date-utils class="current-date"></date-utils>
  </div>
</template>

<script>
import DateUtils from "@/components/DateUtils";

export default {
  name: "Home",
  components: { DateUtils },
  data() {
    return {
      user: {},
      centerDialogVisible: false,
      form: {
        id: '',
        no: '',
        name: '',
        password: '',
        age: '',
        phone: '',
        sex: '0',
      },
      rules: {
        no: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 9, message: '长度在 4 到 9 个字符', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { validator: this.checkAge, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    welcomeMessage() {
      return '欢迎您！';
    },
    userSexType() {
      return this.user.sex === 1 ? 'primary' : 'success';
    },
    userSexIcon() {
      return this.user.sex === 1 ? 'el-icon-male' : 'el-icon-female';
    },
    userSexText() {
      return this.user.sex === 1 ? '男' : '女';
    },
    userRoleText() {
      return this.user.roleId === 0 ? '超级管理员' : this.user.roleId === 1 ? '管理员' : '用户';
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.user = JSON.parse(sessionStorage.getItem("CurUser"));
      console.log(this.user);
    },
    resetForm() {
      this.$refs.form.resetFields();
      this.form = {
        id: '',
        no: '',
        name: '',
        password: '',
        age: '',
        phone: '',
        sex: '0',
        // roleId: '2',
      };
    },
    editUser() {
      this.centerDialogVisible = true;
      this.$nextTick(() => {
        this.form = {
          id: this.user.id,
          no: this.user.no,
          name: this.user.name,
          password: '',
          age: this.user.age,
          phone: this.user.phone,
          sex: this.user.sex.toString(),
          // roleId: this.user.roleId.toString(),
        };
      });
    },
    checkAge(rule, value, callback) {
      if (value > 150) {
        callback(new Error('年龄输入过大'));
      } else {
        callback();
      }
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.id) {
            this.doMod();
          } else {
            this.doSave();
          }
            this.$message({
              type: 'success',
              message: '修改信息成功',
            });
            // 清除会话存储中的所有数据
            sessionStorage.clear();
            // 导航到主页
            this.$router.push('/');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      location.reload();
    },
    doSave() {
      this.$axios.post(this.$httpUrl + '/user/save', this.form).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
          this.centerDialogVisible = false;
          this.loadPost();
          this.resetForm();

        } else {
          this.$message({
            message: '操作失败！',
            type: 'error'
          });
        }
      });
    },
    doMod() {
      this.$axios.post(this.$httpUrl + '/user/update', this.form).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
          this.centerDialogVisible = false;
          this.loadPost();
          this.resetForm();
        } else {
          this.$message({
            message: '操作失败！',
            type: 'error'
          });
        }
      });
    },
    loadPost() {
      this.$axios.get(this.$httpUrl + '/user/list').then(res => {
        this.tableData = res.data;
      });
    },
  }
};
</script>

<style scoped>
.main {
  margin: 30px;
  padding: 25px;
  border: 2px solid #ebeef5;
  border-radius: 8px;
  background-image: url('../assets/image/背景3.jpg');
  background-size: cover;
  background-position: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
  color: #ffffff;
}

.welcome-text {
  font-family: 爱奇艺黑体;
  font-size: 30px;
  text-align: center;
  color: #333333;
  margin-bottom: 30px;
}

.profile {
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
}

.current-date {
  font-family: 爱奇艺黑体;
  font-size: 20px;
  text-align: center;
  color: #333333;
  margin-top: 20px;
}

.dialog-footer {
  text-align: right;
}

.current-date {
  margin-top: 20px;
  text-align: center;
}

</style>