<template>
  <div id="app" class="allbg">
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    /*Index*/
  },
  data(){
    return{
      user : JSON.parse(sessionStorage.getItem('CurUser')),
    }
  },
  watch:{
    '$store.state.menu':{
      handler(val,old){
        if(!old && this.user && this.user.no){
          this.$store.commit("setMenu",val)
        }
      },
      immediate:true
    }
  }
}
</script>

<style>
#app {
  height: 100%;

}
.allbg{
  background-image: url('assets/image/背景2.jpg');
  opacity: 0.8;
  background-size: cover;
  background-position: center;
  width: 100%;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
