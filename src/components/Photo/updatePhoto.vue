<template>
	<div class="photo_upload">
		<el-card class="box-card">
	<div slot="header" class="clearfix">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/admin/photoupload' }">超级管理员界面</el-breadcrumb-item>
			<el-breadcrumb-item>照片墙上传</el-breadcrumb-item>
		</el-breadcrumb>
		<el-upload
		class="upload-demo"
		drag
		action="http://localhost:8089/rememberme/uploadFile"
		multiple
		:on-success="sucessupload"
		:on-error="errorupload"
		name="img"
		:on-change="filechange"
		:file-list="fileList">
		<i class="el-icon-upload"></i>
		<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
	</el-upload>
	<div style="display: flex;">
		<template v-for="img in imgs">
			<el-image :src="img">
			<div slot="placeholder" class="image-slot">
				加载中<span class="dot">...</span>
			</div>
			</el-image>
		</template>
		
	</div>
	<div v-show="imgs.length>0">
		上传成功的图片
	</div>
	</div>
	</el-card>
	</div>
</template>

<script>
	import {savephoto} from "@/util/requestnetwork/adminrequest"
	
	
	 export default{
		 name:"fileupload",
		 methods: {
		 	sucessupload(res, file, fileList) {
		 		this.imgs.push(res.data);
				//这里就是图片上传成功了
				let photo={};
				photo.photosurl=res.data;
				savephoto(JSON.stringify(photo)).then(res=>{
					console.log(res)
				}).catch(error=>{
					console.log("保存图片有错误")
				})
		 	},
			errorupload(error){
				
			},
			filechange(file,filelist){
			}
		 },
		 data() {
		 	return {
		 		fileList:[],
				imgs:[]
		 	}
		 },
	 }
</script>

<style lang="less">
	.photo_upload{
		
	}
</style>
