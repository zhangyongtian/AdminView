<template>
	<div class="commentitem" style="margin-top: 10px;">
		<el-card class="box-card">
			<div class="commentitem_c">
				<div class="commentitem_content">
					{{comment.comment}}
				</div>
				<div class="commentitem_oprate">
					<el-button type="danger" icon="el-icon-delete" circle v-on:click="deletecommentitem(comment.id,index)"></el-button>
				</div>
			</div>
			
		</el-card>
		
	</div>
</template>

<script>
	export default{
		name:"commentitem",
		methods:{
			deletecommentitem(commentid,index){
				this.$emit("deletecommentitem",commentid,index)
			}
		},
		props:{
			comment:{
				type:Object,
				default(){
					return{}
				}
			},
			index:{
				type:Number,
				default:-1
			}
		}
	}
</script>

<style lang="less">
	.commentitem_c{
		display: flex;
		.commentitem_content{
			flex: 1;
			text-align: left;
		}
		.commentitem_oprate{
			flex: 1;
		}
	}
</style>
