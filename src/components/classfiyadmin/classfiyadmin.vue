<template>
	<div class="classfiy_content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/admin/classfiyadmin' }">超级管理员界面</el-breadcrumb-item>
					<el-breadcrumb-item>分类管理</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			
			<div>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="分类名称" prop="name">
						<el-input v-model="ruleForm.name"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			
			<!-- 下面是分类的显示 -->
			<div>
				<template v-for="item in blogclassfiy">
					<el-tag closable @close="deleteclassfiy(item.classfiyid)" style="margin-left: 10px;">{{item.classfiyname}}</el-tag>
				</template>
			</div>
		</el-card>
		</div>
</template>

<script>
	import {getAllBlogClassfiy} from '@/util/requestnetwork/getAllBlogClassfiy'
	import {saveclassfiy} from '@/util/requestnetwork/classfiyadmin'
	import {deleteclassfiyById} from '@/util/requestnetwork/classfiyadmin'
	
	export default{
		name:"classfiyadmin",
		data() {
      return {
        ruleForm: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入合适的分类', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
          ]
        },
		blogclassfiy:[]
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //这里添加标签
			let classfiy={};
			classfiy.classfiyname=this.ruleForm.name;
			console.log(classfiy)
			saveclassfiy(JSON.stringify(classfiy)).then(res=>{
				this.$message({
				message: '恭喜你，保存成功',
				type: 'success'
				});
				this.ruleForm.name='';
				console.log(res)
				getAllBlogClassfiy().then(res=>{
					this.blogclassfiy=res.data.data;
				}).catch(error=>{
					console.log("请求标签错误")
				})
			}).catch(error=>{
				console.log("保存分类失败")
			})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
	  deleteclassfiy(classfiyid){
		  let classfiy={};
		  classfiy.classfiyid=classfiyid;
		  deleteclassfiyById(JSON.stringify(classfiy)).then(res=>{
			  this.$message({
			  message: '恭喜你，删除成功',
			  type: 'success'
			  });
			  getAllBlogClassfiy().then(res=>{
			  	this.blogclassfiy=res.data.data;
			  }).catch(error=>{
			  	console.log("请求标签错误")
			  })
		  }).catch(error=>{
			  
		  })
	  }
    },
	created(){
		getAllBlogClassfiy().then(res=>{
			this.blogclassfiy=res.data.data;
		}).catch(error=>{
			console.log("请求标签错误")
		})
	}
}
</script>

<style lang="less">
	
</style>
