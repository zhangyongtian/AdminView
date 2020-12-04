<template>
	<div style="margin-top: 5px;">
		<el-card class="box-card">
			<div class="message_item">
				<div class="message">
					<span>{{message.message}}</span>
				</div>
				<div class="message_create">
					{{message.createtime}}
				</div>
				<div class="message_c">
					<el-button type="danger" icon="el-icon-delete" circle @click="deleteblog(message.id,index)"></el-button>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default{
		name:"messageitem",
		props: {
			message: {
				type: Object,
				default(){
					return{}
				}
			},
			index:{
				type:Number,
				default:-1
			}
		},
		methods: {
			deleteblog(messageid,index){
				this.$emit("deletemessageitem",messageid,index);
			}
		},
	}
</script>

<style lang="less">
	.message_item{
		display: flex;
		&>div{
			flex: 1;
		}
	}
</style>
