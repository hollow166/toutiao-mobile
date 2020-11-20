<template>
  <van-cell class="article-item" @click='$router.push({name:"article",params:{articleId:article.art_id}})'>
    <div slot="title" class="title van-multi-ellipsis--l3">
      {{ article.title }}
    </div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div
          class="cover-wrap-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image width="116" height="73" fit="cover" :src="img"></van-image>
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate |relativeTime }}</span>
      </div>
    </div>
    <van-image
      fit="cover"
      class="right-cover"
      v-if="article.cover.type === 1"
      :src="article.cover.images[0]"
    ></van-image>
  </van-cell>
</template>

<script>
export default {
  name: "articleItem",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang='less' scoped>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/.van-cell__value {
    width: 116px;
    height: 73px;
    margin-left: 12px;
    flex: unset;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  .cover-wrap {
    display: flex;
    padding: 15px 0;
    .cover-wrap-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item {
        width: 100%;
        height: 73px;
      }
    }
  }
  .label-wrap {
    color: #b4b4b4;
    font-size: 11px;
    span {
      margin-right: 12px;
    }
  }
}
</style>