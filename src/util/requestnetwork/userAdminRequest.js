import {request} from '@/util/requestnetwork/request'
const userAdminPage=data=>{
	return request({
		method:"POST",
		url:"/rememberme/admin/userAdminPage",
		data
	})
}


const deleteUserById=data=>{
	return request({
		method:"POST",
		url:"/rememberme/admin/deleteUserById",
		data
	})
}

const getUserById=data=>{
	return request({
		method:"POST",
		url:"/rememberme/admin/getUserById",
		data
	})
}

const getAllRole=data=>{
	return request({
		method:"POST",
		url:"/rememberme/admin/getAllRole",
		data
	})
}

const updateUserRoles=data=>{
	return request({
		method:"POST",
		url:"/rememberme/admin/updateUserRoles",
		data
	})
}
export {userAdminPage,deleteUserById,getUserById,getAllRole,updateUserRoles}
