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
var last1 = [];
var last5 = [];
var last15=[];
export default {
  props: {},
  data() {
    return {
      client: new Paho.MQTT.Client("222.201.144.236", 8001, "test"),
     
      option:{
           title: {
        text: 'avgload'
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
     var time = [now.getFullYear(), now.getMonth(), now.getDay()].join('/') +' '+[hours, minutes,seconds].join(':');
  
        last1.push([time,res.data.last1])
        last5.push([time,res.data.last5])
        last15.push([time,res.data.last15])
          let myChart=this.$echarts.init(document.getElementById('myChart'))
    myChart.setOption({
           series: [{
        name: 'Last minute',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: last1
    },
    {
        name:'Last 5minute',
        type:'line', 
        showSymbol:false, 
        data:last5
        
    },
     {
        name:'Last 15minute',
        type:'line', 
        showSymbol:false, 
        data:last15
        
    }
   ]
    });    
    },
       onConnect: function() {
      console.log("connected");
      this.client.subscribe("/"+localStorage.getItem('dev_id')+"/monitor/+");
    },

    onMessageArrived(message) {
        var res= JSON.parse(message.payloadString) 
           if (message.destinationName === "/"+localStorage.getItem('dev_id')+'/monitor/cpu_avgload') {
          
            this.updata(res);
            // console.log(res);
          
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

