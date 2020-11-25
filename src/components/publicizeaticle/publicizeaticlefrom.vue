<template>
	<div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="文章标题" prop="title">
		    <el-input v-model="ruleForm.title"></el-input>
		  </el-form-item>
		  <el-form-item label="首图">
		    <upload></upload>
		  </el-form-item>
		  <el-form-item label="分类" prop="classfiyname">
		    <el-select v-model="ruleForm.classfiyname" placeholder="请选择活动区域">
		      <el-option label="区域一" value="shanghai"></el-option>
		      <el-option label="区域二" value="beijing"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="标签" prop="tagname">
		    <el-select v-model="ruleForm.tagname" placeholder="请选择活动区域">
		      <el-option label="区域一" value="shanghai"></el-option>
		      <el-option label="区域二" value="beijing"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="活动时间" required>
		    <el-col :span="11">
		      <el-form-item prop="date1">
		        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
		      </el-form-item>
		    </el-col>
		    <el-col class="line" :span="2">-</el-col>
		    <el-col :span="11">
		      <el-form-item prop="date2">
		        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
		      </el-form-item>
		    </el-col>
		  </el-form-item>
		  <el-form-item label="是否发布" prop="isfabu">
		    <el-switch v-model="ruleForm.isfabu"></el-switch>
		  </el-form-item>
		  <el-form-item label="简介" prop="introduce">
		    <el-input type="textarea" v-model="ruleForm.introduce"></el-input>
		  </el-form-item>
		  <el-form-item label="文章内容" prop="content">
		   <richeditt></richeditt>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
		    <el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	
	import upload from '@/components/publicizeaticle/upload.vue'
	import richeditt from '@/components/publicizeaticle/richedit.vue'
	export default{
		name:"publicizeaticlefrom",
		components:{
			upload,
			richeditt
		},
		data() {
		      return {
		        ruleForm: {
		          title: '',
		          classfiyname: '',
				  tagname:"",
		          date1: '',
		          date2: '',
		          isfabu: false,
		          type: [],
				  introduce:"",
				  content:""
		        },
		        rules: {
		          title: [
		            { required: true, message: '请输入标题'},
		            { min: 3, max: 15, message: '长度在 3 到 15 个字符'}
		          ],
		          classfiyname: [
		            { required: true, message: '请选择分类', trigger: 'change' }
		          ],
				  tagname: [
				    { required: true, message: '标签', trigger: 'change' }
				  ],
		          date1: [
		            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
		          ],
		          date2: [
		            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
		          ],
		          type: [
		            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
		          ],
				  introduce: [
				    { required: true, message: '输入文章的简介', trigger: 'change' }
				  ],
				  content: [
				    { required: true, message: '输入文章的简介', trigger: 'change' }
				  ]
		        }
		      };
		    },
		    methods: {
		      submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            alert('submit!');
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		      },
		      resetForm(formName) {
		        this.$refs[formName].resetFields();
		      }
		    }
	}
</script>

<style>
</style>
