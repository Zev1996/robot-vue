<template>     
    <div class="control">
           <mt-header title='设备详情' >
    <a slot="left">
      <mt-button icon="back" @click="toback()">back</mt-button> 
    </a>
    </mt-header>
   <div id="myChart" :style="{width:'320px',height:'520px'}"></div>
        
    </div> 
</template>
<script>
import { Indicator } from 'mint-ui';
var data0 = [];
var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var data5 = [];
var data6 = [];
var data7 = [];
export default {
  props: {},
  data() {
    return {
      client: new Paho.MQTT.Client("222.201.144.236", 8001, "test"),
     
      option:{
           title: {
        text: 'idle'
    },
      legend: {  y:'bottom',     
                bottom:0,  
                position:"center"             
            },
    tooltip: {
        trigger: 'axis',
        
    },
    xAxis: {
        type: 'time',
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        }
    }, 
      }
      
    
    };
  },
  mounted(){
    this.CpuStatDonut(); 
  },
  methods: {
    toback() {
           this.client.disconnect();
          this.$router.go(-1);
      
    },
    CpuStatDonut(){
      let myChart=this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption(this.option);
    },
    updata(res){
     var now = new Date();
     var hours =now.getHours();
     var minutes=now.getMinutes();
     var seconds=now.getSeconds();
     if(hours<10){ hours='0'+hours};
     if(minutes<10){ minutes='0'+minutes};
     if(seconds<10){ seconds='0'+seconds};
     var value=[];
     var time = [now.getFullYear(), now.getMonth(), now.getDay()].join('/') +' '+[hours, minutes,seconds].join(':');
     for(var i=0;i<=7;i++){
         value[i]=[time,res.data[i].idle];
     }
        data0.push(value[0]);
        data1.push(value[1]);
        data2.push(value[2]);
        data3.push(value[3]);
        data4.push(value[4]);
        data5.push(value[5]);
        data6.push(value[6]);
        data7.push(value[7]);
        
          let myChart=this.$echarts.init(document.getElementById('myChart'))
    myChart.setOption({
           series: [{
        name: 'CPU-0',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data0
    },
    {
        name: 'CPU-1',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data1
    },
    {
        name: 'CPU-2',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data2
    },
    {
        name: 'CPU-3',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data3
    },
    {
        name: 'CPU-4',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data4
    },
    {
        name: 'CPU-5',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data5
    },
    {
        name: 'CPU-6',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data6
    },
    {
        name:'CPU-7',
        type:'line', 
        showSymbol:false, 
        data:data7
        
    },
   ]
    });
    },
       onConnect: function() {
      console.log("connected");
      this.client.subscribe("/"+localStorage.getItem('dev_id')+"/monitor/+");
    },

    onMessageArrived(message) {
        var res= JSON.parse(message.payloadString) 
           if (message.destinationName === "/"+localStorage.getItem('dev_id')+'/monitor/cpu_stat') {
            console.log(res);
            this.updata(res);
           
          
           }
 
     }
    
    
    
  },
  created(){
     
      this.client.connect({ userName: '123', password: '123', onSuccess: this.onConnect, useSSL:true}); // 连接服务器并注册连接成功处理事件
    this.client.onMessageArrived = this.onMessageArrived; // 注册消息接收处理事件
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

