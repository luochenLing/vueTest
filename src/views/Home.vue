<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <router-link to="/home/account">子组件</router-link>
    <router-link to="/home/help">子组件2</router-link>

    <button @click="changeUserInfo">修改个人信息</button>

    <input type="text" v-model="payWayName">
    <button @click="insertPayWay">添加支付方式</button>    
    <input type="text" v-model="workName">
    <button @click="addWorks">添加个人作品</button>
    <button @click="getStoreModuleContent">获取store的module内容</button>
    <button @click="updateName">修改用户名字</button>
    姓名：{{name}}
    年龄：{{age}}
    昵称：{{getNickName}}
    当前年龄是:{{addAge}}
    <!-- 性别：{{userInfo.sex}}
    地址：{{userInfo.addr}} -->
    
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
//import store from '../store.js'
import {mapState,mapGetters, mapMutations, mapActions} from 'vuex'
export default {
  name: 'home',//用在keepalive上，通过exclude或者include加入或者移除缓存，使每次模板新建的时候从内存取或者每次都是新建
  data(){
    return {
      workName:'',
      payWayName:''
    }
  },
  components: {
    HelloWorld
  }
  ,beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave'+ this.$route.path)
    next()
  },
  activated(){
    console.log('activated'+ this.$route.path)
  }
  ,deactivated(){
    console.log('deactivated'+ this.$route.path)
  }
  // ,computed:{
  //   userInfo(){
  //     return{
  //       name:store.state.name,
  //       age:store.state.age,
  //       sex:store.state.age,
  //       addr:store.state.age,
  //     }
  //   }
  // }
  ,computed:{
    ...mapState(['name','age']),
    ...mapGetters(['getNickName','addAge']),
    
  }
  ,methods:{
    ...mapMutations(['setUserInfo']),
    ...mapActions({
      //这里可以在dispatch直接写a/getWorks  即空间名/方法名，也就是官网说的路径
      getWorks:'a/getWorks',
      addPayWay:'b/addPayWay',
      modifyName:'modifyName'
    }),
    changeUserInfo(){
      var user={
        name:'李四',
        ageL:'15',
        sex:'男',
        addr:'马来西亚'
      }
      //this.setUserInfo(user)
      //store.commit('setUserInfo',user);
      this.$store.dispatch('setUserInfoAsync',user)
    },
    getStoreModuleContent(){
      //动态注册一个组件，
      this.$store.registerModule('moduleC',{
        state:{
          id:'1124223'
        }
      })
      ////你也可以用类似这样的导入模块文件写法创建一个组件
      //   import moduleA from '../store/modules/moduleA'
      // created() {
      //     this.$store.registerModule('moduleA', moduleA);
      // }
      console.log(this.$store)
      console.log(this.$store.state.a)
      console.log('registerModule')
      console.log(this.$store.state.moduleC)
      console.log('unregisterModule')
      this.$store.unregisterModule('moduleC')//卸载组件，但是这样智能卸载动态通过registerModule创建的组件，不能卸载store文件中模块内部声明的组件，例如moduleA和moduleB，不然会报错
      console.log(this.$store.state.moduleC)
      console.log('unregisterModuleB')
      //this.$store.unregisterModule('moduleB')报错
      console.log('unregisterModuleA')
      //this.$store.unregisterModule('moduleA')报错
      console.log('this.$store.mutations')
      console.log(this.$store.mutations)
    },
    addWorks(){
      //this.$store.dispatch('a/getWorks',this.workName)
      this.getWorks(this.workName);
    },
    insertPayWay(){
      //这里不要和vuex中定义的action或者mutations一个名，不然会产生递归死循环，报 Maximum call stack size exceeded 错误
       this.addPayWay(this.payWayName);
    },
    updateName(){
      this.modifyName('李四')
    }
  }
 
}
</script>
