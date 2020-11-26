import {request} from '@/util/requestnetwork/request'
export const uploadFileRequest=data=>{
	return request({
		method:"POST",
		url:"/rememberme/uploadFile",
		data
	})
}