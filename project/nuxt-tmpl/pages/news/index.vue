<template>
	<div>
		<ul>
			<li><nuxt-link :to='{name:"index"}'>HOME</nuxt-link></li>
			<nuxt-link :to="{name:'news-id',params:{ id: 123 }}">news-1</nuxt-link>
			
			<li><nuxt-link :to='{name:"news",params:{newsId:123}}' >News</nuxt-link></li>
			
			<li><a href='/news/jackyfgh'>news-2</a></li>
			<p>newsId:{{$route.params.newsId}}</p>
		
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