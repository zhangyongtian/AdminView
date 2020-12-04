<template>
	<div>
		<el-dialog
			title="修改图片"
			:visible.sync="dialogVisible"
			width="30%"
			@opened="dialogOpen"
			>
			<div>
				<img :src="preimage" alt="" style="display: block;max-width: 100%;" ref="digimg">
			</div>
			
			<span>这是一段信息</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="commitimg">确 定</el-button>
			</span>
		</el-dialog>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="文章标题" prop="title">
		    <el-input v-model="ruleForm.title"></el-input>
		  </el-form-item>
		  <el-form-item label="首图一张图片">
				<!-- 把得到的图片的URL传递给父组件 -->
		    <!-- <upload v-on:getheadimg="gethimg"></upload> -->
				<div style="text-align: center;">
					<img :src="ruleForm.headimg" alt="" style="max-width: 100%;">
				</div>
			<input type="file" hidden="hidden" id="file1" @change="filechange" ref="file">
			<label for="file1">点击修改图片</label>
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
		   <richeditt @richdietcontenchange="richcontetchange"></richeditt>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
		    <el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	import 'cropperjs/dist/cropper.css';
	import Cropper from 'cropperjs';
	import upload from '@/components/publicizeaticle/upload.vue'
	import richeditt from '@/components/publicizeaticle/richedit.vue'
	import {getAllBlogTags} from '@/util/requestnetwork/getAllBlogTags'
	import {getAllBlogClassfiy} from '@/util/requestnetwork/getAllBlogClassfiy'
	import {saveBlog} from '@/util/requestnetwork/saveBlog'
	import {getBlogbyId} from '@/util/requestnetwork/blogrequest'
	import {updateblog} from '@/util/requestnetwork/blogrequest'
	import {uploadFileRequest} from '@/util/requestnetwork/uploadFileRequest'
	export default{
		name:"publicizeaticlefrom",
		components:{
			upload,
			richeditt
		},
		data() {
		      return {
				  dialogVisible:false,
				  //这个是图像处理的那个duixian
				  
				  croppper:null,
				  // 预览的图片
				  preimage:"",
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
								blogresult.id=this.$route.params.blogid;
								console.log(JSON.stringify(blogresult));
								updateblog(JSON.stringify(blogresult)).then(res=>{
									console.log(res);
									if(res.data.status==200){
										this.$message({
											showClose: true,
											message: '修改成功',
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
					},
					//获得首图的地址
					gethimg(headimg){
						this.ruleForm.headimg=headimg;
					},
					filechange(){
						console.log("文件修改了");
						
						this.dialogVisible=true;
						const file=this.$refs.file;
						this.preimage=window.URL.createObjectURL(file.files[0]);
						this.$refs.file.value=''
					},
					dialogOpen(){
						console.log("出来了")
						if(this.croppper!=null){
							this.croppper.replace(this.preimage);
							return;
						}
						const image = this.$refs.digimg;
						this.croppper= new Cropper(image, {
						aspectRatio: 1,
						viewMode:1,
						dragMode: "none",
						cropBoxResizable:true,
						cropBoxMovable:true
					});
					console.log("=========");
					console.log(cropper)
					},
					commitimg(){
						// this.dialogVisible=false;
						this.croppper.getCroppedCanvas().toBlob((file) => {
							// 这里上传的时候因为没有名字,所以手动的添加文件的名字
							let filename=Math.random()+".png";
							const formData = new FormData();
							formData.append("img",file,filename);
							uploadFileRequest(formData).then(res=>{
								let resultimg=res.data.data;
								this.ruleForm.headimg=resultimg;
								this.dialogVisible=false;
							}).catch(error=>{
								
							})
							})
						
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
					
					// 这里获取传过来的id查询blog
					let blog={};
					blog.id=this.$route.params.blogid;
					console.log(blog)
					getBlogbyId(JSON.stringify(blog)).then(res=>{
						console.log(res)
						let data=res.data.data;
						// 这里的分类要重新获得
						// 还有标签要获取全部
						this.ruleForm.content=data.content;
						this.ruleForm.title=data.title;
						this.ruleForm.isfabu=data.isfabu;
						this.ruleForm.introduce=data.introduce;
						this.ruleForm.headimg=data.headpic;
					}).catch(error=>{
						
					})
				}
	}
</script>

<style>
</style>
