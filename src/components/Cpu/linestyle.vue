<template>
  
  <div  @click="cli($event)" class="map">
    eww
  </div>
</template>

<script>
export default {
  methods:{
    cli(obj){
      console.log(obj);
    }
  }
}
</script>


<style scoped>
  .map{
    width: 60px;
    height: 60px;
    background-color: red;
    align-items: center;
    vertical-align: middle;
    text-align: center
  }
</style>
