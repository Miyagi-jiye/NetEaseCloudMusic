<template>
  <div class="description">
    {{ desc }}
    <van-icon name="arrow" />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  desc: {
    type: String,
    default: ''
  },
  end: {
    type: Number,
    default: 20
  },
})

// 截取字符串
const desc = computed(() => {
  if (props.desc.length > props.end) {
    return props.desc.slice(0, props.end) + '...'
  } else {
    return props.desc
  }
})
</script>

<style scoped lang="less">
.description {
  white-space: normal;
}
</style>