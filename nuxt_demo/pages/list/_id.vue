<template>
	<div>
		<h2>List Detail</h2>
		<p>ID:{{$route.params.id}}</p>
		<p>KEY:{{$route.params.key}}</p>
	</div>
</template>

<script>
	export default {
		async asyncData ({ app, params }) {
			console.log(params)
			// let data = await app.$axios.get(`/appinfo/${params.id}`);
			return {
				appname: "123"
			}
		},
		head () {
			return {
				meta:
					[
						{
							name: 'keywords',
							content: `${this.appname},无限宝石,无限元宝`
						},
					]
			}
		}
	}
</script>