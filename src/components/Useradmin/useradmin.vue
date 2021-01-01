<template>
	<div class="useradminc_content">
		<el-dialog
			title="删除用户的提示"
			:visible.sync="dialogVisible"
			width="30%"
			>
			<span>确定要删除这个用户吗？</span>
			<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="deleteUser">确 定</el-button>
			</span>
		</el-dialog>
		
		<div class="useradmin_content">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<el-breadcrumb separator-class="el-icon-arrow-right">
						<el-breadcrumb-item :to="{ path: '/admin/useradmin' }">超级管理员界面</el-breadcrumb-item>
						<el-breadcrumb-item>用户管理</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<!-- 这里是 用户的显示部分 -->
				<div>
					<template v-for="(item,index) in users">
						<useritem :user="item" :index="index" @deleteUserById="deleteUserById"></useritem>
					</template>
				</div>
				<!-- 分页 -->
				<div>
					<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="currentPage4"
					:page-sizes="pageSizes"
					:page-size="pageSize"
					layout="sizes, prev, pager, next"
					:total="totalSize">
					</el-pagination>
				</div>
			</el-card>
			</div>
	</div>
</template>

<script>
	// 获取所有的用户的信息
	import {userAdminPage} from '@/util/requestnetwork/userAdminRequest'
	import {deleteUserById} from '@/util/requestnetwork/userAdminRequest'
	import useritem from '@/components/Useradmin/useritem'
	import { Loading } from 'element-ui';
	export default{
		name:"useradmin",
		methods: {
			handleSizeChange(val) {
				this.pageSize=val;
				let pageRequest={};
				pageRequest.pageNum=this.currentPage4;
				pageRequest.pageSize=this.pageSize;
				userAdminPage(JSON.stringify(pageRequest)).then(res=>{
					let data=res.data.data;
					console.log(res)
					this.currentPage4=data.pageNum;
					this.pageSize=data.pageSize;
					this.totalSize=data.totalSize;
				}).catch(error=>{
					console.log(error)
				})
			},
			handleCurrentChange(val) {
				this.currentPage4=val;
				let pageRequest={};
				pageRequest.pageNum=this.currentPage4;
				pageRequest.pageSize=this.pageSize;
				userAdminPage(JSON.stringify(pageRequest)).then(res=>{
					let data=res.data.data;
					console.log(res)
					this.currentPage4=data.pageNum;
					this.pageSize=data.pageSize;
					this.totalSize=data.totalSize;
				}).catch(error=>{
					console.log(error)
				})
			},
			deleteUserById(userId,index){
				
				this.dialogVisible=true;
				
			},
			removeItemByIndex(array,index){
				// 如果删除的是最后一个就直接
				if(index==array.length-1){
					array.pop();
				}else{
					for(let i=index;i<array.length;i++){
						array[i]=array[i+1];
					}
					array.pop();
				}
			},
			// 下面就是弹出框的调用的方法
			deleteUser(){
				this.dialogVisible=false;
				this.removeItemByIndex(this.users,index);
				let user={};
				user.id=userId;
				deleteUserById(JSON.stringify(user)).then(res=>{
					console.log(res);
					console.log("删除用户成功")
				}).catch(error=>{
					
				})
			}
			},
		data() {
			return {
				currentPage4: 1,
				pageSizes:[10, 20, 30, 100],
				pageSize:10,
				totalSize:10,
				users:[],
				dialogVisible: false
				}
		},
		components:{
			useritem
		},
		created() {
			let pageRequest={};
			pageRequest.pageNum=this.currentPage4;
			pageRequest.pageSize=this.pageSize;
			let loadingInstance = Loading.service();
			userAdminPage(JSON.stringify(pageRequest)).then(res=>{
				let data=res.data.data;
				loadingInstance.close();
				this.currentPage4=data.pageNum;
				this.pageSize=data.pageSize;
				this.totalSize=data.totalSize;
				this.users=data.content;
			}).catch(error=>{
				console.log(error)
			})
		}
    }

</script>

<style>
</style>
