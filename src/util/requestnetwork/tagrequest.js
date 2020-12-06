import {request} from '@/util/requestnetwork/request'
const savetag=data=>{
	return request({
		method:"POST",
		url:"/rememberme/savetag",
		data
	})
}


const deletetagById=data=>{
	return request({
		method:"POST",
		url:"/rememberme/deletetagById",
		data
	})
}
export {savetag,deletetagById}
