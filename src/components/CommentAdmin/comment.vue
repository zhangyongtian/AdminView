<template>
	<div class="comment_content">
		<el-card class="box-card">
			<div class="comment-content">
				<!-- 我是显示的部分 -->
				<div class="comment-content_t">
					<span>{{comment.comment}}</span>
					<span>{{comment.createtime}}</span>
				</div>
				<!-- 这里是操作的部分 -->
				<div class="comment-content_b">
					<el-button type="danger" icon="el-icon-delete" circle @click="deleteCommentById(comment.id)"></el-button>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default{
		name:"comment",
		props: {
			comment:{
				type:Object,
				default(){
					return {}
				}
			},
			commentItem:{
				type:Number,
				default:-1
			}
		},
		methods: {
			// 这里的计划就是点击删除的时候把父组件的数组删除当前下标的数据,然后在删除数据库里面对应的数据
			deleteCommentById(commentId) {
				this.$emit("deleteCommentByItem",this.commentItem,commentId);	
			}
		},
		created(){
			
		}
	}
</script>

<style lang="less">
	.comment_content{
		.comment-content{
			display: flex;
			.comment-content_t{
				flex: 9;
				display: flex;
				&>span{
					flex: 1;
					text-align: left;
				}
			}
			.comment-content_b{
				display: flex;
				justify-content: center;
				align-items: center;
				
			}
		}
	}
</style>
