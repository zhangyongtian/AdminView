import {request} from '@/util/requestnetwork/request'
export const getAllBlogClassfiy=data=>{
	return request({
		method:"POST",
		url:"/rememberme/getAllBlogClassfiy",
		data
	})
}
