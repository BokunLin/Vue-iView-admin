<template>
	<div class="publishProducts">
		<Spin size="large" fix v-if="loading"></Spin>
		<i-form ref="products" :model="formData" :rules="rules">
			<i-form-item label="商品名称：" prop="name">
				<i-input placeholder="请输入商品名称" v-model="formData.name"></i-input>
			</i-form-item>
			<i-form-item label="商品分类：" prop="tags">
				<i-select placeholder="请选择商品分类" v-model="formData.tags">
					<i-option v-if="tags.length === 0" value="">暂无分类，请先去分类管理添加分类!</i-option>
					<i-option v-else v-for="tag in tags" :key="tag._id" :value="tag._id">{{tag.name}}</i-option>
				</i-select>
			</i-form-item>
			<i-form-item label="商品介绍：" prop="detail">
				<i-input placeholder="请输入商品介绍" v-model="formData.detail" type="textarea" :autosize="{minRows: 2,maxRows: 3}"></i-input>
			</i-form-item>
			<i-form-item label="商品价格：" prop="price">
				<i-input placeholder="请输入商品价格" number v-model="formData.price">
					<span slot="append">分</span>
				</i-input>
			</i-form-item>
			<i-form-item prop="style" class="style">
				<div v-for="(item, index) in formData.style" :key="index" class="smallInput">
					<span v-text="index === 0 ? ' 商品规格：' : ''" class="formLabel"></span>
					<i-input placeholder="例如： ONE SIZE" v-model="item.label"></i-input>&nbsp;
					<span v-text="index === 0 ? ' 商品库存：' : ''" class="formLabel"></span> <i-input placeholder="请输入商品库存" v-model="item.count"></i-input>
					<i-button @click.stop="addStyle" v-if="index === formData.style.length - 1 && index !== 4">添加规格</i-button>
					<i-button v-if="index !== 0" @click="deleteStyle(index)"> 删除</i-button>
				</div>
			</i-form-item>
			<i-form-item label="商品图片：" prop="imgs">
				<upload-img :imgs.sync="formData.imgs" type="avatar" :maxSize="6"></upload-img>
			</i-form-item>
			<i-form-item label="商品轮播图：" prop="banner">
				<upload-img :imgs.sync="formData.banner" type="banner" :maxSize="1"></upload-img>
			</i-form-item>
		</i-form>
		<i-button type="success" class="sub" @click.stop="subForm" :loading="loading">发布</i-button>
	</div>
</template>

<script>
import { publish, findOne, edit } from '@/api/products'
import uploadImg from '@/components/public/uploadImg'
export default {
	data() {
		return {
			loading: false,
			tags: [],
			formData: {
				name: '',
				tags: '',
				detail: '',
				style: [{
					label: '',
					count: ''
				}],
				price: '',
				imgs: [],
				banner: []
			},
			rules: {
				name: [
					{ required: true, message: '商品名称不能为空', trigger: 'blur' }
				],
				tags: [
					{ required: true, message: '商品分类不能为空', trigger: 'blur' }
				],
				detail: [
					{ required: true, message: '商品介绍不能为空', trigger: 'blur' }
				],
				price: [
					{ required: true, type: 'number', min: 1, message: '商品价格单位为分且只能为数字', trigger: 'blur' }
				],
				banner: [
					{ required: true, type: 'array', message: '商品轮播图不能为空', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		subForm() {
			this.$refs.products.validate(valid => {
				if (valid) {
					if (this.checkStyle()) {
						this.loading = true;
						//* 商品发布
						const pubProduct = (fn, ...rest) => fn(...rest).then(res => {
							this.$Message.success(res.msg);
							this.$router.push('/index/products');
						}).catch(err => {
							this.loading = false;
							this.$Message.error(err.msg);
						})
						this.formData.banner = this.formData.banner[0];
						if (this.$route.params.id) {
							pubProduct(edit, this.formData);
						} else {
							pubProduct(publish, this.formData);
						}
					}
				} else {
					this.$Message.error('请完善所有信息!');
				}
			})
		},
		checkStyle() {
			for (let i = 0; i < this.formData.style.length; i++) {
				if (this.formData.style[i].label === '' || this.formData.style[i].count === '') {
					this.$Message.error('请完善规格信息！');
					return false;
				}
			}
			if (this.formData.imgs.length < 1) {
				this.$Message.error('请至少上传一张图片！');
				return false;
			}
			return true;
		},
		addStyle() {
			if (this.formData.style.length === 6) {
				return this.$Message.error('最多只能添加6种规格')
			}
			this.formData.style.push({
				label: '',
				count: ''
			})
		},
		deleteStyle(i) {
			this.formData.style.splice(i, 1);
		},
		loadTags() {
			this.$store.dispatch('tags/getTags').then(() => {
				this.tags = this.$store.getters['tags/getTags'];
			});
		}
	},
	created() {
		if (this.$route.params.id) {
			this.loading = true;
			findOne(this.$route.params.id).then(res => {
				this.formData = res.data;
				this.formData.banner = [this.formData.banner];
				this.loading = false;
			}).catch(err => {
				this.$Message.error(err.msg);
				this.loading = false;
			})
		}
		this.loadTags();
	},
	components: {
		uploadImg
	}
}
</script>

<style lang="scss">
.publishProducts {
	width: 800px;
	margin: 20px auto 0;
}
.inline {
	display: inline-block;
	width: 100%;
}
.smallInput{
	margin-bottom: 10px;
	&:last-child {
		margin: 0;
	}
	.ivu-input-wrapper {
		width: auto;
	}
}
.formLabel {
	display: inline-block;
	width: 80px;
}
.w50 {
	width: 45%;
}
.sub {
	text-align: center;
}
</style>
