<template>
  <div class="updateGender">
    <van-picker
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onGenderChange"
    ></van-picker>
  </div>
</template>

<script>
import { upUserInfo } from "../../../api/user";
export default {
  name: "updateGender",
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      defaultIndex: this.value,
    };
  },
  methods: {
    onGenderChange(picker, value, index) {
      this.defaultIndex = index;
    },
    async onConfirm() {
      this.$toast.loading({
        message: "保存中",
        forbidclick: true,
      });
      await upUserInfo({
        gender: this.defaultIndex,
      });
      this.$toast.success("保存成功");
      this.$emit("update-gender", this.defaultIndex);
      this.$emit("close");
    },
  },
};
</script>

<style lang='less' scoped>
</style>