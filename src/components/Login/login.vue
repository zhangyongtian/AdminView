<template>
	<div class="login_main">
		<div style="display: flex;flex-direction: column;margin-top: 100px;">
			<div class="login_logo">
				<img src="@/assets/Homeimgs/homearg.jpg" alt="">
				<!-- 这里就是想图片上传的时候使用的+好 -->
<!-- 				<span><a href="" style="text-decoration: none;">+</a></span> -->
			</div>
			<div class="login_title">
				<h1>登录后台管理</h1>
			</div>
			<div class="login_form">
				<el-card class="box-card">
					<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign"
					:rules="rules" ref="ruleForm">
						<el-form-item label="input you username or email" prop="username" style="text-align: left;">
							<el-input v-model="formLabelAlign.username" placeholder="输入你的用户名或者邮箱"></el-input>
						</el-form-item>
						<el-form-item  prop="password" label="input you passworld" style="position: relative; text-align: left;">
							<!-- <span style="position: absolute;top: -50px;z-index: 9;right: 0px;"><a href="" style="text-decoration: none;" v-on:click.prevent="forgetpassword">忘记密码？</a></span>
						 -->	<el-input v-model="formLabelAlign.password" placeholder="输入你的密码" show-password></el-input>
						</el-form-item>
						<el-button type="success" style="width: 100%;" @click="submitForm('ruleForm')" :loading="loginload">sign in</el-button>
					</el-form>
				</el-card>
			</div>
			<div class="login_to_signout">
				<el-card shadow="never">
					WELCOME TO REMEMBERME
					<span style="color: cornflowerblue">
						<a href="" style="text-decoration: none;" v-on:click.prevent="gotoregister">联系站长？</a>
					</span>
				</el-card>
			</div>
		</div>
	</div>
</template>

<script>
	import {loginrequest} from '@/util/requestnetwork/loginrequest'
	export default{
		name:"login",
		data(){
			return{
				labelPosition: 'top',
				formLabelAlign: {
				username:"",
				password:""
				},
				rules:{
					username:[
						{ required: true, message: '请输入您的用户名', trigger: 'blur' },
						{ min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }	
					],
					password:[
						{ required: true, message: '请输入您的密码', trigger: 'blur' },
						{ min: 1, max: 30, message: '请输入正确的长度（限制不能超过30个字符）', trigger: 'blur' }
					]
				},
				loginload:false
			}
		},
		methods:{
			gotoregister(){
				this.$router.push("/loginandsign/register")
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
				if (valid) {
					let user={};
					user.username=this.formLabelAlign.username;
					user.userpassword=this.formLabelAlign.password;
					this.loginload=true;
					let siginType=1;
					if(this.formLabelAlign.username.length>10){
						siginType=2;
					}
					user.siginType=siginType;
					loginrequest(JSON.stringify(user))
					.then(res=>{
						console.log(res)
						 this.$message({
						    message: '登录成功',
						    type: 'success'
						});
						let loginuser=res.data.data.useryonghu;
						let token=res.data.data.token;
						//登录成功以后吧信息保存到本地
						window.localStorage.setItem("remebermeadmin",JSON.stringify(loginuser));
						window.localStorage.setItem("remembermetoken",token);
						this.$store.dispatch("saveUser",loginuser)
						this.loginload=false;
						this.$router.push("/admin")
					})
					.catch(error=>{
						this.loginload=false;
					})
				} else {
					console.log('error submit!!');
				return false;
				}
			});
			},
			forgetpassword(){
				console.log("忘记密码");
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.login_main{
		text-decoration: none;
		.login_logo{
			position:relative;
			&>img{
				width: 50px;
				height: 50px;
				border-radius: 50%;
			}
			&>span{
				width: 20px;
				height: 20px;
				background-color: lightgray;
				border-radius: 50%;
				display: block;
				position: absolute;
				right: 52%;
				top: 0px;
				text-align: center;
				line-height: 20px;
			}
		}
		display: flex;
		align-items: center;
		justify-content: center;
		.login_form{
			
			
		}
		.login_to_signout{
			margin-top: 20px;
		}
	}
</style>
