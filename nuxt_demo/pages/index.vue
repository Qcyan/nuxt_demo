<template>
  <div>
    <ul>
      <li><nuxt-link :to='{name:"index"}' >Home</nuxt-link></li>
      <li><nuxt-link :to='{name:"list"}' >List</nuxt-link></li>
      <li><nuxt-link :to='{name:"news",params:{newsId:3306}}' >News</nuxt-link></li>
    </ul>
  </div>
</template>

<script>

	export default {
		components: {

		}
	}
</script>

<style>

</style>
