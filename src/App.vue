<template>
	<div id="app">
		<div class="header">
			<div class="logo">
				<img src="@/assets/ui-logo.png" />
				CSS-LOWCODE
			</div>
			<div class="header-mine-wrapper">
				<div class="my-avator"><img src="@/assets/default-avator.png" /></div>
				<div class="my-text" @click="goMyCenter">个人中心</div>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'App',
	components: {},
	methods: {
		goMyCenter() {
			this.$router.push('/mine');
		}
	}
};
</script>

<style lang="scss">
@import '@/styles/app.scss';
@import '@/styles/animate.scss';
@import '@/styles/element-ui.scss';
</style>
