import {request} from '@/util/requestnetwork/request'
const savephoto=data=>{
	return request({
		method:"POST",
		url:"/rememberme/admin/savephoto",
		data
	})
}

const selectPagePhoto=data=>{
	return request({
		method:"POST",
		url:"/rememberme/admin/selectPagePhoto",
		data
	})
}

const deletePhotoById=data=>{
	return request({
		method:"POST",
		url:"/rememberme/admin/deletePhotoById",
		data
	})
}

const getPhotoById=data=>{
	return request({
		method:"POST",
		url:"/rememberme/admin/getPhotoById",
		data
	})
}

const updatePhotoById=data=>{
	return request({
		method:"POST",
		url:"/rememberme/admin/updatePhotoById",
		data
	})
}

export {savephoto,selectPagePhoto,deletePhotoById,getPhotoById,updatePhotoById}
