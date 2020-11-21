<template>
  <div class="updateUserName">
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    ></van-nav-bar>
    <div class="name-wrap">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="10"
        placeholder="请输入昵称"
        show-word-limit
      ></van-field>
    </div>
  </div>
</template>
<script>
import { upUserInfo } from "../../../api/user";
export default {
  name: "updateUserName",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      message: this.name,
    };
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "保存中",
        forbidclick: true,
      });
      try {
        await upUserInfo({
          name: this.message,
        });
        this.$toast.success("保存成功");
        this.$emit('update-name',this.message)
        this.$emit("close");
      } catch(err) {
          if(err&&err.response&&err.response.status===409){
              this.$toast.fail('昵称已存在')
          }
      }
    },
  },
};
</script>

<style lang='less' scoped>
.name-wrap {
  padding: 10px;
}
</style>