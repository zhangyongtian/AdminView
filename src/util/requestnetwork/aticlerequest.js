import {request} from '@/util/requestnetwork/request'
const getblogpagebyuserid=data=>{
	return request({
		method:"POST",
		url:"/rememberme/getblogpagebyuserid",
		data
	})
}

const deleteblogById=data=>{
	return request({
		method:"POST",
		url:"/rememberme/deleteblogById",
		data
	})
}
export {getblogpagebyuserid,deleteblogById}