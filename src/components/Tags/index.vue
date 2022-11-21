<template>
  <div class="Tags">
    <van-tag v-if="config.pc" plain color="var(--tags-border-color)" text-color="var(--tags-text-color)">云盘</van-tag>
    <van-tag v-if="config.originCoverType == 1" color="#ff0000" text-color="#ffffff">原唱</van-tag>
    <van-tag v-if="config.fee == 4" plain color="#20c1ff" text-color="#4aa3ff">试听</van-tag>
    <van-tag v-if="config.originCoverType == 2" plain color="var(--tags-border-color)"
      text-color="var(--tags-text-color)">翻唱</van-tag>
    <van-tag v-if="config.hr" plain color="var(--tags-border-color)" text-color="var(--tags-text-color)">Hi-Res
    </van-tag>
    <van-tag v-if="config.sq && !config.hr" plain color="var(--tags-border-color)" text-color="var(--tags-text-color)">
      SQ</van-tag>
    <van-tag v-if="config.fee == 1 || config.fee == 8" plain color="var(--tags-border-color)"
      text-color="var(--tags-text-color)">VIP
    </van-tag>

    <van-tag v-if="config.noCopyrightRcmd !== null" plain color="var(--tags-border-color)"
      text-color="var(--tags-text-color)">无版权</van-tag>
  </div>
</template>

<script setup>
const props = defineProps({
  config: {
    hr: Object,// Hi-Res
    sq: Object,// 无损音质
    fee: Number,// 0:免费 1:VIP歌曲 4: 购买专辑 8: 非会员可免费播放低音质，会员可播放高音质及下载
    mv: Number,// 空:无MV 不为空:有MV
    noCopyrightRcmd: Object,// null表示可以播，非空表示无版权
    originCoverType: Number,// 0: 未知 1: 原曲 2: 翻唱
    pc: Object,//云盘歌曲信息，如果不存在该字段，则为非云盘歌曲
  }
})
</script>

<style scoped lang="less">
:deep(.van-tag) {
  transform: scale(.8);
  transform-origin: left center;
  font-weight: bold;
}

.Tags {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  // gap: 4px;
}
</style>