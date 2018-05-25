<template>
  <div class="devinfo">
    <mt-header   title='设备详情' >
    <a slot="left">
      <mt-button icon="back" @click="toback()">back</mt-button> 
    </a>
    </mt-header>
    <ul class="wrapper">
       <li @click="tomain(sensor.sensorname)" v-for="sensor in sensor_list" class="container">
          <div >
          <!-- <span>数量：{{sensor.sensorcnt}}</span> 
           <span>链接：{{sensor.sensorurl}}</span> -->
           <!-- <span>类型：{{sensor.sensorname}}</span> -->
           <img width="110px" height="110px" :src='sensor.url'>
           <div class="span">{{sensor.sensorname}}</div>
          </div>
        </li>
      </ul>
    
      
          
  </div>
  
</template>

<script>
export default {
  
  data(){
    return{

      sensor_list:[],
      devicename:{},
      sensorurl:''
      
    };
  },

  created(){
      let device_id = this.$route.params.id;
       this.$http.get(`http://222.201.144.236:8000/robot/api/v1/devices/${device_id}/`).then((response)=>{
      response=response.body.sensor_list;
      console.log(response);
      for(var i=0;i<response.length;i++){
        if(response[i].sensorname==="mcamera"){
          response[i]["url"]="/static/mcamera.png"
        }else if(response[i].sensorname==="gesture"){
          response[i]["url"]="/static/gesture.png"
        }else if(response[i].sensorname==="laser"){
          response[i]["url"]="/static/laser.png"
        }else if(response[i].sensorname==="sonar"){
          response[i]["url"]="/static/sonar.png"
        }else if(response[i].sensorname==="motor"){
          response[i]["url"]="/static/motor.png"
        }else if(response[i].sensorname==="monitor"){
          response[i]["url"]="/static/monitor.png"
        }
      }
       this.sensor_list=response
       this.devicename=response.devicename;
    })
  },
  methods:{
    selectimg(num,index,arr){
      console.log(arr);
      console.log(num);
      return num;
},
 
    tomain(obj){    
        
       
        if(obj==="monitor"){
          this.$router.push('/cpu')
         
        }else if(obj==="sonar"){
          this.$router.push('/sonar')
        }else if(obj==="gesture"){
          this.$router.push('/gesture')
        } else if(obj==="laser"){
          this.$router.push('/laser')
        }else if(obj==="mcamera"){
           this.$router.push('/camera')
        }
        
    },
    toback(){
      this.$router.go(-1)
    },
    tocpu(){
       this.$router.push('/cpu')
    },
    
  
    
    
  },

  
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.devinfo{
  min-height: 100vh;
    background: #f2f2f6
}
.wrapper{
 
  display: grid;
  grid-template-columns: 1fr 1fr ;
  grid-template-rows: 180px 180px 180px ;
   align-items: center;
}
  .span{
    font-size: 20px;
    font-weight: 600;
    color:#2394bc
  }
   .container
   {
  background:#ffffff;
  margin-left: 6px;
  margin-right: 6px;
    }

  .cpu{
    font-size: 18px;
    margin-top: 20px;
    line-height: 60px;
    background:#ffffff;
    text-align: center;
    width: 100%
  }
  .icon{
    flex: 0 0 57px;
    margin-right:15px
  }
  .name{
    margin: 20px 6px 5px 0;
    height:20px;
    line-height:20px;
    font-size: 20px;
    color:rgb(7,17,27)
  }
   
    
</style>
