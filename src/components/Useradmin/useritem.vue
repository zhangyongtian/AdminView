<template>
	<div style="margin-top: 10px;">
		<el-card class="box-card">
			<div class="userItem">
				<!-- 用户的头像还有用户名 -->
				<div class="userContent">
					<img :src="user.userimage" alt="">
					<span style="margin-left: 10px;">{{user.username}}</span>
				</div>
				<!-- 下面是用户创建的时间 -->
				<div class="usercreatime">
					<span>{{user.createtime|fileterTime}}</span>
				</div>
				<!-- 下面是用户的角色 -->
				<div class="userrole">
					<template v-for="(item,index) in user.roles">
						<el-tag style="margin-left: 7px;">{{item.rolename}}</el-tag>
					</template>
				</div>
				<!-- 下面是用户的操作 -->
				<div class="useroprate">
					<el-button type="primary" icon="el-icon-edit" circle @click="updateUserRole(user.id)"></el-button>
					<el-button type="danger" icon="el-icon-delete" circle @click="deleteUserById(user.id,index)"></el-button>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default{
		name:"userItem",
		props:{
			user:{
				type:Object,
				default(){
					return {}
				}
			},
			index:{
				type:Number,
				default(){
					return{}
				}
			}
		},
		methods:{
			updateUserRole(userId){
				this.$router.push({path:`/admin/setUserRole/${userId}`})
			},
			deleteUserById(userId,index){
				this.$emit("deleteUserById",userId,index);
			}
		},
		filters:{
			// 下面是处理时间格式的fileter
			fileterTime(targettime){
				let dian=targettime.indexOf(".");
				return targettime.substr(0,dian).replace("T","-");
			}
			
		}
	}
</script>

<style lang="less">
	.userItem{
		display: flex;
		.userContent{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			&>img{
				width: 50px;
				height: 50px;
				border-radius: 50%;
			}
		}
		
		.usercreatime{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		
		.userrole{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		
		.useroprate{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
