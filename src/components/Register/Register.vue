<template>
  <div class="register">
      

        <div class="register-wrap">
           <img src="../Login/logo.png">
            <h3>注册</h3>
            <input type="text" placeholder="请输入账号"  v-model="username">
            <input type="text" placeholder="请输入昵称" v-model="nickname">
            <input type="password" placeholder="请输入密码" v-model="password">
            <input type="password" placeholder="请重新输入密码" v-model="passwords">
            <button @click="register()">注册</button>
            <router-link to="/"><span>立即登录</span></router-link>
        </div>

       
    </div>

</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      username: "",
      password: "",
      nickname: "",
      passwords: ""
    };
  },
  name: "Login",
  methods: {
    register() {
      if (this.username == "" || this.password == "") {
        MessageBox("提示", "请输入用户名或密码");
      } else if (this.password != this.passwords) {
        MessageBox("提示", "两次输入密码不一致");
      } else {
        let data = {
          username: this.username,
          password: this.password,
          nickname: this.nickname
        };
        this.$http
          .post("http://222.201.144.236:8000/robot/api/v1/users/", data)
          .then(
            res => {
              MessageBox("提示", "注册成功");
            },
            response => {
              MessageBox("提示", "注册失败");
            }
          );
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register{
   background-image: url("./slider-2.jpg");
}
.register-wrap{
text-align: center;
  min-height: 100vh;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
 
  background: -webkit-linear-gradient(top, rgba(146, 135, 187, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%);
  background: linear-gradient(to bottom, rgba(146, 135, 187, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%);
  /* background-image: linear-gradient(#7678dca6, #6EC0CE); */
  /* -webkit-gradient:(linear, 0 0, 0 bottom, from(#ff0000), to(rgba(0, 0, 255, 0.5)));  */
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #fff;
}
.register-wrap {
  text-align: center;
}
 input::-webkit-input-placeholder{
            color:rgba(238, 230, 230, 0.925);
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:rgba(238, 230, 230, 0.925);
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
           color:rgba(238, 230, 230, 0.925);
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
           color:rgba(238, 230, 230, 0.925);
        }
input {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid #888;
  padding: 10px;
  box-sizing: border-box;
   background-color: transparent;
    border: 1px solid #fff;
    border-radius: 25px;
    color: #fff;
}
button {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  border: none;
  background-color:#2394bc43;
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
   border-radius: 25px;
}
span {
  cursor: pointer;
}
span:hover {
  color: #2394bc;
}
img {
  margin-top: 100px;
}
</style>
