import {request} from '@/util/requestnetwork/request'
export const saveBlog=data=>{
	return request({
		method:"POST",
		url:"/rememberme/saveBlog",
		data
	})
}
