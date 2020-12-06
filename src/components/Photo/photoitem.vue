<template>
	<div>
		<el-card style="height: 200px;width: 150px;margin: 10px;">
			<img :src="img.imgurl"
			 class="image"
			 style="width: 100%;height: 100%;">
		<div style="padding: 14px;">
			<div class="bottom clearfix" style="display: flex;">
				<el-button type="primary" icon="el-icon-edit" circle @click="updatephoto(img.id)"></el-button>
				<el-button type="danger" icon="el-icon-delete" circle @click="deletephoto(img.id,index)"></el-button>
			</div>
		</div>
		</el-card>
	</div>
</template>

<script>
	export default{
		name:"photo",
		props: {
			img: {
				type: Object,
				default(){
					return{}
				} 
			},
			index:{
				type:Number,
				dafault:-1
			}
		},
		methods: {
			updatephoto(imgid) {
				this.$router.push({path:`/admin/updatephoto/${imgid}`})
			},
			deletephoto(imgid,index){
				this.$emit("deletephotoitem",imgid,index);
			}
		},
	}
</script>

<style>
</style>
