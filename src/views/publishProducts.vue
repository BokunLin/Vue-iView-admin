<template>
	<div class="publishProducts">
		<i-form :model="formData" :label-width="80" :rules="rules">
			<i-form-item label="商品名称" prop="name">
				<i-input placeholder="请输入商品名称" v-model="formData.name"></i-input>
			</i-form-item>
			<i-form-item label="商品分类" prop="tags">
				<i-select placeholder="请选择商品分类" v-model="formData.tags">
					<i-option v-if="tags.length === 0" value="">暂无分类，请先去分类管理添加分类!</i-option>
					<i-option v-else v-for="tag in tags" :key="tag.value" :value="tag.value">{{tag.label}}</i-option>
				</i-select>
			</i-form-item>
			<i-form-item label="商品价格" prop="price">
				<i-input placeholder="请输入商品价格" v-model.number="formData.price">
					<span slot="append">分</span>
				</i-input>
			</i-form-item>
			<i-form-item label="商品介绍" prop="intro">
				<i-input placeholder="请输入商品介绍" v-model="formData.intro" type="textarea" :autosize="{minRows: 1,maxRows: 3}"></i-input>
			</i-form-item>
			<i-form-item label="商品库存" prop="count">
				<i-input placeholder="请输入商品库存" v-model.number="formData.count">
					<span slot="append">件</span>
				</i-input>
			</i-form-item>
			<i-form-item label="商品图片" prop="imgs">
				<upload-img></upload-img>
			</i-form-item>
		</i-form>
	</div>
</template>

<script>
import uploadImg from '@/components/public/uploadImg'
export default {
	data() {
		return {
			tags: [],
			formData: {
				name: '',
				tags: ''
			},
			rules: {
			}
		}
	},
	components: {
		uploadImg
	}
}
</script>