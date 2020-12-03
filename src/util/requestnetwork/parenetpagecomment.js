import {request} from '@/util/requestnetwork/request'
const parenetpagecomment=data=>{
	return request({
		method:"POST",
		url:"/rememberme/parenetpagecomment",
		data
	})
}
const deleteparentcomment=data=>{
	return request({
		method:"POST",
		url:"/rememberme/deleteparentcomment",
		data
	})
}
export {parenetpagecomment,deleteparentcomment}
