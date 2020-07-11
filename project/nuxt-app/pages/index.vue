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
          class="cy-f-40re"
        >
          {{ item.author }}
        </li>
      </ul>
    </nav>

  </div>
</template>


<script>
  import axios from 'axios'
  import config from "~/config";
  import cyanUtils from 'cyan-utils'
  import { $Axios } from '~/axios/request.js'   // 引用axios
  export default {
    data(){
      return {
        navList:[],
        list:[]
      }
    },
    asyncData({ req, params }) {
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
        return $Axios({
          url:'/demo/test',
        }).then((res)=>{
          this.list = res.data.list;
          console.log(res.data.list)
        })
      },
      async getData(){
        const res =  await this.$Axios.get(`http://nodet.cn:3005/api/courselist?offset=0&limit=15&type=1&sort=1&courseId=15963587&selectScreenStr=`);
        res.data.map(item => {
          item.imgUrl = config.IMG_URL + item.imgUrl;
        });
        this.navList = res.data
      }
    },
    mounted(){

//      console.log(cyanUtils)
      // this.getData();
       this.doRequest();
    }
  }
</script>


<style lang="scss">
  @import "../assets/styles/base";
  .list{
    /*font-size:rem(40)*/
    /*@include sc(40px,'pink')*/
  }



</style>
