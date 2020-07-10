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

    <h2>requestBanner</h2>
    <img :src="requestBanner" alt="">

    <nav class="nav-container">
      <div
        v-for="(item, index) in navList"
        :key="index"
        class="nav-item"
        @click="$router.push({path:'/newretail', query:{ title: item.text }})">
        <img
          :src="item.imgUrl"
          alt="">
        {{ item.text }}
      </div>
    </nav>

  </div>
</template>


<script>
  import config from "~/config";
  import { $Axios } from '~/axios/request.js'   // 引用axios
//  import utils from 'cyan-utils'
  export default {
    data(){
      return {
        navList:[],
      }
    },
    async asyncData({ req, params }) {
      let res = await $Axios({ url:'/api/banner/index' });
      console.log(res)
      const {banner} = res.data.data;
//      console.log(utils)
      return  {
        requestBanner:banner[0].src_img
      }

    },
    methods:{
      async getData(){
        const res =  await this.$request.get(`http://nodet.cn:3005/api/courselist?offset=0&limit=15&type=1&sort=1&courseId=15963587&selectScreenStr=`);
        res.data.map(item => {
          item.imgUrl = config.IMG_URL + item.imgUrl;
        });
        this.navList = res.data
      }
    },
    mounted(){
      // this.getData();
    }
  }
</script>


<style lang="scss">
  @import "../assets/styles/mixin";

  .home-page {
    background-color: #fff;
    padding: px2rem(88px) 0 53px 0;

    .nav-container {
      @include fj();
      flex-wrap: wrap;
      margin-bottom: px2rem(30px);

      .nav-item {
        @include wh(20%, 80px);
        text-align: center;
        color: #666;
        font-size: px2rem(24px);
        padding-top: px2rem(10px);

        img {
          display: block;
          margin: 0 auto;
          @include wh(50px, 50px);
        }
      }
    }

    .swiper {
      padding: 0 0.4rem;
    }

    .shoplist-title {
      @include fj(center);
      font-size: px2rem(30px);
      margin-bottom: px2rem(20px);
    }

    .show-list {
      padding: 0 0.4rem;

      a {
        display: inline-block;
        width: 49%;
        height: auto;
        float: left;

        &:nth-last-of-type(1) {
          float: right;
        }
      }
    }
  }

</style>
