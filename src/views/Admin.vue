<template>
	<div class="admin-content">
		<el-container class="el-content">
		  <el-aside  class="admin-content-aide" width="auto">
			  <el-header class="admin-content-header"></el-header>
			  <asidemenu :showmenu="isCollapse"></asidemenu>
		  </el-aside>
		  <el-container>
		    <el-header class="admin-content-header">
				<div class="admin-content-header-l">
					<div  v-on:click="showmenu"  style="text-align: center;display: flex;justify-content: center;align-items: center;font-size: xx-large;"><i class="el-icon-s-unfold"></i></div>
					<h2 style="margin-left: 20px;">REMEMBERME管理系统</h2>
				</div>
				<div class="admin-content-header-r">
					<div class="admin-content-header-r-centent">
						<img :src="userInfo.userimage" alt="">
						<el-dropdown>
						  <span class="el-dropdown-link">
						    <h2 style="display: inline-block;">{{userInfo.username}}</h2><i class="el-icon-arrow-down el-icon--right"></i>
							
						  </span>
						  <el-dropdown-menu slot="dropdown">
							<el-dropdown-item>
								<div style="color: orange;margin-left: 5px;">
									
									<i v-if="0==userInfo.userlevel" style="display: flex;">
									<span style="color: royalblue;">等级:&nbsp;  </span>	初级
									</i>
									<i v-if="30==userInfo.userlevel" style="display: flex;">
									<span style="color: royalblue;">等级:&nbsp; </span>	高级
									</i>
									<i v-if="100==userInfo.userlevel" style="display: flex;">
									<span style="color: royalblue;">等级:&nbsp; </span>	大师
									</i>
								</div>
							</el-dropdown-item>
						    <el-dropdown-item>
								<div  v-on:click="userdetail">
									详细信息
								</div>
							</el-dropdown-item>
						    <el-dropdown-item>
								<div v-on:click="loginout">
									退出登录
								</div>
							</el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
			</el-header>
		    <el-main class="admin-content-main"><router-view></router-view></el-main>
		  </el-container>
		</el-container>
	</div>
</template>

<script>
	import asidemenu from '@/components/AsideMenu/asidemenu.vue'
	export default{
		name:"Admin",
		components:{
			asidemenu
		},
		methods:{
			showmenu(){
				this.isCollapse=!this.isCollapse
			},
			userdetail(){
				let user=this.$store.state.user;
				console.log(user)
				this.$router.push({path:`/admin/userdetail/${user.id}`})
			},
			loginout(){
				window.localStorage.removeItem("remebermeadmin");
				window.localStorage.removeItem("remembermetoken");
				this.$store.dispatch("deleteUser")
				this.$router.push("/")
			}
		},
		data(){
			return{
				isCollapse: true
			}
		},
		computed:{
			userInfo(){
				return this.$store.state.user;
			}
		},
		
	}
</script>

<style lang="less">
	.admin-content{
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		.el-content{
			height: 100%;
			.admin-content-aide{
				background-color: #545c64;
				width: 0px;
			}
			.admin-content-header{
				text-align: left;
				display: flex;
				justify-content: center;
				align-items: center;
				.admin-content-header-l{
					flex: 1;
					display: flex;
					
				}
				.admin-content-header-r{
					flex: 1;
					text-align: right;
					.admin-content-header-r-centent{
						float: right;
						display: flex;
						justify-content: center;
						align-items: center;
						&>img{
							
							width: 50px;
							height: 50px;
							border-radius: 50%;
							margin-right: 10px;
						}
					}
					
				}
			}
			.admin-content-main{
			}
		}
		
	}
</style>
