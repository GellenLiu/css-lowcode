<template>
	<div class="menu">
		<div class="menutree">
			<div class>
				<label v-for="menu in data" :key="menu.index">
					<el-submenu :index="String(menu.path)" v-if="menu.children != ''" unique-opened="true">
						<template slot="title">
							<span>{{ menu.name }}</span>
						</template>
						<label>
							<menutree :data="menu.children"></menutree>
						</label>
					</el-submenu>
					<el-menu-item :index="String(menu.path)" v-else>
						<span></span>
						<span slot="title">{{ menu.name }}</span>
					</el-menu-item>
				</label>
			</div>
		</div>
	</div>
</template>

<script>
import menutree from './menuTree';
export default {
    name: 'menutree',
	data() {
		return {
			menu_data: {},
			name: 'one'
		};
	},
	components: {
		menutree: menutree
	},
	props: ['data'],
	mounted() {
		// console.log(this.$route);
	},
	methods: {
	}
};
</script>

<style scoped>
.menu {
	width: 240px;
}
.el-menu {
	width: 100%;
}
.menutree {
	width: 100%;
}
.el-menu-vertical-demo {
	width: 100%;
}
.el-submenu {
	width: 100%;
}
</style>
