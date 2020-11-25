<template>
  <div class="user-content">
	  <el-card class="box-card">
	    <div slot="header" class="clearfix">
	      <el-breadcrumb separator-class="el-icon-arrow-right">
	        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
	        <el-breadcrumb-item>评论管理</el-breadcrumb-item>
	      </el-breadcrumb>
	    </div>
	    <div v-for="o in 4" :key="o" class="text item">
	      {{'列表内容 ' + o }}
	    </div>
	  </el-card>
  </div>
</template>
<style lang="less">
	.user-content{
		text-align: left;
	}
</style>
<script>
  export default {
	 name:"useradmin"
  }
</script>
