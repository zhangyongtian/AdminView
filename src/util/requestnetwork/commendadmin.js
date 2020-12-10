import {request} from '@/util/requestnetwork/request'
const getAllcomment=data=>{
	return request({
		method:"POST",
		url:"/rememberme/admin/getAllcomment",
		data
	})
}

const deletecommentById=data=>{
	return request({
		method:"POST",
		url:"/rememberme/admin/deletecommentById",
		data
	})
}
export {getAllcomment,deletecommentById}
