<template>
	<div class="admin-content">
		<el-container style="height: 100%;">
			<el-header style="position: relative;">
				<h1>REMEMBER ME ADMIN</h1>
				<div class="admin-userinof">
					<img src="@/assets/Homeimgs/homearg.jpg" alt="" style="margin-right: 20px;">
					<el-dropdown :hide-on-click="false">
						<span class="el-dropdown-link">
							用户管理<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
					<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>黄金糕</el-dropdown-item>
					<el-dropdown-item>狮子头</el-dropdown-item>
					<el-dropdown-item>螺蛳粉</el-dropdown-item>
					<el-dropdown-item disabled>双皮奶</el-dropdown-item>
					<el-dropdown-item divided>蚵仔煎</el-dropdown-item>
					</el-dropdown-menu>
					</el-dropdown>
				</div>
			</el-header>
			<el-container>
			<el-aside width="200px">
				<loginvue></loginvue>
			</el-aside>
				<el-main>
					<el-breadcrumb separator="/">
						<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
						<el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
						<el-breadcrumb-item>活动列表</el-breadcrumb-item>
						<el-breadcrumb-item>活动详情</el-breadcrumb-item>
					</el-breadcrumb>
					<!-- 主页的内容 -->
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import loginvue from '@/components/Admin/Aside.vue'
	export default{
		name:"Admin",
		components:{
			loginvue
		}
	}
</script>

<style lang="less">
	.admin-content{
		position: absolute;
		left: 0px;
		right: 0px;
		top: 0px;
		bottom: 0px;
		.admin-userinof{
			position: absolute;
			top: 0px;
			right: 0px;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 50px;
			&>img{
				width: 50px;
				height: 50px;
				border-radius:50%; 
			}
		}
	}
</style>
