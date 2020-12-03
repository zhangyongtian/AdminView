import {request} from '@/util/requestnetwork/request'
const getBlogbyId=data=>{
	return request({
		method:"POST",
		url:"/rememberme/getBlogbyId",
		data
	})
}

const updateblog=data=>{
	return request({
		method:"POST",
		url:"/rememberme/updateblog",
		data
	})
}
export {getBlogbyId,updateblog}
