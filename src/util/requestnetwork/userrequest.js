import {request} from '@/util/requestnetwork/request'
const userrequest=data=>{
	return request({
		method:"POST",
		url:"/rememberme/userrequest",
		data
	})
}
export {userrequest}
