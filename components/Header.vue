<template>
  <div class="header-container">
    <div class="header-left">
      <i :class="icon" class="header-icon" @click="collapse"></i>
    </div>
    <div class="header-center">
      <i class="el-icon-sugar" ></i>

      <span class="header-title">  欢迎使用Coze-Ai停车寻车导航管理系统！</span>
    </div>
    <el-dropdown class="header-dropdown">
      <span class="el-icon-s-custom">{{ user.name }}</span>
      <i class="el-icon-arrow-down header-dropdown-icon"></i>
      <el-dropdown-menu slot="dropdown" class="dropdown-menu">
        <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      user: JSON.parse(sessionStorage.getItem('CurUser'))
    }

  },
  props:{
    icon:String
  },
  methods:{
    toUser(){
      console.log('to_user');
      this.$router.push('/Home')
    },
    logout(){
      console.log("logout")
      this.$confirm("您确定要退出登录吗？","提示", {
        confirmButtonText:'确定',
        type:"warning",
        center:true,
      }).then(()=>{
        this.$message({
          type: 'success',
          message: '退出登录成功',
        });
        // 清除会话存储中的所有数据
        sessionStorage.clear();
        // 导航到主页
        this.$router.push('/');
        // 刷新页面以重置登录状态
        window.location.reload();
        }).catch(()=>{
        this.$message({
          type:'info',
          message:'已取消退出登录'
        })
      })


    },
    collapse(){
      this.$emit('doCollapse')
    }
  }
}
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
}

.header-left {
  margin-top: 8px;
  margin-right: 10px;
}

.header-icon {
  font-size: 20px;
  cursor: pointer;
}

.header-center {
  flex: 1;
  text-align: center;
}

.header-title {
  font-size: 25px;
  color: #333;
  font-family: 华文琥珀;
}

.header-dropdown {
  margin-left: auto;
}

.header-dropdown-icon {
  margin-left: 5px;
}

.dropdown-menu {
  margin-top: -20px;
  margin-right: -10px;
}
</style>