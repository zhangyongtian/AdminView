<template>
	<div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="文章标题" prop="title">
		    <el-input v-model="ruleForm.title"></el-input>
		  </el-form-item>
		  <el-form-item label="首图一张图片">
				<!-- 把得到的图片的URL传递给父组件 -->
		    <upload v-on:getheadimg="gethimg"></upload>
		  </el-form-item>
		  <el-form-item label="分类" prop="classfiyname">
		    <el-select v-model="ruleForm.classfiyname" multiple placeholder="请选择博客的标签">
		        <el-option
		          v-for="item in blogclassfiy"
		          :key="item.classfiyname"
		          :label="item.classfiyname"
		          :value="item.classfiyid">
		        </el-option>
		      </el-select>
		  </el-form-item>
		  <el-form-item label="标签" prop="tagname">
				<el-select v-model="ruleForm.tagname" multiple placeholder="请选择博客的标签">
				    <el-option
				      v-for="item in blogtags"
				      :key="item.tagname"
				      :label="item.tagname"
				      :value="item.tagid">
				    </el-option>
				  </el-select>
		  </el-form-item>
			
		  <el-form-item label="是否发布" prop="isfabu">
		    <el-switch v-model="ruleForm.isfabu"></el-switch>
		  </el-form-item>
		  <el-form-item label="简介" prop="introduce">
		    <el-input type="textarea" v-model="ruleForm.introduce"></el-input>
		  </el-form-item>
		  <el-form-item label="文章内容" prop="content">
				
				<!-- 把文本框的内容全部给父组件处理 -->
		   <richeditt v-on:richdietcontenchange="richcontetchange" ></richeditt>
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
	import {getAllBlogTags} from '@/util/requestnetwork/getAllBlogTags'
	import {getAllBlogClassfiy} from '@/util/requestnetwork/getAllBlogClassfiy'
	import {saveBlog} from '@/util/requestnetwork/saveBlog'
	export default{
		name:"publicizeaticlefrom",
		components:{
			upload,
			richeditt
		},
		data() {
		      return {
						blogtags:[],
						blogclassfiy:[],
		        ruleForm: {
		          title: '',
		          classfiyname: '',
							tagname:"",
		          isfabu: false,
		          type: [],
							introduce:"",
							content:"",
							headimg:""
		        },
		        rules: {
		          title: [
		            { required: true, message: '请输入标题'},
		            { min: 3, max: 30, message: '长度在 3 到 30 个字符'}
		          ],
		          classfiyname: [
		            { required: true, message: '请选择分类', trigger: 'change' }
		          ],
				  tagname: [
				    { required: true, message: '标签', trigger: 'change' }
				  ],
		         
		          type: [
		            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
		          ],
				  introduce: [
				    { required: true, message: '输入文章的简介', trigger: 'change' }
				  ],
				  content: [
				    { required: true, message: '输入文章的内容', trigger: 'change' }
				  ]
		        }
		      };
		    },
		    methods: {
		      submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            //这里是提交数据
								let blogresult={};
								blogresult.userid=this.$store.state.user.id;
								blogresult.title=this.ruleForm.title;
								blogresult.headimg=this.ruleForm.headimg;
								blogresult.classfiy=this.ruleForm.classfiyname;
								blogresult.tag=this.ruleForm.tagname;
								blogresult.isfabu=this.ruleForm.isfabu?1:0;
								blogresult.introduce=this.ruleForm.introduce;
								blogresult.content=this.ruleForm.content;
								console.log(JSON.stringify(blogresult));
								saveBlog(JSON.stringify(blogresult)).then(res=>{
									console.log(res);
									if(res.data.status==200){
										this.$message({
											showClose: true,
											message: '发表文章成功',
											type: 'success'
										});
									}
									
								}).catch(error=>{
									console.log("保存blog错误");
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
					// 获得富文本框的内容
					richcontetchange(content){
						this.ruleForm.content=content;
						console.log(content)
					},
					//获得首图的地址
					gethimg(headimg){
						this.ruleForm.headimg=headimg;
					}
		    },
				created(){
					// 这里开始就获取所有的标签
					getAllBlogTags().then(res=>{
						this.blogtags=res.data.data;
					}).catch(error=>{
						console.log("请求标签错误")
					})
					
					getAllBlogClassfiy().then(res=>{
						this.blogclassfiy=res.data.data;
					}).catch(error=>{
						console.log("请求标签错误")
					})
				}
	}
</script>

<style>
</style>
