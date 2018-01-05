<template>
	<div class="products">
		<i-table :loading="loading" :columns="productsCol" :data="productsData"></i-table>
		<!-- 查看图片模态框 -->
		<i-modal v-model="imgModal" :title="imgData.name" style="text-align: center;">
			<img class="img" :src="item" v-for="(item, index) in imgData.imgs" :key="index">
			<span slot="footer">
				<i-button @click="imgModal = false" type="success">关闭</i-button>
			</span>
		</i-modal>
		<!-- 查看规格库存模态框 -->
		<i-modal v-model="styleModal" title="规格与库存" style="text-align: center;">
			<i-table :columns="styleCol" :data="styleData"></i-table>
			<span slot="footer">
				<i-button @click="styleModal = false" type="success">关闭</i-button>
			</span>
		</i-modal>
		<div class="center">
			<Page :total="totalPage" @on-change="initData"></Page>
		</div>
	</div>
</template>

<script>
import { getProducts, edit, remove, banner } from '@/api/products'
import { getTags } from '@/api/tags'
export default {
	data() {
		return {
			productsCol: [
				{
					title: '商品图片',
					width: 100,
					render: (h, params) => h('img', {
						attrs: {
							src: params.row.imgs[0]
						},
						on: {
							click: () => this.showImgs(params.row.name, params.row.imgs)
						},
						class: ['avatar']
					})
				},
				{
					title: '商品轮播图',
					width: 120,
					render: (h, params) => h('img', {
						attrs: {
							src: params.row.banner
						},
						on: {
							click: () => this.showImgs(params.row.name, params.row.banner)
						},
						class: ['avatar']
					})
				},
				{
					title: '启用轮播图',
					width: 120,
					render: (h, params) => h('Icon', {
						props: {
							type: params.row.showBanner ? 'checkmark-round' : 'close-round',
							color: params.row.showBanner ? '#19be6b' : '#ed3f14',
							size: 20
						},
						class: 'bannerSwitch',
						nativeOn: {
							click: () => {
								this.changeBanner(params.row._id, !params.row.showBanner);
							}
						}
					})
				},
				{
					title: '商品名称',
					render: (h, params) => h('Tooltip', {
						props: {
							placement: 'bottom',
							transfer: true
						}
					}, [
						h('span', {
							class: 'longText'
						}, params.row.name),
						h('div', {
							slot: 'content',
							style: 'white-space: normal;'
						}, params.row.name)
					])
				},
				{
					title: '商品简介',
					render: (h, params) => h('Tooltip', {
						props: {
							placement: 'bottom',
							transfer: true
						}
					}, [
						h('span', {
							class: 'longText'
						}, params.row.detail),
						h('div', {
							slot: 'content',
							style: 'white-space: normal;'
						}, params.row.detail)
					])
				},
				{
					title: '商品分类',
					width: 120,
					key: 'tags'
				},
				{
					title: '商品价格',
					width: 120,
					render: (h, params) => h('span', `￥${(params.row.price / 100).toFixed(2)}`)
				},
				{
					title: '操作',
					width: 130,
					render: (h, params) => h('div', [
						h('i-button', {
							props: {
								type: 'primary',
								size: 'small'
							},
							style: {
								marginRight: '5px'
							},
							on: {
								click: () => {
									this.$router.push(`/index/productEdit/${params.row._id}`)
								}
							}
						}, '编辑'),
						h('i-button', {
							props: {
								type: 'error',
								size: 'small'
							},
							on: {
								click: () => {
									this.remove(params.row._id);
								}
							}
						}, '删除')
					])
				}
			],
			productsData: [],
			imgModal: false,
			styleModal: false,
			imgData: {},
			styleCol: [
				{
					title: '规格',
					key: 'label'
				},
				{
					title: '库存',
					key: 'count'
				}
			],
			totalPage: 1,
			styleData: [],
			loading: false
		}
	},
	methods: {
		changeBanner(id, state) {
			banner(id, state).then(res => {
				this.$Message.success(res.msg);
				this.initData();
			}).catch(err => {
				this.$Message.error(err.msg);
			})
		},
		remove(id) {
			remove(id).then(res => {
				this.$Message.success(res.msg);
				this.initData();
			}).catch(err => {
				this.$Message.error(err.msg);
			})
		},
		showImgs(name, imgs) {
			if (typeof imgs === 'string') imgs = [imgs]
			this.imgData = {
				name,
				imgs
			}
			this.imgModal = true;
		},
		initData(page = 1) {
			this.loading = true;
			getTags().then(tags => {
				getProducts(page).then(res =>	{
					this.productsData = res.data.map(el => {
						tags.data.forEach(tagEl => {
							if (el.tags === tagEl._id) {
								el.tags = tagEl.name;
							}
						})
						return el;
					})
					this.totalPage = res.count;
					this.loading = false;
				})
			})
		}
	},
	created() {
		this.initData();
	}
}
</script>

<style lang="scss">
.products	{
	width: 100%;
	.avatar {
		width: 50px;
	}
	.longText {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
		width: 210px;
	}
	.center {
		position: fixed;
		padding: 10px;
		bottom: 0;
		width: 100%;
	}
	.bannerSwitch {
		cursor: pointer;
	}
}
.img {
	width: 100%;
	margin: 0 5px;
}
</style>
