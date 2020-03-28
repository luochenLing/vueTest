import Vue from 'vue'
import App from './App.vue'
import Father from './views/father.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Father)
}).$mount('#app')





// //全局导航守卫
// router.beforeEach((to,from,next)=>{
//   console.log(to);
//   console.log(from);
//   next();
// })