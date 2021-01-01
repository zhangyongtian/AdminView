<template>
  <div class="user-content">
	  <el-card class="box-card">
	    <div slot="header" class="clearfix">
	      <el-breadcrumb separator-class="el-icon-arrow-right">
	        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
	        <el-breadcrumb-item>评论管理</el-breadcrumb-item>
	      </el-breadcrumb>
	    </div>
	    <!-- //下面是显示的评论内容 -->
			<el-tabs type="border-card" @tab-click="handleClick">
					<el-tab-pane label="父评论管理">
						<div v-for="(item,index) in parentcomments" style="margin-top: 5px;">
								<comment :comment="item" :commentItem="index" @deleteCommentByItem="deleteCommentByItem"></comment>
							</div>
							<!-- 下面是分页 -->
							<el-pagination
						  @size-change="handleSizeChange"
						  @current-change="handleCurrentChange"
						  :current-page="currentPage4"
						  :page-sizes="pagesizes"
						  :page-size="pagesize"
						  layout="total, sizes, prev, pager, next, jumper"
						  :total="totalsize">
						</el-pagination>
					</el-tab-pane>
					<el-tab-pane label="子评论管理">
						
							<div v-for="(item,index) in soncomments.content" style="margin-top: 5px;">
									<comment :comment="item" :commentItem="index" @deleteCommentByItem="deleteCommentByItem"></comment>
								</div>
								<!-- 下面是分页 -->
								<el-pagination
							  @size-change="sonhandleSizeChange"
							  @current-change="sonhandleCurrentChange"
							  :current-page="soncomments.pageNum"
							  :page-sizes="pagesizes"
							  :page-size="soncomments.pageSize"
							  layout="total, sizes, prev, pager, next, jumper"
							  :total="soncomments.totalSize">
							</el-pagination>
						
					</el-tab-pane>
			</el-tabs>
			<!-- 下面定义一个模态框确认是否删除 -->
			<el-dialog
			title="提示"
			:visible.sync="dialogVisible"
			width="30%"
			>
			<span>删除一条父评论会删除这个评论下面的所有的子评论确认删除吗?</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="deletecomment">确 定</el-button>
			</span>
		</el-dialog>
		
		<!-- 下面是一个子模态 -->
			<el-dialog
			title="提示"
			:visible.sync="sondialogVisible"
			width="30%"
			>
			<span>确定要删除这个评论吗?</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="sondialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="sondeletecomment">确 定</el-button>
			</span>
		</el-dialog>
	  </el-card>
  </div>
</template>

<script>
	import {parenetpagecomment} from "@/util/requestnetwork/parenetpagecomment"
	import {deleteparentcomment} from "@/util/requestnetwork/parenetpagecomment"
	import { Loading } from 'element-ui';
	
	import {soncommentRequest} from "@/util/requestnetwork/soncommentRequest"
	import {deletesoncomment} from "@/util/requestnetwork/soncommentRequest"
	
	import comment from "@/components/CommentAdmin/comment"
  export default {
	 name:"useradmin",
	 components: {
	 	comment
	 },
	 methods: {
		 // 下面的两个方法就说分别的获取他们的页数还有每一页的大小
      handleSizeChange(val) {
				this.pagesize=val;
				let user=window.localStorage.getItem("remebermeadmin")||{};
				this.getComments(this.currentPage4,this.pagesize,user);
      },
      handleCurrentChange(val) {
				this.currentPage4=val;
				let user=window.localStorage.getItem("remebermeadmin")||{};
				this.getComments(this.currentPage4,this.pagesize,user);
      },
			sonhandleSizeChange(val) {
				this.soncomments.pageSize=val;
				let user=window.localStorage.getItem("remebermeadmin")||{};
				this.getsonComments(this.soncomments.pageNum,this.soncomments.pageSize,user)
			},
			sonhandleCurrentChange(val) {
				this.soncomments.pageNum=val;
				let user=window.localStorage.getItem("remebermeadmin")||{};
				this.getsonComments(this.soncomments.pageNum,this.soncomments.pageSize,user)
			},
			getComments(pageNum,pageSize,user){
				let loadingInstance = Loading.service();
				let pagerequest={};
				pagerequest.pageNum=pageNum;
				pagerequest.pageSize=pageSize;
				pagerequest.userid=JSON.parse(user).id;
				parenetpagecomment(JSON.stringify(pagerequest)).then(res=>{
					let data=res.data.data;
					this.currentPage4=data.pageNum;
					this.pagesize=data.pageSize;
					this.totalsize=data.totalSize;
					this.parentcomments=data.content;
					loadingInstance.close();
				}).catch(error=>{

				})
			},
			getsonComments(pageNum,pageSize,user){
				let pagerequest={};
				pagerequest.pageNum=pageNum;
				pagerequest.pageSize=pageSize;
				pagerequest.userid=JSON.parse(user).id;
				soncommentRequest(JSON.stringify(pagerequest)).then(res=>{
					this.soncomments=res.data.data;
				}).catch(error=>{
					
				})
			},
			deleteCommentByItem(commentitem,commentId){
				// 点击的时候获取到删除的item还有id,先保存起来,然后用模态点击确认的时候然后在调用删除函数
				if(this.tabnum==0){
					this.commentitem=commentitem;
					this.commentId=commentId;
					this.dialogVisible=true;
				}else{
					this.soncommentitem=commentitem;
					this.soncommentId=commentId;
					this.sondialogVisible=true;
				}
			},
			// 定义一个方法,传入一个数组,还有一个下标删除数组对应下标的元素
			removeItemByIndex(array,index){
				// 如果删除的是最后一个就直接
				if(index==array.length-1){
					array.pop();
				}else{
					for(let i=index;i<array.length;i++){
						array[i]=array[i+1];
					}
					array.pop();
				}
			},
			deletecomment(){
				this.dialogVisible=false;
				this.removeItemByIndex(this.parentcomments,this.commentitem);
				let parentComent={};
				parentComent.id=this.commentId;
				deleteparentcomment(JSON.stringify(parentComent)).then(res=>{
					this.$message({
					   type: 'success',
					   message: '删除成功!'
					 });
				}).catch(error=>{
					console.log("删除成功")
				})
				 
			},
			handleClick(tab, event) {
				if(tab.paneName==0){
					// 这里保留出来
					//console.log("这里是父评论的内容")
					this.tabnum=tab.paneName;
				}else if(tab.paneName==1){
					this.tabnum=tab.paneName;
					
				}
      },
			sondeletecomment(){
				this.sondialogVisible=false;
				this.removeItemByIndex(this.soncomments.content,this.soncommentitem);
				let parentComent={};
				parentComent.id=this.soncommentId;
				deletesoncomment(JSON.stringify(parentComent)).then(res=>{
					this.$message({
					   type: 'success',
					   message: '删除成功!'
					 });
				}).catch(error=>{
					console.log("删除成功")
				})
			}
    },
    data() {
      return {
        currentPage4: 1,
				pagesize:10,
				pagesizes:[10, 20, 30, 100],
				totalsize:400,
				parentcomments:[],
				dialogVisible: false,
				commentitem:-1,
				commentId:-1,
				soncomments:{},
				tabnum:0,
				sondialogVisible:false,
				soncommentitem:-1,
				soncommentId:-1
				
				// 下面是子评论的内容
      };
    },
		created(){
			// 开始的时候发送请求获取当前初始化的评论
			let user=window.localStorage.getItem("remebermeadmin")||{};
			this.getComments(this.currentPage4,this.pagesize,user);
			//下面是获取子评论的信息
			this.getsonComments(this.currentPage4,this.pagesize,user);
		},
		filters:{
			dateFilter(item){
				let pointFlag=item.indexOf(".");
				return item.substring(0,pointFlag).replace("T","  ");
			}
		}
  }
</script>
<style lang="less">
	.user-content{
		text-align: left;
	}
</style>
