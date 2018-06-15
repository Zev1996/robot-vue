// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueResouce from 'vue-resource';
import router from './router';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import Stomp from 'stompjs';
import echarts from 'echarts';
import 'jquery';
Vue.prototype.apiaddress="http://222.201.144.236:8000/robot/api/v1"
// import 'lib-flexible/flexible' //flex

Vue.use(MintUI);
Vue.config.productionTip = false
Vue.use(VueResouce);
Vue.http.options.xhr = { withCredentials: true }; 
Vue.http.options.emulateJSON = true;
Vue.prototype.$echarts=echarts;

Vue.http.interceptors.push((request, next) => {
    request.credentials = true;
    request.headers.set( 'X-CSRFToken',localStorage.getItem("token"));
    next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'

})
