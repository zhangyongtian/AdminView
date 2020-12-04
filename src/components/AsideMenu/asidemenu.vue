<template>
	<div class="aside-menu">
		    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
		    </el-radio-group>
		    <el-menu :router="true" background-color="#545c64"
					text-color="#fff"
					active-text-color="white" 
					default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="showmenu">
		      <el-submenu index="1">
		        <template slot="title">
		          <i class="el-icon-location"></i>
		          <span slot="title">首页</span>
		        </template>
		        <el-menu-item-group>
		          <el-menu-item index="/admin">评论管理</el-menu-item>
		          <el-menu-item index="/admin/aticle">文章管理</el-menu-item>
				  <el-menu-item index="/admin/publicizeaticle">发布文章</el-menu-item>
					<el-menu-item index="/admin/usermessage">发留言</el-menu-item>
					<el-menu-item index="/admin/messageadmin">留言管理</el-menu-item>
		        </el-menu-item-group>
		      </el-submenu>
		    </el-menu>
	</div>
</template>

<script>
	export default{
		name:"asidemenu",
		data() {
		      return {
		        isCollapse:this.showmenu
		      };
		    },
		    methods: {
		      handleOpen(key, keyPath) {
		        console.log(key, keyPath);
		      },
		      handleClose(key, keyPath) {
		        console.log(key, keyPath);
		      }
		    },
	props:{
		showmenu:{
			default:true,
			type:Boolean
		}
	}
	}
</script>

<style lang="less">
	.aside-menu{
		width: 100%;
	}
</style>
