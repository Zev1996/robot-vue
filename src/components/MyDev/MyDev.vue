<template>
    <div class="mydev">
       <mt-header fixed title='我的设备'>
           <a href="#" @click="quit" slot="left">
               <mt-button icon="back">注销</mt-button>
           </a>
       </mt-header>
    <div class="ulul">
       <ul >
       <li @click="selectDev(dev,$event)" v-for="dev in device_list"  class="li">
          <div class="container">
              <img class="robot-icon" src="./logo.png">     
              <span>
                 {{dev.devicename}}
               </span>
             
               <i class="iconfont   icon-arrow-right" ></i>  
          </div>
        </li>
      </ul>  
    </div>
      <mt-actionsheet
  :actions="actions"
  v-model="sheetVisible">
</mt-actionsheet>
       <button class="addbtn" @click="sheetVisible=true">增删设备</button>
    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Actionsheet } from 'mint-ui';
export default {
  data() {
    return {
      name: "",
      actions:[{name:'注册设备',method:this.ToNew},{name:'添加设备',method:this.ToAdd},{name:'删除设备',method:this.ToDelete}],
      sheetVisible:false,
      selectedDev: {},
      device_list: [],
      title_name: [],
      devicename: "",
      password: "",
      nickname:""
    };
  },

  created() {
    this.getdev();
  },
  methods: {
    quit() {
      this.$http
        .delete("http://222.201.144.236:8000/robot/api/v1/session/")
        .then(
          res => {
          },
          response => {
            MessageBox("提示", "注销失败");
          }
        );
      this.$router.push("/");
    },
    getthing(obj){
      alert(obj);
      console.log(obj)
    },
    getdev(){
        let user = this.$route.params.id;
    this.$http
      .get(`http://222.201.144.236:8000/robot/api/v1/users/${user}/`)
      .then(
        response => {
          response = response.body;
          this.device_list = response.device_list;
          console.log(this.device_list)
        },
        response => {
          alert("请求失败");
        }
      );
    },
    selectDev(dev, event) {
      let devid = dev.id;
      localStorage.setItem('dev_id',devid);
      this.$router.push({ path: `/devinfo/${devid}` });
    },
    ToNew(){
      MessageBox.prompt('请输入设备账号').then(({ value, action }) => {
        this.devicename=value;
          MessageBox.prompt('请输入设备密码').then(({ value, action }) => {
        this.password=value;
              MessageBox.prompt('请输入设备昵称').then(({ value, action }) => {
        this.nickname=value;
              this.sendmessage();
        

      })
        

      })

      })
    },
    sendmessage(){
        let data2={
  "devicename": this.devicename,
  "password": this.password,
  "nickname": this.nickname
}
    this.$http
          .post(
            `http://222.201.144.236:8000/robot/api/v1/devices/`,
            data2
          )
          .then(
            res => {
              MessageBox("提示", "添加成功");
              this.getdev();
            },
            response => {
               MessageBox("提示", "添加失败");
            }
          );
    },
    ToAdd() {
      MessageBox.prompt("请输入添加设备ID！").then(({ value, action }) => {
        let data = {};

        this.$http
          .post(
            `http://222.201.144.236:8000/robot/api/v1/users/123/${value}/`,
            data
          )
          .then(
            res => {
              MessageBox("提示", "添加成功");
              this.getdev();
            },
            response => {
               MessageBox("提示", "添加失败");
            }
          );
      });
    },
   ToDelete(){
    MessageBox.prompt("请输入删除设备ID！").then(({ value, action }) => {
        let data = {};

        this.$http
          .delete(
            `http://222.201.144.236:8000/robot/api/v1/users/123/${value}/`,
            data
          )
          .then(
            res => {
              MessageBox("提示", "删除成功");
              this.getdev();
            },
            response => {
               MessageBox("提示", "删除失败");
            }
          );
      });
   } 
  },
  
};
</script>
<style scoped>
.mydev{
  /* position: fixed; */
  min-height: 100vh;
  background: #f2f2f6
}
  .ulul{
    padding-top: 40px;
    margin-top: -40px;
  }
  .li:nth-child(1){
    margin-top:40px;
  }
  .container {
  display: flex;

  font-size: 18px;
  margin-top: 20px;
  line-height: 60px;
  background:#ffffff;
  text-align: center;
  flex:1;
  justify-content: space-around;
}
    .icon {
    flex: 0 0 57px;
    margin-right: 15px;
  }
    .name {
      margin: 20px 6px 5px 0;
      height: 20px;
      line-height: 20px;
      font-size: 20px;
      color: rgb(7, 17, 27);
    }
    .robot-icon{
        text-align: center;
        vertical-align: middle;
        float: left;
        width: 48px;
        height: 48px; 
        margin-top: 5px;
    }
    

.addbtn {
  position:fixed;
  margin: 0 ,auto;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: none;
  background-color: #2394bc;
  color: #fff;
  font-size: 16px;
};


</style>