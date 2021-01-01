<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: `/admin/setUserRole/${userId}` }">超级管理员界面</el-breadcrumb-item>
					<el-breadcrumb-item>用户权限管理</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div>
				<el-card class="box-card">
					点击角色执行删除添加角色
				</el-card>
			</div>
			<!-- 这里是 用户的显示部分 -->
			<div style="margin-top: 10px;">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>用户已有角色</span>	
					</div>
					<div>
						<template>
							<template v-for="(item,index) in user.roles">
								<el-tag style="margin-left: 7px;" @click="deleteRole(item)">{{item.rolename}}</el-tag>
							</template>
						</template>
					</div>
				</el-card>
			</div>
			<!-- 下面是设置权限 -->
			<div style="margin-top: 10px;">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>下面是可以设置的角色</span>	
					</div>
					<div>
						<template>
							<template v-for="(item,index) in userNotHaveRoleRole">
								<el-tag style="margin-left: 7px;"  @click="addRole(item)">{{item.rolename}}</el-tag>
							</template>
						</template>
					</div>
				</el-card>
			</div>
			<div style="margin-top: 10px;">
				<el-card class="box-card">
					<el-button type="success" round @click="commitRoles">确认角色分配</el-button>
				</el-card>
			</div>
		</el-card>
	</div>
</template>

<script>
	import {getUserById} from '@/util/requestnetwork/userAdminRequest'
	import {getAllRole} from '@/util/requestnetwork/userAdminRequest'
	import {updateUserRoles} from '@/util/requestnetwork/userAdminRequest'
	import {getUserAllRole} from '@/util/requestnetwork/userAdminRequest'
	
	
	
	export default{
		name:"",
		data(){
			return{
				userId:-1,
				user:{},
				allRole:[],
				userHasRoleId:[],
				userNotHaveRoleRole:[]
			}
		},
		created() {
			this.userId=this.$route.params["userId"];
			
			let user={};
			user.id=this.userId;
			getUserById(JSON.stringify(user)).then(res=>{
				this.user=res.data.data;
				
				// 下面是获取所有的角色
				getUserAllRole(JSON.stringify(user)).then(res=>{
					//下面是所有的角色
					let data=res.data.data;
					console.log(res)
					this.allRole=data;
					this.userHasRoleId=this.user.roles.map(role=>{
						return role.roleid
					})
					console.log("下面是获取所有的角色")
					getAllRole().then(res=>{
						let data=res.data.data;
						this.allRole=data;
						this.userNotHaveRoleRole=this.allRole.filter(role=>{
							return this.userHasRoleId.indexOf(role.roleid)<0;
						})
					})
					
				}).catch(error=>{
					
				})
			}).catch(error=>{
				
			})
			
			
			
			
		},
		methods:{
			deleteRole(item){
				this.deleteSelfRole(this.user.roles,item);
				this.userNotHaveRoleRole.push(item);
			},
			addRole(item){
				this.deleteSelfRole(this.userNotHaveRoleRole,item);
				this.user.roles.push(item)
			},
			//下面就是提供自己item就是在一个自己的itemArray里面删除自己
			deleteSelfRole(itemArray,item){
				for(let i=0;i<itemArray.length;i++){
					if(itemArray[i].roleid==item.roleid){
						if(i==itemArray.length-1){
							itemArray.pop();
							return;
						}else{
							
							for(let j=i;j<itemArray.length;j++){
								itemArray[j]=itemArray[j+1];
								console.log(itemArray)
							}
							itemArray.pop();
							return;
							
						}
					}
				}
				
			},
			commitRoles(){
				console.log("提交")
				let user={};
				user.id=this.user.id;
				user.roles=this.user.roles;
				updateUserRoles(JSON.stringify(user)).then(res=>{
					console.log(res)
					this.$message({
					message: '恭喜你，修改角色成功',
					type: 'success'
				});
				}).catch(error=>{
					
				})
			}
		}
	}
</script>

<style>
</style>
