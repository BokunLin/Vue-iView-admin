<template>
	<div class="products">
		<Table :columns="columns1" :data="data1"></Table>
	</div>
</template>

<script>
    export default {
    	data() {
    		return {
    			columns1: [
    				{
    					title: '商品图片',
    					key: 'img'
    				},
    				{
    					title: '商品名称',
    					key: 'name'
    				},
    				{
    					title: '商品分类',
    					key: 'tags'
    				},
    				{
    					title: '商品价格',
    					key: 'price'
    				},
    				{
    					title: '商品库存',
    					key: 'count'
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
    									this.edit(params.index);
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
    									this.remove(params.index);
    								}
    							}
    						}, '删除')
    					])
				}
    			],
    			data1: [
    				{
    					name: 'John Brown',
    					tags: 18,
    					price: 'New York No. 1 Lake Park',
    					count: '2016-10-03'
    				}
    			]
    		}
    	}
    }
</script>

<style lang="scss">
.products	{
	width: 100%;
}
</style>
