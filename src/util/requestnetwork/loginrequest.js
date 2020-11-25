import {request} from '@/util/requestnetwork/request'
export const loginrequest=data=>{
	return request({
		method:"POST",
		url:"/rememberme/userSinIn",
		data
	})
}
