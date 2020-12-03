import {request} from '@/util/requestnetwork/request'
const soncommentRequest=data=>{
	return request({
		method:"POST",
		url:"/rememberme/soncommentRequest",
		data
	})
}
const deletesoncomment=data=>{
	return request({
		method:"POST",
		url:"/rememberme/deletesoncomment",
		data
	})
}
export {soncommentRequest,deletesoncomment}
