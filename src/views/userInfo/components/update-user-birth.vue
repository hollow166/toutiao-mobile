<template>
  <div class="container">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    ></van-datetime-picker>
  </div>
</template>

<script>
import {upUserInfo} from '../../../api/user'
import dayjs from 'dayjs'
export default {
  name: "updateUserBirth",
  props: {
    value: {
      type: String,
      requires: true,
    },
  },
  data() {
    return {
      minDate: new Date(1979, 0, 1),
      maxDate: new Date(2020, 12, 31),
      currentDate: new Date(this.value),
    };
  },
  methods: {
    async onConfirm() {
        this.$toast.loading({
        message: "保存中",
        forbidclick: true,
      });
    //   const date = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth()}-${this.currentDate.getDay()}`
       await upUserInfo({
        birthday:dayjs(this.currentDate).format('YYYY-MM-DD') ,
      });
      this.$toast.success("保存成功");
      this.$emit("update-birth", dayjs(this.currentDate).format('YYYY-MM-DD'));
      this.$emit("close");
    },
  },
};
</script>

<style lang='less' scoped>
</style>