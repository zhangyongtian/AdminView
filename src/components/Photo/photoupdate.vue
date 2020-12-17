<template>
	<div class="photoupdate">
		<el-dialog
		title="提示"
		:visible.sync="dialogVisible"
		width="30%"
		@opened="showopend"
		>
			<div>
				<img :src="preimg" alt="" style="display: block;max-width: 100%;" ref="tarimg">
			</div>
			<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="commitphoto">确 定</el-button>
			</span>
		</el-dialog>
		
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/admin/photoadmin' }">超级管理员界面</el-breadcrumb-item>
					<el-breadcrumb-item>图片修改</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div>
				<el-card class="box-card">
					<img :src="photo.imgurl" alt="">
				</el-card>
				<input type="file" hidden="hidden" id="file" @change="showdrag" ref="file">
				<el-button type="primary" style="margin-top: 10px;"><label for="file">点击修改</label></el-button>
			</div>
		</el-card>
	</div>
</template>

<script>
	import 'cropperjs/dist/cropper.css';
	import {uploadFileRequest} from '@/util/requestnetwork/uploadFileRequest'
	import {updatePhotoById} from '@/util/requestnetwork/adminrequest'
	
	import {getPhotoById} from "@/util/requestnetwork/adminrequest"
	
	import Cropper from 'cropperjs';
	
		// 使用oss
	import {alibabafilerequestimp} from '@/util/requestnetwork/ossRequestFileToAli'
	import {filegetprotiy} from '@/util/requestnetwork/ossRequestFileToAli'
	export default{
		name:"photoupdate",
		data() {
			return {
				dialogVisible: false,
				preimg:"",
				cropper:null,
				photo:{}
			}
		},
		methods: {
			showdrag() {
				this.dialogVisible=true;
				const file=this.$refs.file;
				this.preimg=window.URL.createObjectURL(file.files[0]);
				this.$refs.file.value=''
			},
			showopend(){
				if(this.cropper!=null){
					this.cropper.replace(this.preimg);
					return;
				}
				const imgg=this.$refs.tarimg;
				this.cropper=new Cropper(imgg,{
					aspectRatio: 2,
					viewMode:1,
					dragMode: "none",
					cropBoxResizable:true,
					cropBoxMovable:true
				})
			},
			commitphoto(){
				// this.dialogVisible=false;

			this.cropper.getCroppedCanvas().toBlob((file) => {
				
			const fd=new FormData();
			// //这里改成oss的
			let url="";
			 let policy={};
			 function getUUID () {
			   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
			     return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
			   })
			 }
				
				

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
												this.photo.imgurl=url;
												let img={};
												img.imgurl=this.photo.imgurl;
												img.id=this.photo.id;
												updatePhotoById(JSON.stringify(img)).then(res=>{
													this.dialogVisible=false;
													 this.$message({
													message: '恭喜你，修改成功',
													type: 'success'
													});
												}).catch(error=>{
													
												})
									this.dialogVisible=false;
								})
								
							})
			

// 			uploadFileRequest(formData).then(res=>{
// 
// 			let resultimg=res.data.data;
// 			this.photo.imgurl=resultimg;
// 			let img={};
// 			img.imgurl=this.photo.imgurl;
// 			img.id=this.photo.id;
// 			updatePhotoById(JSON.stringify(img)).then(res=>{
// 				this.dialogVisible=false;
// 				 this.$message({
// 				message: '恭喜你，修改成功',
// 				type: 'success'
// 				});
// 			}).catch(error=>{
// 				
// 			})
// 			}).catch(error=>{
// 
// 			})
			
			//这里是截止的地方
			})}
			},
			created(){
				let photo={};
				photo.id=this.$route.params["photoid"];
				getPhotoById(JSON.stringify(photo)).then(res=>{
					this.photo=res.data.data;
				}).catch(error=>{
					
				})
			}
		}
</script>

<style>
</style>
