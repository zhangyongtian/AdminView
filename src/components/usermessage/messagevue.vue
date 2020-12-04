<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>发布留言</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="发送的消息" prop="desc">
					<el-input type="textarea" v-model="ruleForm.desc" maxlength="200" placeholder="最多200个字符" style="height: 500px;"></el-input>
				</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
			</el-form>
		</el-card>
		
	</div>
</template>
<script>
	import {savemessage} from "@/util/requestnetwork/messagerequest"
  export default {
    data() {
      return {
        ruleForm: {
          desc: ''
        },
        rules: {
          desc: [
            { required: true, message: '请填写发送的消息', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let message={};
			let user=this.$store.state.user;
			message.userid=user.id;
			message.message=this.ruleForm.desc;
			savemessage(JSON.stringify(message)).then(res=>{
				console.log(res);
				this.$message({
				showClose: true,
				message: '恭喜你，发布留言成功',
				type: 'success'
				});
			}).catch(error=>{
				
			})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>