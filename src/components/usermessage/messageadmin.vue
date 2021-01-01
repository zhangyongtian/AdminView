<template>
	<div class="messageadmin_content">
		<el-dialog
		title="删除提示"
		:visible.sync="dialogVisible"
		width="30%"
		>
		<span>确定要删除这一条信息吗</span>
		<span slot="footer" class="dialog-footer">
		<el-button @click="dialogVisible = false">取 消</el-button>
		<el-button type="primary" @click="deleteitem">确 定</el-button>
		</span>
		</el-dialog>

		<div class="messageadmin_content_c">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<el-breadcrumb separator-class="el-icon-arrow-right">
						<el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
						<el-breadcrumb-item>留言管理</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div>
					<template v-for="(item,index) in message">
						<messageitem :message="item" :index="index" @deletemessageitem="deletemessageitem"></messageitem>
					</template>
				</div>
				<div class="messageadmin_content_page">
					<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage4"
					:page-sizes="pageSizes"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total">
					</el-pagination>
					</div>
				</el-card>
				
			</div>
		</div>
</template>

<script>
	import messageitem from "@/components/usermessage/messageitem"
	import {selectMessagePage} from "@/util/requestnetwork/messagerequest"
	import {deletemessageById} from "@/util/requestnetwork/messagerequest"
	
	import { Loading } from 'element-ui';
	
	export default{
		name:"messageadmin",
		components: {
			messageitem
		},
		 methods: {
      handleSizeChange(val) {
		 this.pageSize=val;
        this.getmessage(this.currentPage4,this.pageSize,this.user.id);
      },
      handleCurrentChange(val) {
		  this.currentPage4=val;
       this.getmessage(this.currentPage4,this.pageSize,this.user.id);
      },
	  getmessage(pageNum,pageSize,userid){
		  let loadingInstance = Loading.service();
		  let pageRequest={};
		  pageRequest.pageNum=pageNum;
		  pageRequest.pageSize=pageSize;
		  pageRequest.userid=userid;
		  selectMessagePage(JSON.stringify(pageRequest)).then(res=>{
		  	let data=res.data.data;
		  	this.currentPage4=data.pageNum;
		  	this.pageSize=data.pageSize;
		  	this.total=data.totalSize;
		  	this.message=data.content
			loadingInstance.close();
		  }).catch(error=>{
		  	
		  })
	  },
	  // 这里是要删除的messageitem
	  deletemessageitem(messageid,index){
		  this.dialogVisible=true;
		  this.deletemessageid=messageid;
		  this.deletemessageiteme=index;
	  },
	  //定义一个函数传入一个数组，删除对应下标的元素
	  removefromArray(array,index){
		  if(index==array.length-1){
			  array.pop();
		  }else{
			  for(let i=index;i<array.length;i++){
				  
				  array[i]=array[i+1];
			  }
			  array.pop();
		  }
	  },
	  deleteitem(){
		  this.dialogVisible=false;
		  this.removefromArray(this.message,this.deletemessageiteme);
		  
		  // 下面是操作数据库
		  let message={};
		  message.id=this.deletemessageid;
		  deletemessageById(JSON.stringify(message)).then(res=>{
			  this.$message({
				message: '恭喜你，删除成功',
			type: 'success'
			});
		  }).catch(error=>{
			  
		  })
	  }
    },
    data() {
      return {
        currentPage4: 1,
		pageSizes:[10, 20, 30, 100],
		pageSize:10,
		total:400,
		user:{},
		message:[],
		dialogVisible:false,
		deletemessageid:-1,
		deletemessageiteme:-1
      };
    },
	created(){
		this.user=this.$store.state.user;
		this.getmessage(this.currentPage4,this.pageSize,this.user.id);
	}
	}
</script>

<style lang="less">
	.messageadmin_content{
		.messageadmin_content_c{
			.messageadmin_content_page{
				margin: 50px;
			}
		}
	}
</style>
