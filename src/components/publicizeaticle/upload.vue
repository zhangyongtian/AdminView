<template>
	<div>
		<el-upload
		  action="https://huabei5zhanh.oss-cn-huhehaote.aliyuncs.com"
		  :data="dataObj"
		  list-type="picture-card"
		  :on-preview="handlePictureCardPreview"
		  :on-remove="handleRemove"
			:multiple="false"
			:on-success="successUpload"
			:before-upload="beforeUpload"
		  :file-list="fileList">
		  <i class="el-icon-plus"></i>
		</el-upload>
		<el-dialog :visible.sync="dialogVisible">
		  <img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>

<script>
	import {ossfileupload} from "@/util/requestnetwork/OssFileUpload"
  export default {
    data() {
          return {
            dialogImageUrl: '',
            dialogVisible: false,
			dataObj: {
			  policy: '',
			  signature: '',
			  key: '',
			  ossaccessKeyId: '',
			  dir: '',
			  host: '',
			  // callback:'',
			}
          };
        },
        methods: {
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          },
		successUpload(response, file, fileList){
			this.fileList.pop();
			this.fileList.push({name: file.name, url: this.dataObj.host + '/' + this.dataObj.key.replace("${filename}",file.name) });
			console.log("最后的文件地址是"+this.fileList[0].url)
			this.$emit("getheadimg",this.fileList[0].url);
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
		computed:{
			fileList() {
			  return []
			}
		}
  }
</script>

<style>

</style>
