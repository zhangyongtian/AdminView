import {request} from '@/util/requestnetwork/request'
const getAticleAdminPage=data=>{
	return request({
		method:"POST",
		url:"/rememberme/admin/getAticleAdminPage",
		data
	})
}

const deleteBlogById=data=>{
	return request({
		method:"POST",
		url:"/rememberme/admin/deleteBlogById",
		data
	})
}
export {getAticleAdminPage,deleteBlogById}
