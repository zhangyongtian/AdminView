import {request} from '@/util/requestnetwork/request'
const ossfileupload=data=>{
	return request({
		method:"POST",
		url:"/rememberme/ossFileUpload",
		data
	})
}
// ossFileUpload
export {ossfileupload}

