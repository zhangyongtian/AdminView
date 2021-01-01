<template>
	<div class="aticle-content">
		<!-- 这个是上面的部分 -->
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <el-breadcrumb separator-class="el-icon-arrow-right">
		      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
		      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
		    </el-breadcrumb>
		  </div>
		  <!-- 下面是选择的按钮 -->
<!-- 		  <aticleform></aticleform> -->
		</el-card>
		<!-- 这里是下面的部分 -->
		
		<el-card class="box-card" style="margin-top: 20px;">
		  <div slot="header" class="clearfix">
		    <span>共{{totalsize}}个结果</span>
		  </div>
			<div v-for="(item,index) in blogs">
				<aticletable :blog="item" :index="index" @deleteBlogById="deleteBlogById"></aticletable>
			</div>
		  
		  <!-- 下面是分页 -->
		  
		  <el-pagination
		        @size-change="handleSizeChange"
		        @current-change="handleCurrentChange"
		        :current-page="currentPage4"
		        :page-sizes="pagesizes"
		        :page-size="pagesize"
		        layout="total, sizes, prev, pager, next, jumper"
		        :total="totalsize" style="margin-top: 20px;">
		  </el-pagination>
		</el-card>
	</div>
</template>

<script>
	import {getblogpagebyuserid} from "@/util/requestnetwork/aticlerequest"
	import {deleteblogById} from "@/util/requestnetwork/aticlerequest"
	import aticleform from '@/components/Aticleadmin/aticleselectfrom.vue'
	import aticletable from '@/components/Aticleadmin/aticletable.vue'
	
	import { Loading } from 'element-ui';
	export default{
		name:"aticleadmin",
		components:{
			aticleform,
			aticletable
		},
		methods: {
		      handleSizeChange(val) {
		        this.pagesize=val;
						let user=JSON.parse(window.localStorage.getItem("remebermeadmin"))||{};
						this.getpages(this.currentPage4,this.pagesize,user);
		      },
		      handleCurrentChange(val) {
		        this.currentPage4=val;
						let user=JSON.parse(window.localStorage.getItem("remebermeadmin"))||{};
						this.getpages(this.currentPage4,this.pagesize,user);
		      },
					getpages(pageNum,pageSize,user){
						let loadingInstance = Loading.service();
						let pagerequest={};
					pagerequest.pageNum=pageNum;
					pagerequest.pageSize=pageSize;
					
					pagerequest.userid=user.id;
					console.log(pagerequest)
					getblogpagebyuserid(JSON.stringify(pagerequest)).then(res=>{
						console.log(res.data.data)
						let data=res.data.data;
						this.currentPage4=data.pageNum;
						this.pagesize=data.pageSize;
						this.totalsize=data.totalSize;
						this.blogs=data.content;
						loadingInstance.close();
					}).catch(error=>{
						
					})
					},
					deleteBlogById(blogid,blogindex){
						
						// 这里对于指定的blog进行删除
						this.open(this.blogs,blogindex,blogid);
						
					},
					// 定义一个方法,传入一个数组,还有一个下标删除数组对应下标的元素
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
					open(blogs,blogindex,blogid) {
        this.$alert('确定要删除吗？', '提示信息', {
          confirmButtonText: '确定',
          callback: action => {
						if(action=="confirm"){
							this.removeItemByIndex(this.blogs,blogindex);
							
							//这里发送一个请求用来删除blog
							console.log("删除的blogid是hfkjds"+blogid);
							let blog={};
							blog.id=blogid;
							deleteblogById(JSON.stringify(blog)).then(res=>{
								console.log(res)
							}).catch(error=>{
								
							})
							this.$message({
							  type: 'success',
							  message: `删除成功`
							});
						}else{
							this.$message({
							  type: 'info',
							  message: `取消删除`
							});
						}
						
            
          }
        });
      }
		    },
		    data() {
		      return {
		        currentPage4: 1,
		        pagesize:10,
		        pagesizes:[10, 20, 30, 100],
		        totalsize:400,
						blogs:[]
		      };
		    },
				created(){
					let user=JSON.parse(window.localStorage.getItem("remebermeadmin"))||{};
					this.getpages(this.currentPage4,this.pagesize,user);
				}
	}
</script>

<style lang="less">
	.aticle-content{
		text-align: left;
	}
</style>
