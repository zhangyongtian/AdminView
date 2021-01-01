<template>
	<div class="photo_content">
		<div>
			<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/admin/photoadmin' }">超级管理员界面</el-breadcrumb-item>
					<el-breadcrumb-item>照片墙管理</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<!-- 这里是内容的部分 -->
			<div style="display: flex;flex-wrap: wrap;">
				<template v-for="(img,index) in imgcontent">
					<photoitem :img="img" :index="index" @deletephotoitem="deletephotoitem"></photoitem>
				</template>
			
			</div>
			
			<!-- 下面是分页 -->
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage4"
				:page-sizes="pageSizes"
				:page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalSize">
				</el-pagination>
			</el-card>
		</div>
	</div>
</template>

<script>
	import {selectPagePhoto} from "@/util/requestnetwork/adminrequest"
	import {deletePhotoById} from "@/util/requestnetwork/adminrequest"
	import { Loading } from 'element-ui';
	
	import photoitem from "@/components/Photo/photoitem"
	export default{
		name:"photoadmin",
		components: {
			photoitem
		},
		methods: {
			handleSizeChange(val) {
				this.pageSize=val;
				this.selectpageimg(this.currentPage4,this.pageSize)
			},
			handleCurrentChange(val) {
				this.currentPage4=val;
				this.selectpageimg(this.currentPage4,this.pageSize)
			},
			selectpageimg(pageNum,pageSize){
				let loadingInstance = Loading.service();
				let pageRequest={};
				
				pageRequest.pageSize=pageSize;
				pageRequest.pageNum=pageNum;
				console.log(pageRequest)
				selectPagePhoto(JSON.stringify(pageRequest)).then(res=>{
					loadingInstance.close();
					
					let data=res.data.data;
					this.imgcontent=data.content;
					this.totalSize=data.totalSize;
				}).catch(error=>{
					
				})
			},
			deletephotoitem(imgid,index){
				let photo={};
				photo.id=imgid;
				deletePhotoById(JSON.stringify(photo)).then(res=>{
					console.log(res);
				}).catch(error=>{
					
				})
				this.removeItemByIndex(this.imgcontent,index);
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
			}
			},
		data() {
			return {
				currentPage4: 4,
				pageSizes:[5, 10, 30, 100],
				pageSize:5,
				totalSize:400,
				imgcontent:[]
			};
    },
	created(){
		this.selectpageimg(this.currentPage4,this.pageSize)
	}
	}
</script>

<style lang="less">
	
</style>
