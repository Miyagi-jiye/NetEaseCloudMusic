<template>
  <div class="back" v-draggable>
    <div class="back-inner" @click.prevent="$router.back()">
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="less">
// 返回按钮
.back {
  position: fixed;
  top: 40vh;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  z-index: 555;

  // 选中时放大0.1倍
  &:active,
  &:focus,
  &:hover {
    transform: scale(1.1);

    .back-inner {
      background: rgba(0, 0, 0, 0.5);
    }
  }

  .back-inner {
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(0, 0, 0, .1);
    z-index: 1111;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    touch-action: none;
    margin: auto;
    transition: all .3s;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      z-index: 3;
      background: #fff;
      border-radius: 50%;
      transform: scale(.65);
      box-shadow: 0 0 10px rgb(0 0 0 / 20%);
      transition: all .2s ease-in-out
    }
  }
}
</style>