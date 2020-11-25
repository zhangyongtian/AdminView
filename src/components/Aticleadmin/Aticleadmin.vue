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
		  <aticleform></aticleform>
		</el-card>
		<!-- 这里是下面的部分 -->
		
		<el-card class="box-card" style="margin-top: 20px;">
		  <div slot="header" class="clearfix">
		    <span>共78个结果</span>
		  </div>
		  <aticletable></aticletable>
		  <!-- 下面是分页 -->
		  
		  <el-pagination
		        @size-change="handleSizeChange"
		        @current-change="handleCurrentChange"
		        :current-page="currentPage4"
		        :page-sizes="[100, 200, 300, 400]"
		        :page-size="100"
		        layout="total, sizes, prev, pager, next, jumper"
		        :total="400" style="margin-top: 20px;">
		  </el-pagination>
		</el-card>
	</div>
</template>

<script>
	import aticleform from '@/components/Aticleadmin/aticleselectfrom.vue'
	import aticletable from '@/components/Aticleadmin/aticletable.vue'
	export default{
		name:"aticleadmin",
		components:{
			aticleform,
			aticletable
		},
		methods: {
		      handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		      },
		      handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		      }
		    },
		    data() {
		      return {
		        currentPage1: 5,
		        currentPage2: 5,
		        currentPage3: 5,
		        currentPage4: 4
		      };
		    }
	}
</script>

<style lang="less">
	.aticle-content{
		text-align: left;
	}
</style>
