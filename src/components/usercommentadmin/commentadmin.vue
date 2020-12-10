<template>
	<div class="commentadmin">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/admin/commentadmin' }">超级管理员界面</el-breadcrumb-item>
					<el-breadcrumb-item>用户评论管理</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<!-- 下面是评论的管理 -->
			<div>
				<template v-for="(item,index) in comments">
					<commentitem :comment="item" :index="index" @deletecommentitem="deletecommentitem"></commentitem>
				</template>
			</div>
		</el-card>
		
		<div>
			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage4"
			:page-sizes="pageSizes"
			:page-size="pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="totalsize">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import commentitem from '@/components/usercommentadmin/commentitem'
	import {getAllcomment} from '@/util/requestnetwork/commendadmin'
	import {deletecommentById} from '@/util/requestnetwork/commendadmin'
	
	export default{
		name:"commentadmin",
		components:{
			commentitem
		},
		methods:{
			handleSizeChange(val) {
				this.pageSize=val;
				let pageRequest={};
				pageRequest.pageSize=this.pageSize;
				pageRequest.pageNum=this.currentPage4;
				getAllcomment(JSON.stringify(pageRequest)).then(res=>{
					let data=res.data.data;
					console.log(data)
					this.comments=data.content;
					this.pageSize=data.pageSize;
					this.pageNum=data.pageNum;
					this.totalsize=data.totalSize;
				}).catch(error=>{
					
				})
			},
			handleCurrentChange(val) {
			this.currentPage4=val;
			let pageRequest={};
			pageRequest.pageSize=this.pageSize;
			pageRequest.pageNum=this.currentPage4;
			getAllcomment(JSON.stringify(pageRequest)).then(res=>{
				let data=res.data.data;
				console.log(data)
				this.comments=data.content;
				this.pageSize=data.pageSize;
				this.pageNum=data.pageNum;
				this.totalsize=data.totalSize;
			}).catch(error=>{
				
			})
			},
			deletecommentitem(commentid,index){
				let comment={};
				comment.id=commentid;
				deletecommentById(JSON.stringify(comment)).then(res=>{
					console.log(res)
					this.$message({
					message: '恭喜你，删除评论成功',
					type: 'success'
					});
				}).catch(error=>{
					
				})
				console.log(commentid);
				this.removeItemFromArray(this.comments,index);
			},
			removeItemFromArray(array,index){
				if(index==array.length-1){
					array.pop();
					return;
				}else{
					for(let i=index;i<array.length;i++){
						array[index]=array[index+1];
					}
					array.pop();
				}
			}
		},
		data() {
		return {
			pageSizes:[10, 20, 30, 100],
			currentPage4: 1,
			pageSize:10,
			totalsize:400,
			comments:[]
		};
		},
		created(){
			let pageRequest={};
			pageRequest.pageSize=this.pageSize;
			pageRequest.pageNum=this.currentPage4;
			getAllcomment(JSON.stringify(pageRequest)).then(res=>{
				let data=res.data.data;
				console.log(data)
				this.comments=data.content;
				this.pageSize=data.pageSize;
				this.pageNum=data.pageNum;
				this.totalsize=data.totalSize;
			}).catch(error=>{
				
			})
		}
	}
</script>

<style lang="less">
	
</style>
