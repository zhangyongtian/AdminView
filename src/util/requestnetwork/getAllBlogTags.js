import {request} from '@/util/requestnetwork/request'
export const getAllBlogTags=data=>{
	return request({
		method:"POST",
		url:"/rememberme/getAllBlogTags",
		data
	})
}
