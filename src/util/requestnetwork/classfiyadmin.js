import {request} from '@/util/requestnetwork/request'
const saveclassfiy=data=>{
	return request({
		method:"POST",
		url:"/rememberme/saveclassfiy",
		data
	})
}


const deleteclassfiyById=data=>{
	return request({
		method:"POST",
		url:"/rememberme/deleteclassfiyById",
		data
	})
}
export {saveclassfiy,deleteclassfiyById}
