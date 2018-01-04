<template>
	<div class="index">
		<i-row type="flex" class="index">
			<!-- 左边部分 -->
			<i-col :span="spanLeft" class="navBar">
				<i-menu theme="dark" :active-name="menuActiveName" width="auto" @on-select="jumpRoute">
					<!-- logo -->
					<div class="logo">
						<span>{{title}}</span>
					</div>
					<!-- 侧边栏路由 -->
					<i-menu-item v-if="!route.meta.hidden" v-for="(route, index) in routers" :name="route.path" :key="route.meta.path" :class="{ 'active' : !isOpen }">
						<Tooltip theme="" :content="route.meta.label" placement="right" :disabled="isOpen">
							<p :style="pWidth">
								<Icon :class="{'active' : !isOpen}" :type="route.meta.icon" :size="iconSize"></Icon>
								<span v-show="isOpen">{{route.meta.label}}</span>
							</p>
						</Tooltip>
					</i-menu-item>
				</i-menu>
			</i-col>
			<!-- 右边部分 -->
			<i-col :span="spanRight">
				<div class="nav">
					<!-- 侧边栏开关 -->
					<span class="openButton">
						<i-button type="text" @click.stop="isOpen = !isOpen">
							<Icon type="navicon" size="30" :class="{ 'active': !isOpen }"></Icon>
						</i-button>
					</span>
					<!-- 标签组 -->
					<tag-pages :tagsActive.sync="tagsActive" :tags="tags"></tag-pages>
					<!-- 头像 -->
					<span class="avatar">
						<i-dropdown placement="bottom">
							<a>
								{{username}}
								<Icon type="arrow-down-b"></Icon>
							</a>
							<i-dropdown-menu slot="list" size="large">
								<i-dropdown-item @click="loginOut">退出登录</i-dropdown-item>
							</i-dropdown-menu>
						</i-dropdown>
						<i-avatar size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
					</span>
				</div>
				<!-- 主要内容 -->
				<i-row type="flex">
					<i-col span="24">
						<div class="viewArea">
							<router-view></router-view>
						</div>
					</i-col>
				</i-row>
			</i-col>
		</i-row>
	</div>
</template>
<script>
import tagPages from '@/components/index/tagPages'
export default {
	data() {
		return {
			menuActiveName: 'user',			//* 当前导航名
			isOpen: true,										//* 是否展开侧边栏
			routers: [],										//* 侧边栏路由
			tagsActive: 0,									//* 当前标签页
			tags: [
				{
					path: 'user',
					label: '用户管理'
				}
			],												//* 标签数组
			username: sessionStorage.user		//* 用户名
		};
	},
	components: {
		tagPages
	},
	watch: {
		$route(route) {
			//* 同步标签
			this.tags.forEach((el, index) => {
				if (el.path === route.name) {
					this.tagsActive = index;
				}
			})
			//* 同步侧面栏
			this.menuActiveName = route.name;
		}
	},
	computed: {
		//* 左部侧边栏宽度
		spanLeft() {
			return this.isOpen ? 3 : 1;
		},
		//* 右部侧边栏宽度
		spanRight() {
			return 24 - this.spanLeft;
		},
		//* Logo名称
		title() {
			return this.isOpen ? 'Cap Mall' : 'C';
		},
		//* 图标大小
		iconSize() {
			return this.isOpen ? 16 : 25;
		},
		//* 侧边栏名称宽度
		pWidth() {
			if (this.isOpen) {
				return 'width: 100%';
			}
			return `width: ${this.iconSize}px`;
		}
	},
	methods: {
		//* 判断路径
		judgmentPath(path) {
			return this.$route.path.substr(7) === path ? 'blue' : 'default';
		},
		//* 退出登录
		loginOut() {
			alert(123);
		},
		//* 跳转路由
		jumpRoute(routeName) {
			try {
				this.tags.forEach(el => {
					if (el.path === routeName) {
						throw new Error();
					}
				})
				this.tags.push({
					label: this.routers.find(item => item.path === routeName).meta.label,
					path: routeName
				})
				throw new Error();
			} catch (tagsIndex) {
				this.$router.push(`/index/${routeName}`);
			}
		}
	},
	created() {
		this.routers = this.$router.options.routes[1].children;
	}
};
</script>

<style lang='scss'>
.index {
  height: 100%;
  width: 100%;
  .ivu-row-flex {
		.ivu-row-flex {
			height: calc(100% - 60px);
		}
    .ivu-col {
      transition: all 0.3s;
    }
    .navBar {
      height: 100%;
      .ivu-menu {
        height: 100%;
        .logo {
          overflow: hidden;
          span {
            display: block;
            color: #eee;
            font-size: 24px;
            width: 90%;
            height: 30px;
            text-align: center;
            overflow: hidden;
            line-height: 30px;
            border-radius: 3px;
            margin: 15px auto;
            background: #5b6270;
          }
        }
        .ivu-menu-item {
          height: 60px;
					line-height: 36px;
          white-space: nowrap;
          font-size: 16px;
          p {
            overflow: hidden;
          }
        }
        & > li.active {
          padding-left: 0;
          padding-right: 0;
          text-align: center;
        }
      }
    }
    .nav {
      border-bottom: 1px solid #eee;
      height: 60px;
      overflow: hidden;
      display: flex;
      position: relative;
      line-height: 60px;
      i {
        cursor: pointer;
        transform: rotate(0deg);
        transition: transform 0.3s;
      }
      i.active {
        transform: rotate(90deg);
      }
      .avatar {
        text-align: right;
        background-color: #fff;
        font-size: 16px;
        width: 130px;
        box-shadow: -5px 0 5px #eee;
        position: absolute;
        right: 0;
        padding-right: 10px;
				.ivu-dropdown {
					margin-right: 5px;
				}
      }
      .openButton {
        box-shadow: 5px 0 10px #eee;
        z-index: 10;
        width: 60px;
        text-align: center;
        background-color: #fff;
      }
    }
    .viewArea {
			height: 100%;
			min-width: 1100px;
			overflow: auto;
      padding: 10px 10px 20px;
    }
  }
}
</style>