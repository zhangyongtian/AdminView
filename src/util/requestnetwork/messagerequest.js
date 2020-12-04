import {request} from '@/util/requestnetwork/request'
const savemessage=data=>{
	return request({
		method:"POST",
		url:"/rememberme/savemessage",
		data
	})
}
const selectMessagePage=data=>{
	return request({
		method:"POST",
		url:"/rememberme/selectMessagePage",
		data
	})
}

const deletemessageById=data=>{
	return request({
		method:"POST",
		url:"/rememberme/deletemessageById",
		data
	})
}


export {savemessage,selectMessagePage,deletemessageById}
