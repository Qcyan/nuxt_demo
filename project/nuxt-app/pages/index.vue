<template>
  <div class="home-page">
    <mt-header
      fixed
      title="静安区">
      <mt-button
        slot="right"
        icon="search"
        @click="$router.push('/search')"/>
    </mt-header>

    <img class="cy-flex" width="100%" :src='"https://pc.lifest.dtb315.cn"+banner[0].src_img' alt="">



    <nav class="nav-container">
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
          class="cy-f-40re cy-bg-e5e cy-bd-b-base cy-f-b"
        >
          {{ item.author }} {{userInfo.name}}
        </li>
      </ul>
    </nav>

  </div>
</template>


<script>
  import axios from 'axios'
  import config from "~/config";
  import cyanUtils from 'cyan-utils'

  import {mapState}from 'vuex'

  import { $Axios } from '~/axios/request.js'   // 引用axios

  export default {
    data(){
      return {
        navList:[],
        list:[]
      }
    },
    async fetch ({ app, store, params }) {
      console.log(store)
//      let { data } = app.$axios.get('/token');
//      store.commit('setToken', data.token);
    },
    asyncData({ req, params }) {
        //这里面还拿不到vue实例，用不了this
        return $Axios({
					url:'/api/banner/index',
				}).then((res)=>{
//          console.log(res)
          let banner = res.data.data.banner;
          return {
            banner
          }
        })
    },
    methods:{
      doRequest(){
        //mock方法，没有实际请求
        return this.$axios({
          url:'/demo/test',
        }).then((res)=>{
          this.list = res.data.list;
//          console.log(res.data.list)
        })
      },
    },
    computed: {
      ...mapState(['userInfo'])
    },
    mounted(){

//      console.log(cyanUtils)
       this.doRequest();
    }
  }
</script>


<style scoped lang="scss">
  /*@import '~/assets/css/main/base.scss';*/
  .nav-container{
    width:rem(400)
  }
  .list{
    /*font-size:rem(40)*/
    /*@include sc(40px,'pink')*/
  }



</style>
