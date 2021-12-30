<template>
  <div id="app">
    <div class="header">
      <div class="my-avator"><img src="@/assets/default-avator.png"/></div>
      <div class="my-text">个人中心</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss">
 @import '@/styles/app.scss';
 @import '@/styles/animate.scss';
 @import '@/styles/element-ui.scss';
</style>