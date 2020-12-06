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

// 这里上传的时候因为没有名字,所以手动的添加文件的名字

			let filename=Math.random()+".png";

			const formData = new FormData();

			formData.append("img",file,filename);

			uploadFileRequest(formData).then(res=>{

			let resultimg=res.data.data;
			this.photo.imgurl=resultimg;
			let img={};
			img.imgurl=this.photo.imgurl;
			img.id=this.photo.id;
			console.log("+++++++")
			console.log(updatePhotoById)
			updatePhotoById(JSON.stringify(img)).then(res=>{
				this.dialogVisible=false;
				console.log(res);
				console.log("++++++++++++++")
				 this.$message({
				message: '恭喜你，修改成功',
				type: 'success'
				});
			}).catch(error=>{
				
			})
			}).catch(error=>{

			})
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
