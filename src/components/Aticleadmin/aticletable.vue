<template>
  <div class="blog_content">
		<el-card class="box-card">
			<div class="blog_item_content">
				<div class="blog_item_content_img">
					<img :src="blog.headpic" alt="">
				</div>
				<div>
					{{blog.introduce}}
				</div>
				<div>
					赞数:<el-tag type="danger">{{blog.zangcount}}</el-tag>
				</div>
				<div>
					是否发布:<el-tag type="success">{{blog.isfabu|isfabu}}</el-tag>
				</div>
				
				<div>
					<template v-for="item in blog.blogclassfiys">
						<el-tag style="margin-left: 5px;" type="success">{{item.classfiyname}}</el-tag>
					</template>
				</div>
				<div>
					<template v-for="item in blog.blogtags">
						<el-tag style="margin-left: 5px;" type="success">{{item.tagname}}</el-tag>
					</template>
				</div>
				<div>
					<el-tag style="margin-left: 5px;" type="success">{{blog.createtime|dateFilter}}</el-tag>
				</div>
				<div style="margin-left: 10px;">
					<el-button type="primary" icon="el-icon-edit" circle @click="updateblog(blog.id)"></el-button>
						<el-button type="danger" icon="el-icon-delete" circle @click="deleteblog(blog.id,index)"></el-button>
				</div>
			</div>
		</el-card>
	  
  </div>
</template>

<script>
  export default {
    data() {
			return{}
    },
		components: {
		},
		props: {
			blog: {
				type: Object,
				default(){
					return{};
				}
			},
			index:{
				type:Number,
				default:-1
			}
		},
		methods: {
			deleteblog(blogId,index) {
				this.$emit("deleteBlogById",blogId,index);
			},
			updateblog(blogid){
				console.log("修改博客")
				console.log(blogid);
				this.$router.push({path:`/admin/blogedit/${blogid}`})
			}
		},
		filters: {
			isfabu: function(value) {
				return value?"是":"否";
			},
			dateFilter(item){
				let pointFlag=item.indexOf(".");
				return item.substring(0,pointFlag).replace("T","  ");
			}
		}
		
  }
</script>
<style lang="less">
	.blog_content{
		margin-top: 5px;
		.blog_item_content{
			display: flex;
			.blog_item_content_img{
				&>img{
					width: 100px;
					height: 50px;
					border-radius: 3px;
				}
			}
			&>div{
				flex: 1;
			}
		}
	}
</style>