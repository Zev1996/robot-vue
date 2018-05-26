<template>     
    <div class="control">
           <mt-header title='CPU详情' >
    <a slot="left">
      <mt-button icon="back" @click="toback()">back</mt-button> 
    </a>
    </mt-header>
   <div class="tablearea">
     <div class="box1">
      
      <div class="span" @click="tocpudount()">
       <img src='./Pie.png'>
       <h3>Allstate</h3>
      </div> 
      <div class="span"  @click="tocpuidle()">
       <img src='./Line.png'>
       <h3>Idle</h3>
      </div> 
      <div class="span"  @click="tocpugroup()">
       <img src='./Line.png'>
       <h3>UserGroup</h3>
      </div> 
      <div class="span" @click="tocpuirqgroup()">
       <img src='./Line.png'>
       <h3>IrqGroup</h3>
      </div> 
      <div class="span"  @click="tocpuirq()">
       <img src='./Line.png'>
       <h3>Irq</h3>
      </div> 
      <div class="span" @click="tocpunettxirq()"> 
       <img src='./Line.png'>
       <h3>NettxIrq</h3>
      </div> 
      <div class="span" @click="tocpunetrxirq()">
       <img src='./Line.png'>
       <h3>NettrxIrq</h3>
      </div> 
      <div class="span" @click="tocputaskletirq()">
       <img src='./Line.png'>
       <h3>TaskletIrq</h3>
      </div> 
      <div class="span"  @click="tocpuhrtimerirq()">
       <img src='./Line.png'>
       <h3>HrTimerIrq</h3>
      </div> 
      <div class="span" @click="tocpuavgload()">
       <img src='./Line.png'>
       <h3>Avgload</h3>
      </div> 
      <div class="span" @click="toprocrankfreevspie()">
       <img src='./Pie.png'>
       <h3>Freevs</h3>
      </div> 
      <div class="span" @click="toprocrankpsspie()">
       <img src='./Pie.png'>
       <h3>Pss</h3>
      </div> 
      <div class="span" @click="toiostat()">
       <img src='./Line.png'>
       <h3>iostat</h3>
      </div> 
      <div class="span" @click="tolinestyle()">
       <img src='./Line.png'>
       <h3>开启</h3>
      </div> 
      <div class="span" @click="topiestyle()">
       <img src='./Line.png'>
       <h3>关闭</h3>
      </div>
       
     </div>
    
   </div>
    </div> 
</template>
<script>
export default {
  data() {
    return {
      client: new Paho.MQTT.Client("222.201.144.236", 8001, "test"),

    };
  },
  created(){
    //      this.client.connect({
    //   userName: "123",
    //   password: "123",
    //   onSuccess: this.onConnect,
    //   useSSL: true
    // }); // 连接服务器并注册连接成功处理事件
  },
  methods: {
    toback() {
      this.$router.go(-1);
  },
  onConnect: function() {
      console.log("connected");
      // this.client.send("/1/cmd", "monitor_open");
      this.client.subscribe("/"+localStorage.getItem('dev_id')+"/monitor/+");
    },
    tocpudount(){
      this.$router.push('/cpudount')
    },
     tocpuidle(){ 
      this.$router.push('/cpuidle')
    },
    tocpugroup(){
      this.$router.push('/cpugroup')
    },
    tocpuirqgroup(){
      this.$router.push('/cpuirqgroup')
    },
    tocpuirq(){
      this.$router.push('/cpuirq')
    },
    tocpunettxirq(){
      this.$router.push('/cpunettxirq')
    },
    tocpunetrxirq(){
      this.$router.push('/cpunetrxirq')
    },
    tocputaskletirq(){
      this.$router.push('/cputaskletirq')
    },
    tocpuhrtimerirq(){
      this.$router.push('/cpuhrtimerirq')
    },
    tocpuavgload(){
      this.$router.push('/cpuavgload')
    },
    toprocrankfreevspie(){
      this.$router.push('/procrankfreevspie')
    },
    toprocrankpsspie(){
      this.$router.push('/procrankpsspie')
    },
    toiostat(){
      this.$router.push('/iostat')
    },
     tolinestyle(){
      // this.$router.push('/linestyle')
       this.client.connect({
      userName: "123",
      password: "123",
      onSuccess: this.onConnect,
      useSSL: true
    }); // 连接服务器并注册连接成功处理事件
     setTimeout(function(){
                        this.client.send("/"+localStorage.getItem('dev_id')+"/cmd", "monitor_open");
                  }.bind(this),10000)
    
      
    },
     topiestyle(){
       
      // this.$router.push('/piestyle')
       this.client.connect({
      userName: "123",
      password: "123",
      onSuccess: this.onConnect,
      useSSL: true
    }); // 连接服务器并注册连接成功处理事件
     setTimeout(function(){
                        this.client.send("/"+localStorage.getItem('dev_id')+"/cmd", "monitor_close");
                  }.bind(this),2000)
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.control{
  min-height: 100vh;
  background: #f2f2f6
}
.tablearea{
  margin-top: 20px;
}
  .span{
  background: #fff;
  margin:auto 3px auto 3px;
}
.box1{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px 100px 100px 100px;
  /* margin: 5px,auto */
 
  /* flex-wrap: wrap; */
}
.btn {
  /* margin-top: 3px; */
  /* display: flex; */
  width: 70px;
  height: 70px;
  margin-top:15px;
  margin-left: 5px;
  /* line-height: 32px; */
  /* border: none;
  background-color: #2394bc;
  color: #fff; */
   /* flex-wrap: wrap; */
  /* font-size: 14px; */
  /* border-radius: 10px; */
};



</style>