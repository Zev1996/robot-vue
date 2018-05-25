<template>
  <div id="app"> 
    <!-- <transition name="slide-fade">    -->
    <router-view/>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
      return {
          transitionName:''
      }
      },
  watched:{
      $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
     
        //设置动画名称
        this.transitionName = 'slide-left';
      }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
