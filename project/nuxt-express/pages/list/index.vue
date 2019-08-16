<template>
<div>
	<ul>
		<li v-for='(item,index) in list' :key='index'>
			<nuxt-link :to='{name:"list-id",params:{id:index}}'>	{{item}} </nuxt-link>
		</li>
		
		<li @click='change'>666666666666</li>
		
	</ul>
</div>
</template>

<script>
	export default {
		data(){
			return{
				list:[11111,22222,33333,44444,55555]
			}
		},
		methods:{
			change(){
				// this.$router.push({ path: '/list/5'})
				this.$router.push({ name: 'list-id',params:{id:5,key:"索引"}})
			}
		}
	}
</script>