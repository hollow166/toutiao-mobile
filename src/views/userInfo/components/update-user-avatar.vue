<template>
  <div class="update-user-avatar">
    <img :src="image" alt="" ref="image" class="image" />
    <van-nav-bar
      class="toolBar"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    ></van-nav-bar>
  </div>
</template>

<script>
import { editUserAvatar } from "../../../api/user";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
  name: "updateUserAvatar",
  props: {
    file: {
      type:Object,
      required: true,
    },
  },
  mounted() {
    const image = this.$refs.image;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });
    console.log(this.cropper);
  },
  data() {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null,
    };
  },
  methods: {
    getCroppedCanvas() {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file);
        });
      });
    },
    async onConfirm() {
      const file = await this.getCroppedCanvas();
      const fd = new FormData();
      fd.append("photo", file);
      await editUserAvatar(fd);
      this.$toast.success("保存成功");
      this.$emit("update-photo", window.URL.createObjectURL(file));
      this.$emit("close");
    },
  },
};
</script>

<style lang='less' scoped>
.toolBar {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
}
.image {
  display: block;

  max-width: 100%;
}
</style>