import axios from 'axios'
const  alibabafilerequest=axios.create({
	timeout:20000,
	baseURL:"",
	headers:{'Content-Type':'multipart/form-data'}
});
	
const alibabafilerequestimp=data=>{
	return alibabafilerequest({
		method:"POST",
		url:"https://huabei5zhanh.oss-cn-huhehaote.aliyuncs.com",
		data
	})
}

const filegetprotiy=data=>{
	return alibabafilerequest({
		method:"GET",
		url:"http://localhost:8089/rememberme/ossFileUpload",
		data
	})
}
export {alibabafilerequest,alibabafilerequestimp,filegetprotiy}
