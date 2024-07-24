<template>
  <div class="loginBody" @keyup.enter.native="comfirm">
    <div class="loginDiv">
      <div class="login-content">
        <h1 class="login-title">用户登录</h1>
        <el-form :model="loginForm" label-width="100px" :rules="rules" ref="loginForm">
          <el-form-item label="账号/电话" prop="identifier" >
            <el-input style="width: 200px;" type="text" v-model="loginForm.identifier" autocomplete="off" size="small">
            </el-input>
          </el-form-item>
          <el-form-item label="类型" prop="identifierType">
            <el-select v-model="loginForm.identifierType" placeholder="请选择">
              <el-option label="账号" value="no"></el-option>
              <el-option label="电话号码" value="phone"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input style="width: 200px;" type="password" v-model="loginForm.password" show-password autocomplete="off" size="small">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="goToRegister">注册</el-button>
            <el-button type="primary" @click="comfirm" :disabled="confirm_disabled">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginHome",
  data() {
    return {
      confirm_disabled: false,
      loginForm: {
        identifier: '',
        identifierType: 'no', // 默认为账号
        password: ''
      },
      rules: {
        identifier: [
          { required: true, message: '请输入账号或电话号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        identifierType: [
          { required: true, message: '请选择账号或电话号码类型', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    comfirm() {
      this.confirm_disabled = true;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let loginData = {
            [this.loginForm.identifierType]: this.loginForm.identifier,
            password: this.loginForm.password
          };
          this.$axios.post(this.$httpUrl + "/user/login", loginData).then(res => res.data).then(res => {
            if (res.code == 200) {
              sessionStorage.setItem("CurUser", JSON.stringify(res.data.user));
              console.log(res.data);
              this.$store.commit("setMenu", res.data.menu);
              console.log("this.$store.state.menu = " + this.$store.state.menu);
              this.$router.replace('/IndexMain');
            } else {
              this.confirm_disabled = false;
              alert("效验失败，用户名或者密码错误！");
              return false;
            }
          });
        } else {
          this.confirm_disabled = false;
          console.log("效验失败");
          return false;
        }
      });
    },
    goToRegister() {
      this.$router.push('/register');
    }
  }
};
</script>

<style scoped>
.loginBody {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../assets/image/背景2.jpg");
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.loginDiv {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 330px;
  border-radius: 5%;
  background-image: url("../assets/image/背景1.jpg");
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  font-family: "Microsoft YaHei", "微软雅黑", sans-serif;
}

.login-title {
  margin: 20px 0;
  text-align: center;
}

.login-content {
  width: 400px;
  height: 250px;
  position: absolute;
  top: 25px;
  left: 25px;
}
</style>