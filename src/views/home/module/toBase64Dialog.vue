<template>
  <div class="dialog">
    <div class="content-wrap">
      <div class="img-pre"></div>
      <div class="img-base64"></div>
    </div>
    <div class="btn-wrapper">
      <div class="select-btn">选择文件</div>
      <div class="confirm-btn" @click="confirm">确定</div>
    </div>
    <div class="close-btn"></div>
    <!-- <input style="display: none;"/> -->
  </div>
</template>

<script>
export default {
  data() {

  },
  methods: {
    confirm() {

    }
  }
}
</script>

<style scoped>
@import url("../../../styles/toBase64Dialog.scss");
</style>