<template>
	<div class="classify">
		<header>
			<i-button type="success">添加分类</i-button>
		</header>
		<Table :columns="columns1" :data="tagList"></Table>
		<Modal
			v-model="showModal"
			title="分类信息"
			@on-ok="subTags"
			@on-cancel="cancelModal">
			<i-input v-model="formData.name">
				<span slot="prepend">分类名称 </span>
			</i-input>
			</i-form>
    </Modal>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showModal: false,
			formData: {
				name: ''
			},
			columns1: [
				{
					title: 'Name',
					key: 'name'
				},
				{
					title: 'Create Time',
					key: 'date'
				},
				{
					title: '操作',
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
									this.edit(params.row);
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
									this.remove(params.row.id);
								}
							}
						}, '删除')
					])
				}
			],
			tagList: [
				{
					_id: 1,
					name: 'John Brown',
					age: 18,
					address: 'New York No. 1 Lake Park',
					date: '2016-10-03'
				}
			]
		}
	},
	methods: {
		cancelModal() {
			this.showModal = false;
		},
		subTags() {
		},
		edit(ojb) {
			this.showModal = true;
		},
		remove(a) {
			this.$store.dispatch('tags/remove', a).then(res => {
				this.$Message.success(res);
			})
		}
	}
}
</script>

<style lang="scss">
.classify	{
	width: 100%;
	header {
		margin: 0 0 10px;
	}
}
</style>
