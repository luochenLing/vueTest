import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleA={
  namespaced: true,
  state:{
    count:0,
    age:21,
    works:['C#基础大全','JVM原理']
  },
  mutations:{
    increment(state){
      state.count++
    },
    getWorks(state,params){
      state.works.push(params);
    }
  },
  getters:{
    doubleCountA(state,getters,rootState){
      console.log(getters)
      console.log(rootState)
      return state.count*2
    },
    getAgeA(state){
      return state.age++;
    }
  },
  actions:{
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    },
    getWorks ({ state, commit, rootState },params) {
      console.log(state,rootState)
      commit('getWorks',params)
    },
    modifyName:{
      root: true,
      handler (namespacedContext, payload) { 
        console.log('----------------')
        console.log(namespacedContext)
        console.log('----------------')
        console.log(payload);
      } // -> 'modifyName 方法实现体可以写到这里，这是把模块中的方法放入全局的一种写法'
    }

  }
}

const moduleB={
  namespaced: true,
  state:{
    count:0,
    age:18,
    works:['C#基础大全','JVM原理']
  },
  mutations:{
    increment(state){
      state.count++
    },
    getWorks(){
      return this.works
    }
  },
  getters:{
    doubleCountB(state){
      return state.count*2
    },
    getAgeB(state){
      return state.age++;
    }
  },
  actions:{
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    },
    addPayWay({ state, commit, rootState },params) {
      console.log(state,rootState,params)
      //{root:true}就是说，模块的action、mutations调全局store的方法的时候，commit或者dispatch的时候要加这个属性，不然会报错
      commit('addPayWay',params,{root:true})
    }
  }
}

//  const moduleC={
 
// }

export default new Vuex.Store({
  state: {
    name:'张三',
    age:'18',
    sex:'男',
    addr:'河北新区',
    userOtherInfo:{
      nickname:'shadow',
      payWay:'aliPay|wecatPay'
    }
  },
  modules:{
    a:moduleA,
    b:moduleB
  },
  mutations: {
    setUserInfo(state,params){
      console.log(state,params);
    },
    addPayWay(state,params){
      let payWayArray= state.userOtherInfo.payWay.split('|');
      payWayArray.push(params);
      state.userOtherInfo.payWay = payWayArray.join('|');
      //console.log(state.userOtherInfo.payWay);
    }
  },
  getters:{
    getNickName:(state)=>state.userOtherInfo.nickname,
    addAge:(state)=>state.age++,
  },
  actions: {
    setUserInfoAsync({commit,state},params){
      setTimeout(() => {
        commit('setUserInfo',params)
      }, 2000);
    }
  }
})
