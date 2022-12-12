<template>
  <div class="bangumi-item">
    <div class="img">
      <img v-if="data.images" v-lazy="data.images.common" v-preview="data.images.large" :alt="data.name"
        referrerpolicy="no-referrer">
      <van-empty v-else image-size="100" image="error" />
    </div>
    <div class="info">
      <div class="title" v-if="data.name_cn">{{ data.name_cn }}</div>
      <div class="title" v-else-if="data.name">{{ data.name }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    default: () => ({
      "id": 899,
      "url": "http://bgm.tv/subject/899",
      "type": 2,
      "name": "名探偵コナン",
      "name_cn": "名侦探柯南",
      "summary": "",
      "air_date": "1996-01-08",
      "air_weekday": 1,
      "rating": {
        "total": 6347,
        "count": {
          "1": 17,
          "2": 6,
          "3": 16,
          "4": 41,
          "5": 198,
          "6": 736,
          "7": 1940,
          "8": 1902,
          "9": 749,
          "10": 742
        },
        "score": 7.7
      },
      "rank": 575,
      "images": {
        "large": "http://lain.bgm.tv/pic/cover/l/01/88/899_Q3F3X.jpg",
        "common": "http://lain.bgm.tv/pic/cover/c/01/88/899_Q3F3X.jpg",
        "medium": "http://lain.bgm.tv/pic/cover/m/01/88/899_Q3F3X.jpg",
        "small": "http://lain.bgm.tv/pic/cover/s/01/88/899_Q3F3X.jpg",
        "grid": "http://lain.bgm.tv/pic/cover/g/01/88/899_Q3F3X.jpg"
      },
      "collection": {
        "doing": 5685
      }
    })
  }
})

// 传入图片对象，判断所有键值对的值是否存在，存在则返回该键的值，否则返回默认值
const getImgUrl = (imgObj, defaultUrl) => {
  for (const key in imgObj) {
    if (imgObj[key]) {
      return imgObj[key]
    }
  }
  return defaultUrl
}

</script>

<style scoped lang="less">
:deep(.van-empty) {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.bangumi-item {
  display: flex;
  flex-direction: column;
  width: 100%;

  .img {
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 4;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    flex: 1;
    margin-top: 8px;

    .title {
      font-size: 14px;
      font-weight: bold;
      color: #333;
    }
  }
}
</style>