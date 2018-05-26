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
var mmcblk0_w = [];
var mmcblk0_r = [];
var mmcblk1_w = [];
var mmcblk1_r = [];
var mmcblk1boot0_w = [];
var mmcblk1boot0_r = [];
var mmcblk1boot1_w = [];
var mmcblk1boot1_r = [];
export default {
  props: {},
  data() {
    return {
      client: new Paho.MQTT.Client("222.201.144.236", 8001, "test"),
     
      option:{
           title: {
        text: 'idle'
    },
    tooltip: {
        trigger: 'axis',
        
    },
    legend: {  y:'bottom',     
                bottom:0,  
                position:"center"             
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
     var mm=res.data.disks
     var time = [now.getFullYear(), now.getMonth(), now.getDay()].join('/') +' '+[now.getHours(), now.getMinutes(), now.getSeconds()].join(':');
    
        mmcblk0_w.push([time,mm.mmcblk0.wkbs]);
        mmcblk0_r.push([time,mm.mmcblk0.rkbs]);
        mmcblk1_w.push([time,mm.mmcblk1.wkbs]);
        mmcblk1_r.push([time,mm.mmcblk1.rkbs]);
        mmcblk1boot0_w.push([time,mm.mmcblk1boot0.wkbs]);
        mmcblk1boot0_r.push([time,mm.mmcblk1boot0.rkbs]);
        mmcblk1boot1_w.push([time,mm.mmcblk1boot1.wkbs]);
        mmcblk1boot1_r.push([time,mm.mmcblk1boot1.rkbs]);
        
        

          let myChart=this.$echarts.init(document.getElementById('myChart'))
    myChart.setOption({
           series: [{
        name: 'mmcblk0_w',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: mmcblk0_w
    },
    {
        name:'mmcblk0_r',
        type:'line', 
        showSymbol:false, 
        data:mmcblk0_r
        
    },
     {
        name:'mmcblk1_w',
        type:'line', 
        showSymbol:false, 
        data:mmcblk1_w
        
    },
    {
        name:'mmcblk1_r',
        type:'line', 
        showSymbol:false, 
        data:mmcblk1_r
        
    },
    {
        name:'mmcblk1boot0_w',
        type:'line', 
        showSymbol:false, 
        data:mmcblk1boot0_w
        
    },
    {
        name:'mmcblk1boot0_r',
        type:'line', 
        showSymbol:false, 
        data:mmcblk1boot0_r
        
    },
    {
        name:'mmcblk1boot1_w',
        type:'line', 
        showSymbol:false, 
        data:mmcblk1boot1_w
        
    },
    {
        name:'mmcblk1boot1_r',
        type:'line', 
        showSymbol:false, 
        data:mmcblk1boot1_r
        
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
           if (message.destinationName === "/"+localStorage.getItem('dev_id')+'/monitor/io_status') {
          
         
            // console.log(res);
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

