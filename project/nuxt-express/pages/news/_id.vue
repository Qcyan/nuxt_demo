<template>
	<div>
		<h2>News Content</h2>
		<p>newsId:{{$route.params.id}}</p>
		<ul>
			<li>
				<nuxt-link :to='{name:"Home"}'>HOME</nuxt-link>
			</li>
		</ul>
	</div>
</template>