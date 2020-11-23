<template>
	<div class="login-content">
		<div class="login-view">
			<loginvue></loginvue>
		</div>
	</div>
</template>

<script>
	import loginvue from '@/components/Login/login.vue'
	export default{
		name:"Login",
		components:{
			loginvue
		}
	}
</script>

<style llang="less">
	.login-content{
		.login-view{
			margin: 200px;
		}
	}
</style>
