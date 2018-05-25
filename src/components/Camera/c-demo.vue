
<template>
    <div  class="main" v-show="showFlag">
      <div class="routerview">
        <div class="control" v-show="showControl">
           <mt-header title='设备详情' >
    <a slot="left">
      <mt-button icon="back" @click="toback()">back</mt-button> 
    </a>
    </mt-header>
          <div class="vedio" >
             <img width="320px" height="240px"  :src="bsrc">
             <!-- <img width="320px" height="240px"  :src="[bsrc+'?'+time]"> -->
              
          </div>
          <div class="control-area">
            <div class="bigbox">
                <div class="up">
               <i class="iconfont  icon-arrow-up" @click="move_up()"></i>
            </div>
            <div class="box">
             
           <i class="iconfont  icon-arrow-left" @click="move_left()"></i>
           <i class="iconfont  icon-arrow-right" @click="move_right()"></i>
            </div>
            <div class="down">
               <i class="iconfont  icon-arrow-down" @click="move_down()"></i>
            </div>
            </div>
 
          </div>
        </div>
        <div class="infomation" v-show="showInfo">
            123
        </div>
      </div>     
      <div class="btn">
      <div class="btn-item" @click="control">监控</div>
      <div class="btn-item" @click="info">详情</div>
      <div class="btn-item" @click="exit">退出</div>
      </div>
    
    </div>
    
    
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js" type="text/javascript"></script>
<script>
export default {
  props: {},
  data() {
    return {
      showFlag: true,
      showControl: true,
      showInfo: false,
      // time:new Date().getTime(),
      bsrc: [localStorage.getItem("src") + "?" + new Date().getTime()],
      client: new Paho.MQTT.Client("222.201.144.236", 8001, "test")
    };
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    exit() {
      this.$router.go(-1);
    },
    control() {
      this.showInfo = false;
      this.showControl = true;
    },
    info() {
      this.showControl = false;
      this.showInfo = true;
    },
    toback() {
      this.$router.go(-1);
    },

    onConnect: function() {
      console.log("connected");
      this.client.subscribe("/1/mcamera/0");
    },

    onMessageArrived(message) {
      var blob = new Blob([message.payloadBytes], { type: "image/jpeg" });
      var src1 = window.URL.createObjectURL(blob);
      localStorage.setItem("src", src1);
      console.log(src1);
    },
    move_up() {
      console.log("up");
    },
    move_down() {
      console.log("down");
    },
    move_left() {
      console.log("left");
    },
    move_right() {
      console.log("right");
    }
  },
  created: function() {
    // this.client.connect({ userName: '123', password: '123', onSuccess: this.onConnect, useSSL:true}); // 连接服务器并注册连接成功处理事件
    // this.client.onMessageArrived = this.onMessageArrived; // 注册消息接收处理事件
    localStorage.setItem(
      "src",
      "http://img4.imgtn.bdimg.com/it/u=241170661,3235713291&fm=27&gp=0.jpg"
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 30;
  width: 100%;
}
.routerview {
  width: 100%;
  height: 70%;
  background: #fff;
}
.control {
  width: 100%;
  height: 100%;
}
.vedio {
  background: #456;
  height: 70%;
}
.controlarea {
  background: #9fa;
  height: 30%;
}
.infomation {
  background: #66f;
  width: 100%;
  height: 100%;
}

.btn {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #4f1;
}
.btn-item {
  flex: 1;
  text-align: center;
}
.iconfont {
  font-size: 40px;
  font-weight: 1000
}
.box {
  display: flex;
  justify-content: space-between;
}
.control-area {
  text-align: center;
}
  .bigbox{
    width: 150px;
    text-align: center;
    margin:0 auto;
    
  }
</style>

