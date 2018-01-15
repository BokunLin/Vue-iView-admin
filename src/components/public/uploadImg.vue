<template>
	<div class="uploadImg">
		<div :class="type === 'avatar' ? 'demo-upload-list' : 'demo-upload-list banner'" v-for="(item, index) in uploadList" :key="item.url">
			<Spin size="small" class="loadingIcon"></Spin>
			<img :src="item">
			<div class="demo-upload-list-cover">
					<Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
					<Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
			</div>
		</div>
		<Upload
				ref="upload"
				:show-upload-list="false"
				:on-success="handleSuccess"
				:format="['jpg','jpeg','png']"
				:max-size="2048"
				:on-format-error="handleFormatError"
				:on-exceeded-size="handleMaxSize"
				:before-upload="handleBeforeUpload"
				multiple
				type="drag"
				action="/admin/uploadImg"
				style="display: inline-block; width: 58px;">
				<div style="width: 58px;height:58px;line-height: 58px;">
						<Icon type="camera" size="20"></Icon>
				</div>
		</Upload>
		<Modal title="View Image" v-model="visible">
				<img :src="imgName" v-if="visible" style="width: 100%">
		</Modal>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showProgress: false,
			percentage: 0,
			imgName: '',
			visible: false,
			uploadList: []
		}
	},
	watch: {
		imgs: {
			deep: true,
			handler(val) {
				this.uploadList = val;
			}
		}
	},
	props: {
		imgs: {
			type: Array,
			required: true
		},
		maxSize: {
			type: Number,
			required: true
		},
		type: {
			type: String,
			required: false,
			default: 'avatar'
		}
	},
	methods: {
		handleView(name) {
			this.imgName = name;
			this.visible = true;
		},
		handleRemove(index) {
			this.uploadList.splice(index, 1);
			this.$emit('update:imgs', this.uploadList);
		},
		handleSuccess(res) {
			if (res.code === 5005) {
				this.$Message.error('请先登录');
				sessionStorage.clear();
				this.$router.push('/');
			}
			this.uploadList.push(res);
			this.$emit('update:imgs', this.uploadList);
		},
		handleFormatError(file) {
			this.$Notice.warning({
				title: '文件格式错误',
				desc: '只能上传 jpg 或者 png 图片！'
			});
		},
		handleMaxSize(file) {
			this.$Notice.warning({
				title: '超出大小限制',
				desc: '不能上传超过 2M 的图片'
			});
		},
		handleBeforeUpload() {
			const check = this.uploadList.length < this.maxSize;
			if (!check) {
				this.$Notice.warning({
					title: `最多上传${this.maxSize}张图片！`
				});
			}
			return check;
		}
	}
}
</script>

<style>
.loadingIcon {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: -1;
}
.demo-upload-list{
		display: inline-block;
		width: 60px;
		height: 60px;
		text-align: center;
		line-height: 60px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0,0,0,.2);
		margin-right: 4px;
}
.demo-upload-list img{
		width: 100%;
		height: 100%;
}
.demo-upload-list-cover{
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
		display: block;
}
.demo-upload-list-cover i{
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		margin: 0 2px;
}
.banner {
	width: 200px;
	height: 100px;
}
</style>