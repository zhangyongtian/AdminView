<template>
	<div class="userdetail">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>用户详情</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-dialog
		title="选择图片"
		:visible.sync="dialogVisible"
		width="30%"
		@opened="dialogopen"
		>
		<div>
			<img :src="preimage" alt="" style="display: block;max-width: 100%;" ref="targetimg">
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="headimgcommit">确 定</el-button>
			</span>
			</el-dialog>
			<div class="userdetail_img">
				<img :src="user.userimage" alt="">
				<div>
					<label for="file"><el-tag >点击修改头像</el-tag></label>
				</div>
			</div>
			<input type="file" hidden id="file" ref="filefile" @change="filechange" >
			<div class="userdetail_from">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="用户名" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
			</div>
		</el-card>
	</div>
</template>

<script>
	import 'cropperjs/dist/cropper.css';
	import {uploadFileRequest} from '@/util/requestnetwork/uploadFileRequest'
	import {userrequest} from '@/util/requestnetwork/userrequest'
	// 使用oss
	import {alibabafilerequestimp} from '@/util/requestnetwork/ossRequestFileToAli'
	import {filegetprotiy} from '@/util/requestnetwork/ossRequestFileToAli'
	
	import Cropper from 'cropperjs';
	export default{
		name:"userdetail",
		data() {
      return {
        ruleForm: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 30 个字符', trigger: 'blur' }
          ]
        },
		user:{},
		dialogVisible: false,
		croppper:null,
		preimage:""
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 提交
			let user=this.user;
			user.username=this.ruleForm.name;
			userrequest(JSON.stringify(user)).then(res=>{
				console.log("修改成功");
				this.$message({
				showClose: true,
				message: '恭喜你，修改信息成功，用户重新登录就可以刷新用户信息了',
				type: 'success'
			});
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
	  filechange(){
		  this.dialogVisible=true;
		  const file= this.$refs.filefile;
		  console.log(file)
		  this.preimage=window.URL.createObjectURL(file.files[0]);
		  this.$refs.file.value=''
	  },
	  dialogopen(){
		  console.log("出来了")
		  	if(this.croppper!=null){
		  		this.croppper.replace(this.preimage);
		  		return;
		  	}
		  	const image = this.$refs.targetimg;
		  	this.croppper= new Cropper(image, {
		  	aspectRatio: 1,
		  	viewMode:1,
		  	dragMode: "none",
		  	cropBoxResizable:true,
		  	cropBoxMovable:true
		  });

		  },
		  headimgcommit(){
			  this.dialogVisible=false;
			  // this.dialogVisible=false;
			  const fd=new FormData();
			  // //这里改成oss的
			  let url="";
			   let policy={};
			   function getUUID () {
			     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
			       return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
			     })
			   }
			  this.croppper.getCroppedCanvas().toBlob((file) => {
			  	// 这里上传的时候因为没有名字,所以手动的添加文件的名字
			  	let filename=Math.random()+".png";
			  	
				filegetprotiy().then(response=>{
									policy.policy = response.data.policy;
									policy.signature = response.data.signature;
									policy.ossaccessKeyId = response.data.accessid;
									policy.key = response.data.dir +getUUID()+'_${filename}';
									policy.dir = response.data.dir;
									policy.host = response.data.host;
									// _self.dataObj.policy = response.data.policy;
									// _self.dataObj.signature = response.data.signature;
									// _self.dataObj.ossaccessKeyId = response.data.accessid;
									// _self.dataObj.key = response.data.dir +this.getUUID()+'_${filename}';
									// _self.dataObj.dir = response.data.dir;
									// _self.dataObj.host = response.data.host;
									fd.append("policy",policy.policy);
									fd.append("signature",policy.signature);
									fd.append("key",policy.key);
									fd.append("ossaccessKeyId",policy.ossaccessKeyId);
									fd.append("dir",policy.dir);
									fd.append("host",policy.host);
									fd.append("file",file,filename);
									
								  alibabafilerequestimp(fd).then(res=>{
										url=policy.host + '/' + policy.key.replace("${filename}",filename);
										this.user.userimage=url;
										console.log("非得")
										console.log(this.user.userimage)
										this.dialogVisible=false;
									})
									
								})
				
			  	// uploadFileRequest(formData).then(res=>{
			  		// let resultimg=res.data.data;
			  		// this.user.userimage=resultimg;
			  		// this.dialogVisible=false;
			  	// }).catch(error=>{
			  	// 	
			  	// })
			  	})
		  }
    },
	created(){
		this.user=this.$store.state.user;
		this.ruleForm.name=this.user.username;
	}
	}
</script>

<style lang="less">
	.userdetail{
		.userdetail_img{
			
		}
		.userdetail_from{
			margin-top: 10px;
		}
	}
</style>
