<template>
  <div class="searchBar">
    <van-icon name="arrow-left" size="22" @click="$router.back()" />
    <van-search v-model="searchData.keyword" placeholder="请输入搜索关键词" input-align="center" shape='round'
      :clearable="false" @keydown.enter.stop="getSearch" />
    <span @click="getSearch">搜索</span>
  </div>
</template>

<script setup>
const emit = defineEmits(['search'])
const props = defineProps({
  keyword: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="less">
// 搜索框
.searchBar {
  display: flex;
  align-items: center;
  background: var(--van-search-background);
  padding: 0 16px;
  box-sizing: border-box;
}
</style>