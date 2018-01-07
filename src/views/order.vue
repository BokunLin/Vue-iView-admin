<template>
	<div class="order">
		<Spin fix v-if="loading"></Spin>
		<Table :columns="columns" :data="formData"></Table>
		<Modal v-model="snapVisible" width="70">
			<Table :columns="snapColumns" :data="snapData"></Table>
		</Modal>
		<Modal v-model="addressVisible" width="70">
			<Table :columns="addressColumns" :data="addressData"></Table>
		</Modal>
		<div class="center">
			<Page :total="total" @on-change="initData"></Page>
		</div>
	</div>
</template>

<script>
import { getOrder, getAddress, getSnapShoot, remove } from '@/api/order';
import { findUser, getUser } from '@/api/user';

import async from 'async';
export default {
	data() {
		return {
			columns: [
				{
					title: '用户名',
					key: 'user'
				},
				{
					title: '收货地址',
					render: (h, params) =>
						h(
							'Button',
							{
								props: {
									type: 'primary',
									size: 'small'
								},
								nativeOn: {
									click: () => {
										getAddress(params.row.address).then(res => {
											this.addressData = [res.data.address];
											this.addressVisible = true;
										});
									}
								}
							},
							'查看'
						)
				},
				{
					title: '状态',
					render: (h, params) =>
						h('span', params.row.state === 0 ? '已发货' : '已完成')
				},
				{
					title: '商品快照',
					render: (h, params) =>
						h(
							'Button',
							{
								props: {
									type: 'primary',
									size: 'small'
								},
								nativeOn: {
									click: () => {
										getSnapShoot(params.row.snapShoot).then(res => {
											this.snapData = res.data.data;
											this.snapVisible = true;
										});
									}
								}
							},
							'查看'
						)
				},
				{
					title: '操作',
					render: (h, params) =>
						h(
							'Button',
							{
								props: {
									type: 'error',
									size: 'small'
								},
								nativeOn: {
									click: () => {
										this.removeOrder(params.row._id);
									}
								}
							},
							'删除'
						)
				}
			],
			snapColumns: [
				{
					title: '商品图片',
					render: (h, params) => h('img', {
						attrs: {
							src: params.row.img
						},
						style: 'width: 50px;'
					})
				},
				{
					title: '商品名称',
					key: 'name'
				},
				{
					title: '商品单价',
					render: (h, params) => h('span', '￥' + (params.row.price / 100).toFixed(2))
				},
				{
					title: '商品数量',
					key: 'count'
				},
				{
					title: '商品总价',
					render: (h, params) => h('span', '￥' + (params.row.price * params.row.count / 100).toFixed(2))
				}
			],
			addressColumns: [
				{
					title: '收货人',
					key: 'name'
				},
				{
					title: '联系方式',
					key: 'phone'
				},
				{
					title: '区域',
					render: (h, params) => h('span', params.row.address[0])
				},
				{
					title: '详细地址',
					key: 'detail'
				}
			],
			total: 0,
			loading: false,
			formData: [],
			snapVisible: false,
			snapData: [],
			addressVisible: false,
			addressData: []
		};
	},
	methods: {
		removeOrder(id) {
			remove(id).then(res => {
				this.$Message.success(res.data.msg);
				this.initData();
			})
		},
		initData(page = 1) {
			this.loading = true;
			getOrder(page).then(res => {
				this.total = res.data.count;
				this.formData = res.data.data;
				Promise.all(this.formData.map(item => findUser(item.user).then(user => {
					item.user = user.data.data ? user.data.data.name : '不存在';
				}))).then(() => {
					this.loading = false
				});
			});
		}
	},
	created() {
		this.initData();
	}
};
</script>

<style lang="scss">
.ivu-col {
  margin-bottom: 0px;
  border-top: 1px solid #ddd;
}
.textCenter {
  text-align: center;
}
.title {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  background-color: #f5f5f5;
  .ivu-col {
    height: 40px;
    line-height: 40px;
  }
}
.noMt {
  margin: 0;
}
.borderL {
  border-left: 1px solid #ddd;
}
.borderR {
  border-right: 1px solid #ddd;
}
.center {
	background-color: #fff;
	position: fixed;
	padding: 10px;
	bottom: 0;
	width: 100%;
}
</style>
