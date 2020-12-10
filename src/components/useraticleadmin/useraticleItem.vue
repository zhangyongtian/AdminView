<template>
	<div class="useraticleItem" style="margin-top: 10px;">
		<el-card class="box-card">
			<div class="useraticleItem_c">
				<!-- //这里是显示用户的部分 -->
				<div class="useraticlecontent">
					<img :src="aticle.useryonghu.userimage" alt="">
					<span>{{aticle.useryonghu.username}}</span>
				</div>
				<!-- 下面第显示文章的部分 -->
				<div class="aticlecontent">
					<img :src="aticle.headpic" alt="">
					<span>{{aticle.introduce}}</span>
				</div>
				<!-- 这里是文章的时间 -->
				<div class="aticletime">
					<span>{{aticle.createtime|fileterTime}}</span>
				</div>
				<!-- 下面是显示操作的部分 -->
				<div>
					<el-button type="danger" icon="el-icon-delete" circle @click="deleteBlogById(aticle.id,index)"></el-button>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default{
		name:"useraticleItem",
		props:{
			aticle:{
				type:Object,
				default(){
					return{}
				}
			},
			index:{
				type:Number,
				default:-1
			}
		},
		methods:{
			deleteBlogById(blogid,index){
				this.$emit("deleteBlogById",blogid,index);
			}
		},
	filters:{
		// 下面是处理时间格式的fileter
		fileterTime(targettime){
			let dian=targettime.indexOf(".");
			return targettime.substr(0,dian).replace("T","-");
		}
		
	}
	}
</script>

<style lang="less">
	.useraticleItem_c{
		display: flex;
		.useraticlecontent{
		flex: 1;
		display: flex;
		justify-content: start;
		align-items: center;
			&>img{
				width: 50px;
				height: 50px;
				border-radius: 50%;
			}
		}
		.aticletime{
			flex: 1;
			display: flex;
			justify-content: start;
			align-items: center;
		}
		.aticlecontent{
			flex: 1;
			display: flex;
			justify-content: start;
			align-items: center;
			&>img{
				width: 50px;
				height: 50px;
				border-radius: 50%;
			}
		}
	}
</style>
