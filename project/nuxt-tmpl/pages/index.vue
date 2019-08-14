<template>
  <div>
    <ul>
      <li class='bc-f-30rp'><nuxt-link :to='{name:"index"}' >Home</nuxt-link></li>
      <li><nuxt-link :to='{name:"list"}' >List</nuxt-link></li>
      <li><nuxt-link :to='{name:"news",params:{newsId:3306}}' >News</nuxt-link></li>
    </ul>
    
    <button @click='getDta'>点击请求</button>
  </div>
</template>

<script>
	export default {
    asyncData ({ app }) {
      console.log(app.$axios);
      app.$axios.post('api/live_line/index').then((res) => {
        console.log(res)
      })
    },
		components: {

		},
    methods:{
      getDta(){
      
      }
    }
	}
	
</script>


<style lang='scss' scoped>
  /*@import "../assets/css/index.scss";*/
 ul{
   li a{
   }
 }
</style>
