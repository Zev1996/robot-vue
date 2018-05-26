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
export default {
  props: {},
  data() {
    return {
      client: new Paho.MQTT.Client("222.201.144.236", 8001, "test"),

    };
  },
  mounted() {
    this.CpuStatDonut();
    // this.CpuStatIdle();
  },
  methods: {
    toback() {
      this.client.disconnect();
      this.$router.go(-1);
     
    },
   
    updatedount(res) {

      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        series: [
          {
            data: [
              { value: res.data.all.user, name: "user" },
              { value: res.data.all.nice, name: "nice" },
              { value: res.data.all.system, name: "system" },
              { value: res.data.all.idle, name: "idle" },
              { value: res.data.all.iowait, name: "iowait" },
              { value: res.data.all.irq, name: "irq" },
              { value: res.data.all.soft, name: "softirq" },
              { value: res.data.all.steal, name: "steal" },
              { value: res.data.all.guest, name: "guest" },
              { value: res.data.all.gnice, name: "guestnice" }
            ]
          }
        ]
      });
    },
    CpuStatDonut() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
         
          y:'bottom',
        
          data: [
            "user",
            "nice",
            "system",
            "idle",
            "iowait",
            "irq",
            "softtirq",
            "steal",
            "guest",
            "guestnice"
          ]
        },
        series: [
          {
            // name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          }
        ]
      });
    },
    updateCpuIdleChartData(res) {},

    onConnect: function() {
      console.log("connected");
      // this.client.send("/1/cmd", "monitor_open");
      this.client.subscribe("/"+localStorage.getItem('dev_id')+"/monitor/+");
    },

    onMessageArrived(message) {
      var res = JSON.parse(message.payloadString);
      if (message.destinationName === "/"+localStorage.getItem('dev_id')+"/monitor/cpu_stat") {
        this.updatedount(res);
        console.log(res);
      }
    }
  },
  created: function() {
    
    this.client.connect({
      userName: "123",
      password: "123",
      onSuccess: this.onConnect,
      useSSL: true
    }); // 连接服务器并注册连接成功处理事件
    // this.client.publish("/1/cmd", "monitor_open");
    this.client.onMessageArrived = this.onMessageArrived; // 注册消息接收处理事件
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>