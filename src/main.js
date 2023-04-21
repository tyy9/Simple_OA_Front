import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ".//assets/global.css"
// 引入 vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
 
//引入 vue-awesome-swiper 样式
import 'swiper/dist/css/swiper.css'
 
Vue.use(VueAwesomeSwiper, /* { 全局组件的默认选项 } */)

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
