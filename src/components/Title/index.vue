<template>
  <div class="Title">
    <div class="left" @click="routerPush(to, query)">
      <slot name="left">
        <span>{{ title }}</span>
        <van-icon name="arrow" size="1rem" />
      </slot>
    </div>
    <div class="right">
      <slot name="right">
        <van-icon name="ellipsis" size="1rem" />
      </slot>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    default: '默认标题',
  },
  to: {
    type: String,
    default: '/',
  },
  query: {
    type: Object,
    default: {},
  },
})

const router = useRouter()

const routerPush = (path, query) => {
  router.push({ path, query })
  console.log(path, query)
}
</script>

<style scoped lang="less">
.Title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 8px 16px;
  color: var(--font-color-5);

  .left {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>