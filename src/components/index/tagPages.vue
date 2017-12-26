<template>
	<div class="tags" ref="screenWidth">
		<div id="tagList" ref="tagsWidth" @wheel="wheelTags" :style="{ transform: `translateX(${translateX}px)` }">
			<i-tag 
			type="dot"
			v-for="(tag, index) in tags" 
			:key="tag.path" 
			:color="tagsActive === index ? 'blue' : 'default'" 
			closable 
			@click.native="linkTo(tag.path, index)"
			@on-close="closeTags(index)">
				{{tag.label}}
			</i-tag>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			screenWidth: 0, 							//* 屏幕显示宽度
			tagsWidth: 0,									//* 标签实际宽度
			translateX: 0								//* 偏移数量
		}
	},
	mounted() {
		this.screenWidth = this.$refs.screenWidth.offsetWidth;
		this.tagsWidth = this.$refs.tagsWidth.offsetWidth;
	},
	props: {
		tags: {
			type: Array,
			required: true
		},
		tagsActive: {
			type: Number,
			required: true
		}
	},
	methods: {
		//* 滚动标签
		wheelTags(e) {
			const { tagsWidth, screenWidth, translateX } = this.tagsData;
			if (tagsWidth - screenWidth > translateX) {
				if (
					(translateX === 0 && e.deltaY > 80) ||
          (tagsWidth - screenWidth < -translateX && e.deltaY < 80)
				) { return; }
				this.tagsData.translateX += e.deltaY > 80 ? 40 : -40;
			}
		},
		//* 关闭标签
		closeTags(i) {
			if (this.tags.length === 1) {
				return this.$Message.error('至少保留一个标签');
			}
			this.tags.splice(i, 1);
			this.$router.push(`/index/${this.tags[0].path}`);
			this.$emit('update:tagsActive', 0);
		},
		//* 跳转链接
		linkTo(path, i) {
			this.$emit('update:tagsActive', i);
			this.$emit('routeChange', 'user');
			this.$router.push(`/index/${path}`)
		}
	}
}
</script>

<style lang="scss">
.tags {
	padding-left: 10px;
	width: calc(100% - 190px);
	overflow: hidden;
	& > div {
		float: left;
		white-space: nowrap;
		transform: translateX(0);
		transition: transform 0.2s ease-out;
	}
}
</style>

