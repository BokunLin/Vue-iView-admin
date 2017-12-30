<template>
	<div class="classify">
		<header>
			<i-button type="success" @click.stop="showModal = true">添加分类</i-button>
		</header>
		<Table :columns="columns1" :data="tagList"></Table>
		<Modal
			v-model="showModal"
			title="分类信息"
			@on-ok="subTags"
			@on-cancel="cancelModal"
			@on-visible-change="cancelModal">
			<i-input @on-enter="subTags" v-model="formData.name">
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
					key: 'createTime'
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
									this.remove(params.row._id);
								}
							}
						}, '删除')
					])
				}
			],
			tagList: []
		}
	},
	methods: {
		cancelModal(e) {
			if (!e) {
				this.showModal = false;
				this.formData.name = '';
			}
		},
		subTags() {
			let url = 'tags/add';
			if (this.formData._id) {
				url = 'tags/edit';
			}
			this.$store.dispatch(url, this.formData).then(res => {
				this.$Message.success(res.msg);
				this.formData.name = '';
				this.initData();
			}).catch(err => {
				this.$Message.error(err);
				this.formData.name = '';
			})
			this.showModal = false;
		},
		edit(obj) {
			this.formData = JSON.parse(JSON.stringify(obj));
			this.showModal = true;
		},
		remove(a) {
			this.$store.dispatch('tags/remove', a).then(res => {
				this.$Message.success(res.msg);
				this.initData();
			})
		},
		initData() {
			this.$store.dispatch('tags/getTags').then(() => {
				this.tagList = this.$store.getters['tags/getTags'];
			});
		}
	},
	created() {
		this.initData();
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
