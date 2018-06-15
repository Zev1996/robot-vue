<template>
      <div class="login">
        <div class="login-wrap">
          <img src="./logo.png">
            <p>登录</p>
            <input type="text" placeholder="请输入用户名" v-model="username">
            <input type="password" placeholder="请输入密码"v-model="password">            
            <button @click="login">登陆</button>           
            <router-link to="/register"><span>没有账号？马上注册</span></router-link>
        </div>       
      </div>
        

</template>

<script>
// import {setCookie,getCookie} from '../cookie.js'
import { MessageBox } from "mint-ui";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (this.username == "" || this.password == "") {
        MessageBox("提示", "请输入用户名或密码");
      } else {
        let data = { username: this.username, password: this.password };
        /*接口请求*/
        this.$http
          .post(this.apiaddress+"/session/", data)
          .then(
            res => {
              localStorage.setItem("token",res.body);
              if (res.status === 200) {
                this.$router.push(`/mydev/${this.username}/`);
              }
            },
            response => {
              MessageBox("提示", "用户名或密码错误");
            }
          );
      }
    }
    // login(){
    //    this.$router.push(`/mydev/${this.username}/`);

    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
 background-image: url("./slider-2.jpg");
}
.login-wrap {
  text-align: center;
  min-height: 100vh;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
 
  background: -webkit-linear-gradient(top, rgba(146, 135, 187, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%);
  background: linear-gradient(to bottom, rgba(146, 135, 187, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%);
  /* background-image: linear-gradient(#7678dca6, #6EC0CE); */
  /* -webkit-gradient:(linear, 0 0, 0 bottom, from(#ff0000), to(rgba(0, 0, 255, 0.5)));  */
}
  p{
    font-family: "Open Sans", Helvetica, Arial, sans-serif;
    color: #fff;
    font-size: 20px;
    margin: 10px;
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
  background-color: #2394bc43;
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
a {
  color:#fff
}
img {
  margin-top: 100px;
}
</style>