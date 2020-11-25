<template>
	<div class="publicizeaticle-content">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <el-breadcrumb separator-class="el-icon-arrow-right">
		      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
		      <el-breadcrumb-item>发布文章</el-breadcrumb-item>
		    </el-breadcrumb>
		  </div>
		  <div class="publicizeaticlefrom">
			  <publicizeaticlefrom></publicizeaticlefrom>
		  </div>
		</el-card>
	</div>
</template>

<script>
	import publicizeaticlefrom from "@/components/publicizeaticle/publicizeaticlefrom.vue"
	export default{
		name:"publicizeaticle",
		components:{
			publicizeaticlefrom
		}
	}
</script>

<style lang="less">
	.publicizeaticle-content{
		text-align: left;
	}
</style>
