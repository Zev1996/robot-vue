<template>     
    <div class="control">
           <mt-header title='监控详情' >
    <a slot="left">
      <mt-button icon="back" @click="toback()">back</mt-button> 
    </a>
    </mt-header>
        <div class="video" >
          <img class="image" width="320px" height="240px" :src="src1">
         
          </div>
          <div class="switch">
             <button class="bt" @click="getpoint()">获取地图</button>
            <button @click="open()" class="bt">开</button>
            <button @click="close()" class="bt">关</button>
          </div>
           <div class="control-area">
             
            <div class="bigbox">
                <div class="sw">
               <i class="iconfont  icon-arrow-up" @click="move_up()"></i>
            </div>
            <div class="box">
             
           <i class="iconfont  icon-arrow-left" @click="move_left()"></i>
           <i class="iconfont  icon-iconset0486" @click="move_stop()"></i>
           <i class="iconfont  icon-arrow-right" @click="move_right()"></i>
            </div>
            <div class="sw">
               <i class="iconfont  icon-arrow-down" @click="move_down()"></i>
            </div>
            </div>
          </div>
    </div>    
</template>
<script>
export default {
  props: {},
  data() {
    return {
      src1: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525253730487&di=f0263828ffc3f58d692dc82b2e49e3a8&imgtype=0&src=http%3A%2F%2Fwangboxyk.cn%2Ftemplates%2Fzb_users%2Fupload%2F2014%2F9%2F2014092063218705.jpg',

      client: new Paho.MQTT.Client("222.201.144.236", 8001, "test")
    };
  },
  methods: {
    toback() {
      this.client.disconnect();
      this.$router.go(-1);
    },
    getpoint(){
       this.$router.push('/map')
    },

    onConnect: function() {
      console.log("connected");
      this.client.subscribe("/1/mcamera/0");
    },

    onMessageArrived(message) {
      var blob = new Blob([message.payloadBytes], { type: "image/jpeg" });
      this.src1 = window.URL.createObjectURL(blob);
    },
    move_up() {
      this.client.send("/5/webmove",'{"data":"Move_Forward"}');
    },
    move_down() {
      console.log("down");
       this.client.send("/5/webmove",'{"data":"Move_Back"}');
    },
    move_left() {
      console.log("left");
       this.client.send("/5/webmove",'{"data":"Turn_L"}');
    },
    move_stop(){
       this.client.send("/5/webmove",'{"data":"Stop"}');
    },
    move_right() {
      console.log("right");
       this.client.send("/5/webmove",'{"data":"Turn_R"}');
    },
    open(){
        this.client.send("/1/cmd", "mcamera_open");
    },
    close(){
       this.client.send("/1/cmd", "mcamera_close");
    }
  },
  created: function() {
    this.client.connect({ userName: '123', password: '123', onSuccess: this.onConnect, useSSL:true}); // 连接服务器并注册连接成功处理事件
    this.client.onMessageArrived = this.onMessageArrived; // 注册消息接收处理事件
   
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.control {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.video {
  /* flex: 0 1 1; */
  flex: 1;
  display: flex;
    justify-content: center;
    align-items: center;
  
}
.switch{
  display: flex
}
  .bt{
    width:50%;
    background-color: #2394bc;
    color: #fff;
    border: 1px solid
  }
.iconfont {
  font-size: 40px;
  font-weight: 1000;
}
.box {
  display: flex;
  justify-content: space-between;
}
.sw{
  display: flex;
  justify-content: center;
}
.control-area {
  background: rgb(176, 221, 219)
}
.bigbox {
  width: 130px;
  text-align: center;
  margin: 0 auto;
 
}
</style>

