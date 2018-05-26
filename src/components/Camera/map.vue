<template>     
    <div class="control">
      <div class="header">
             <mt-header title='地图详情'>
      <a slot="left">
      <mt-button icon="back" @click="toback()">back</mt-button> 
    </a>
    </mt-header>
      </div>
      <div class="body">
          <img id="imgid"  :src="imgaddress" @click="getpoint($event)">
          <!-- <img id="imgid"  src="./map.png" @click="getpoint($event)"> -->
      </div>
      <div class="footer">      
          <button @click="getmap()"  class="bt">获取地图</button>
          <!-- <button @click="big()">放大</button>
          <button @click="small()">缩小</button> -->
      </div>
        

          
    </div>    
</template>
<script>
export default {
  props: {},
  data() {
    return {
      imgaddress:'',
      client: new Paho.MQTT.Client("222.201.144.236", 8001, "test"),
      width:'',
      height:'',
      i:''
    };
  },
  methods: {
    toback() {
      this.client.disconnect();
      this.$router.go(-1);
    },
    big(){
      var imgobj=document.getElementById("imgid");
       console.log(imgobj.width);
       console.log(imgobj.height);
       this.width=imgobj.width/300;
       this.height=imgobj.height/300;
       imgobj.width=300
       imgobj.height=300
       this.i+=1
    },
     small(){
      var imgobj=document.getElementById("imgid");
       console.log(imgobj.width);
       console.log(imgobj.height);
       this.width=imgobj.width;
       this.height=imgobj.height;
       imgobj.width=this.width/2;
       imgobj.height=this.height/2;
       this.i-=1
    },
    getmap(){
      this.client.send("/"+localStorage.getItem('dev_id')+"/map/webcmd",'{"data":"map_open"}')
    },
    getpoint(obj){
      this.client.send("/"+localStorage.getItem('dev_id')+"/map/webgoal",
      '{"data":"Go_To ('+obj.offsetX+','+obj.offsetY+')"}')
    },


    onConnect: function() {
      console.log("connected");
      this.client.subscribe("/"+localStorage.getItem('dev_id')+"/map/webpgm");
    },

    onMessageArrived(message) {  
       var res = JSON.parse(message.payloadString);
       this.imgaddress="data:image/jpeg;base64,"+res.data;    
    },
  
  },
  created: function() {
    this.client.connect({ userName: '123', password: '123', onSuccess: this.onConnect, useSSL:true}); // 连接服务器并注册连接成功处理事件
    this.client.onMessageArrived = this.onMessageArrived; // 注册消息接收处理事件
   
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.control{
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
 
  .body{
    flex:1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
.bt{
    width:100%;
    height: 40px;
    background-color: #2394bc;
    color: #fff;
    border: 1px solid
  }
</style>

