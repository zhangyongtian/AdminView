<template>
	<div class="user_aticle">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/admin/useraticle' }">超级管理员界面</el-breadcrumb-item>
					<el-breadcrumb-item>文章管理</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			
			<template v-for="(item,index) in aticle">
				<useraticleItem :aticle="item" :index="index" @deleteBlogById="deleteBlogById"></useraticleItem>
			</template>
			<!-- 下面是分页 -->
			<el-pagination
			  @size-change="handleSizeChange"
			  @current-change="handleCurrentChange"
			  :current-page="currentPage4"
			  :page-sizes="pageSizes"
			  :page-size="pageSize"
			  layout="total, sizes, prev, pager, next, jumper"
			  :total="total">
			</el-pagination>
		</el-card>
		
	
	</div>
</template>

<script>
	import useraticleItem from '@/components/useraticleadmin/useraticleItem'
	
	import {getAticleAdminPage} from '@/util/requestnetwork/userAticleAmin.js'
	import {deleteBlogById} from '@/util/requestnetwork/userAticleAmin.js'
	import { Loading } from 'element-ui';
	
	export default{
		name:"userAticle",
		components:{
			useraticleItem
		},
		methods: {
      handleSizeChange(val) {
        this.pageSize=val;
		let pageRequest={};
		pageRequest.pageNum=this.currentPage4;
		pageRequest.pageSize=this.pageSize;
		getAticleAdminPage(JSON.stringify(pageRequest)).then(res=>{
			let data=res.data.data;
			console.log(data)
			this.pageSize=data.pageSize;
			this.currentPage4=data.pageNum;
			this.total=data.totalSize;
			this.aticle=data.content;
		}).catch(error=>{
			
		})
      },
      handleCurrentChange(val) {
        this.currentPage4=val;
		let pageRequest={};
		pageRequest.pageNum=this.currentPage4;
		pageRequest.pageSize=this.pageSize;
		getAticleAdminPage(JSON.stringify(pageRequest)).then(res=>{
			let data=res.data.data;
			console.log(data)
			this.pageSize=data.pageSize;
			this.currentPage4=data.pageNum;
			this.total=data.totalSize;
			this.aticle=data.content;
		}).catch(error=>{
			
		})
      }
	  ,
	  deleteBlogById(blogid,index){
		  console.log(blogid,index);
		  this.removeItemByIndex(this.aticle,index);
		  let blog={};
		  blog.id=blogid;
		  deleteBlogById(JSON.stringify(blog)).then(res=>{
			  this.$message({
				message: '恭喜你，删除成功',
				type: 'success'
				});
		  }).catch(error=>{
			  
		  })
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
        currentPage4: 1,
		pageSizes:[10, 20, 30, 100],
		pageSize:10,
		total:400,
		aticle:[]
      };
    },
	created() {
		let pageRequest={};
		pageRequest.pageNum=this.currentPage4;
		pageRequest.pageSize=this.pageSize;
		let loadingInstance = Loading.service();
		getAticleAdminPage(JSON.stringify(pageRequest)).then(res=>{
			console.log(res)
			let data=res.data.data;
			loadingInstance.close();
			this.pageSize=data.pageSize;
			this.currentPage4=data.pageNum;
			this.total=data.totalSize;
			this.aticle=data.content;
		}).catch(error=>{
			
		})
	}
	}
</script>

<style lang="less">
	
</style>
