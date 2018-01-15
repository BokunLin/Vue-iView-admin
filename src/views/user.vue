<template>
	<div class="user">
		<Table :columns="columns1" :data="userData"></Table>
		<div class="center">
			<Page :total="total" @on-change="initData"></Page>
		</div>
	</div>
</template>

<script>
import { getUser, remove } from '@/api/user';
import { format } from '@/utils/moment'
export default {
	data() {
		return {
			columns1: [
				{
					title: 'Name',
					key: 'name'
				},
				{
					title: 'Nick',
					key: 'nick'
				},
				{
					title: 'createTime',
					render: (h, params) => h('span', format(params.row.createTime))
				},
				{
					title: 'contorl',
					render: (h, params) => h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						nativeOn: {
							click: () => {
								remove(params.row._id).then(res => {
									this.$Message.success(res.data.msg);
									this.initData();
								})
							}
						}
					}, '删除')
				}
			],
			userData: [],
			total: 1
		};
	},
	methods: {
		initData(page = 1) {
			getUser(page).then(res => {
				console.log('res', res)
				this.total = res.count;
				this.userData = res.data;
			})
		}
	},
	created() {
		this.initData();
	}
};
</script>

<style lang="scss">
.user {
  width: 100%;
}
</style>
