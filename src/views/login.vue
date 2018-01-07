<template>
	<div class="login" @keyup.enter="login">
		<i-card>
			<h2>欢迎登录</h2>
			<i-form ref="loginForm" :model="formData" :rules="rules">
				<i-form-item prop="name">
					<i-input v-model="formData.name">
						<Icon type="person" slot="prepend"></Icon>
					</i-input>
				</i-form-item>
				<i-form-item prop="pw">
					<i-input type="password" v-model="formData.pw">
						<Icon type="locked" slot="prepend"></Icon>
					</i-input>
				</i-form-item>
				<i-form-item style="text-align:right;">
					<i-button type="primary" long @click="login" :loading="loading" v-text="!isSignup ? '登录' : '注册'"></i-button>
					<i-button type="text" size="small" @click="signup" v-text="!isSignup ? '注册一个？' : '返回登录'"></i-button>
				</i-form-item>
			</i-form>
		</i-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			isSignup: false,
			formData: {
				name: '',
				pw: ''
			},
			rules: {
				user: [
					{
						required: true,
						message: 'Please fill in the user name',
						trigger: 'blur'
					}
				],
				pw: [
					{
						required: true,
						message: 'Please fill in the password.',
						trigger: 'blur'
					},
					{
						type: 'string',
						min: 5,
						message: 'The password length cannot be less than 5 bits',
						trigger: 'blur'
					}
				]
			}
		};
	},
	methods: {
		//* 登录
		login() {
			//* 验证器
			this.$refs.loginForm.validate(valid => {
				if (valid) {
					//* 启动加载条
					this.$Loading.start();
					this.loading = true;
					//* 向仓库派发事件
					this.$store.dispatch('pression/login', { name: this.formData.name, pw: this.formData.pw, isSignup: this.isSignup }).then(res => {
						//* 登录/注册成功，打印信息、结束进度条并且跳转页面
						this.$Message.success(res);
						this.$Loading.finish();
						this.$router.push('/index');
					}).catch(err => {
						this.$Message.error(err);
						this.loading = false;
						this.$Loading.error();
					})
				} else {
					this.$Message.error('input is not valid!');
				}
			});
		},
		signup() {
			this.formData = {
				user: '',
				pw: ''
			}
			this.isSignup = !this.isSignup;
		}
	}
};
</script>

<style lang="scss">
$bgColor: #2d3a4b;
.login {
  width: 100%;
  height: 100%;
  background: $bgColor url("/admin/login_bg.jpg") 0 0/cover no-repeat;
  h2 {
    margin-bottom: 20px;
  }
  .ivu-card {
    position: fixed;
    right: 10%;
    width: 320px;
    top: 50%;
    transform: translateY(-70%);
		.ivu-card-body {
			padding-bottom: 0px;
		}
  }
  .ivu-form-item {
    margin-bottom: 20px;
  }
}
</style>