<template>
	<div>
		<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="活动名称">
		    <el-input v-model="ruleForm.name"></el-input>
		  </el-form-item>
		  <el-form-item label="文章标签">
		    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
		      <el-option label="前端开发" value="shanghai"></el-option>
		      <el-option label="后端开发" value="beijing"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="文章类型">
				<el-select v-model="ruleForm.region" placeholder="请选择活动区域">
		  		<el-option label="前端开发" value="shanghai"></el-option>
		  		<el-option label="后端开发" value="beijing"></el-option>
		  	</el-select>
		  </el-form-item>
		  <el-form-item label="活动时间" required>
		    <el-col :span="11">
		      <el-form-item prop="date2">
				  <datepick></datepick>
		      </el-form-item>
		    </el-col>
		  </el-form-item>
		  <el-form-item label="文章状态" prop="resource">
		    <el-radio-group v-model="ruleForm.resource">
		      <el-radio label="已发布"></el-radio>
		      <el-radio label="未发布"></el-radio>
		    </el-radio-group>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm">查找</el-button>
		    <el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	import datepick from '@/components/Aticleadmin/datepick.vue'
	export default{
		name:"aticleselect",
			
		components:{
			datepick
		},
		data() {
		      return {
		        ruleForm: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: '',
				  classfiy:""
		        }
		      };
		    },
		    methods: {
		      resetForm(formName) {
		        this.$refs[formName].resetFields();
		      },
			  submitForm(){
				  console.log("查询")
			  }
		    }
	}
</script>

<style>
</style>
