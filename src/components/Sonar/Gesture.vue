<template>     
    <div class="control">
           <mt-header title='设备详情' >
    <a slot="left">
      <mt-button icon="back" @click="toback()">back</mt-button> 
    </a>
    </mt-header>
    
  
   <div id="myChart" :style="{width:'320px',height:'520px'}"></div>
   <mt-switch v-model="value_bundle">bundle开关</mt-switch>
   <mt-switch v-model="value_replay">replay</mt-switch>
   <button @click="open()">开始录制</button>
   <button @click="close()">结束录制</button>
        
    </div> 
</template>
<script>
import { Switch } from 'mint-ui';
var data0 = [];
export default {
  props: {},
  data() {
    return {
      client: new Paho.MQTT.Client("222.201.144.236", 8001, "test"),
      value_replay:false,
      value_bundle:false,
      topic:"/"+localStorage.getItem('dev_id')+"/gesture/0/realtime",
      topic_replay:"/"+localStorage.getItem('dev_id')+"/gesture/0/replay",
      option: {
        left: 'center',
        top: 'middle',
        title: {
          text: "gesture"
        },
         grid:{
        left:"18%"
          },
        legend: {
          y: "bottom",
          bottom: 0,
          position: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          min:'dataMin',
          max:'dataMax',
          axisTick:{
            inside:true
            },
          //  minInterval: 0.1,
          boundaryGap: [0, "100%"],
          splitLine: {
            show: false
          }
        }
      }
    };
  },
  mounted() {
    this.CpuStatDonut();
  },
  watch:{
    value_replay: function(){
      if(this.value_replay===true){
           this.client.unsubscribe(this.topic);
           data0=[];
          this.client.send("/"+localStorage.getItem('dev_id')+"/gesture/0/timemachine", "replay_open");
          this.client.subscribe(this. topic_replay);      
   
      }else if(this.value_replay===false){
         this.client.send("/"+localStorage.getItem('dev_id')+"/gesture/0/timemachine", "replay_close");
         data0=[];
         this.client.unsubscribe(this. topic_replay);
         this.client.subscribe(this.topic);
      
      }
    },
     value_bundle: function(){
      if(this.value_bundle===true){
         this.client.send("/"+localStorage.getItem('dev_id')+"/cmd", "bundle_open");
         console.log("open...");
      }else if(this.value_bundle===false){
       this.client.send("/"+localStorage.getItem('dev_id')+"/cmd", "bundle_close");
      console.log("close...");
      data0.splice(0,data0.length);
      
      }
    }
  },
  methods: {
    toback() {
      this.client.disconnect();
      this.$router.go(-1);
    },
    open() {
     this.client.send("/"+localStorage.getItem('dev_id')+"/gesture/0/timemachine", "record_open");
     console.log('开始录制。。')
    },
    close() {
     this.client.send("/"+localStorage.getItem('dev_id')+"/gesture/0/timemachine", "record_close");
     console.log('结束录制。。')
    },
    CpuStatDonut() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption(this.option);
    },
    updata(res) {
      if (data0.length >= 50) {
        data0.splice(0, 1);
      }
      data0.push([res.ts, res.val]);
     
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        series: [
          {
            name: "Gesture",
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            data: data0
          }
        ]
      });
    },
    onConnect: function() {
      console.log("connected");
      this.client.subscribe(this.topic);
      
    },
   

    onMessageArrived(message) {
      
        
        var res = JSON.parse(message.payloadString);
        console.log(res);
      this.updata(res);
     
     
    }
  },
  created() {
    this.client.connect({
      userName: "123",
      password: "123",
      onSuccess: this.onConnect,
      useSSL: true
    }); // 连接服务器并注册连接成功处理事件
    this.client.onMessageArrived = this.onMessageArrived; // 注册消息接收处理事件
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

