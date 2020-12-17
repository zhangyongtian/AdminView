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
		action="https://huabei5zhanh.oss-cn-huhehaote.aliyuncs.com"
		:data="dataObj"
		:multiple="false"
		:on-success="successUpload"
		:before-upload="beforeUpload"
		:on-error="errorupload"
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
	import {ossfileupload} from "@/util/requestnetwork/OssFileUpload"
	
	 export default{
		 name:"fileupload",
		 methods: {
		 	successUpload(res, file, fileList) {
				this.fileList.pop();
				this.fileList.push({name: file.name, url: this.dataObj.host + '/' + this.dataObj.key.replace("${filename}",file.name) });
				console.log("最后的文件地址是"+this.fileList[0].url)
		 		this.imgs.push(this.fileList[0].url);
				//这里就是图片上传成功了
				let photo={};
				photo.photosurl=this.fileList[0].url;
				savephoto(JSON.stringify(photo)).then(res=>{
					console.log(res)
				}).catch(error=>{
					console.log("保存图片有错误")
				})
		 	},
			errorupload(error){
				
			},
			filechange(file,filelist){
			},
			beforeUpload(file) {
			  let _self = this;
			  return new Promise((resolve,reject)=>{
				  ossfileupload().then(response=>{
				  			  console.log("紫红色哥是")
				  			  console.log(response.data)
				  			  _self.dataObj.policy = response.data.policy;
				  			  _self.dataObj.signature = response.data.signature;
				  			  _self.dataObj.ossaccessKeyId = response.data.accessid;
				  			  _self.dataObj.key = response.data.dir +this.getUUID()+'_${filename}';
				  			  _self.dataObj.dir = response.data.dir;
				  			  _self.dataObj.host = response.data.host;
						resolve(true)
				  }).catch(error=>{
				  		reject(false)	  
				  })
			  })
			  
			},
			getUUID () {
			  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
			    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
			  })
			}
		 },
		 data() {
		 	return {
				imgs:[],
				dataObj: {
				  policy: '',
				  signature: '',
				  key: '',
				  ossaccessKeyId: '',
				  dir: '',
				  host: '',
				  // callback:'',
				}
		 	}
		 },
		 computed:{
		 	fileList() {
		 	  return []
		 	}
		 }
	 }
</script>

<style lang="less">
	.photo_upload{
		
	}
</style>
