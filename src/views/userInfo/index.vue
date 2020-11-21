<template>
  <div class="userInfo">
    <!--导航栏-->
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- 导航栏 -->
    <input type='file' hidden ref='file' accept='image/*' @change="onFileChange">
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        width="30"
        height="30"
        :src="userInfo.photo"
        round
        fit="cover"
      />
    </van-cell>
    <van-cell title="昵称" is-link :value="userInfo.name" @click="isEditNameShow = true"></van-cell>
    <van-cell title="性别" is-link :value="userInfo.gender===1?'女':'男'" @click="isEditGenderShow = true"></van-cell>
    <van-cell title="生日" is-link :value="userInfo.birthday "  @click="isEditBirthShow = true"></van-cell>
    <!-- 修改昵称 -->
    <van-popup
        v-model="isEditNameShow"
        position="bottom"
        :style="{height:'100%'}"
    >
        <update-user-name 
            @close='isEditNameShow = false' 
            :name='userInfo.name'
            @update-name='userInfo.name = $event'
        ></update-user-name>
    </van-popup>

    <!-- 修改性别 -->
     <van-popup
        v-model="isEditGenderShow"
        position="bottom"
        :style="{height:'40%'}"
    >
        <update-user-gender 
            :value='userInfo.gender'
            @close='isEditGenderShow = false' 
            :gender='userInfo.gender'
            @update-gender='userInfo.gender = $event'
        ></update-user-gender>
    </van-popup>
    <!-- 修改生日 -->
    <van-popup
        v-model="isEditBirthShow"
        position="bottom"
        :style="{height:'40%'}"
    >
        <update-user-birth 
            v-if='isEditBirthShow'
            v-model='userInfo.birthday'
            @close='isEditBirthShow = false' 
            @update-birth="userInfo.birthday = $event"
        ></update-user-birth>
    </van-popup>
    <!-- 修改用户头像 -->
     <van-popup
        v-model="isEditAvatarShow"
        position="bottom"
        :style="{height:'100%'}"
    >
        <update-user-avatar 
            v-if="isEditAvatarShow"
            :file="previewImage"
            @close="isEditAvatarShow = false"
            @update-photo="userInfo.photo = $event"
        ></update-user-avatar>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo } from "../../api/user";
import UpdateUserName from "./components/update-user-name.vue";
import UpdateUserGender from './components/update-user-gender.vue'
import UpdateUserBirth from './components/update-user-birth'
import UpdateUserAvatar from './components/update-user-avatar.vue'
export default {
  name: "userInfo",
  components: {
    UpdateUserName,
    UpdateUserGender ,
    UpdateUserBirth,
    UpdateUserAvatar
  },
  created() {
    this.loadUserInfo();
  },
  data() {
    return {
      userInfo: {},
      isEditNameShow: false,
      isEditGenderShow:false,
      isEditBirthShow:false,
      isEditAvatarShow:false,
      previewImage:null,//上传预览图片路径
    };
  },
  methods: {
    async loadUserInfo(){
      const { data } = await getUserInfo();
      this.userInfo = data.data;
    },
    onFileChange(){
        this.isEditAvatarShow = true
        const file = this.$refs['file'].files[0]
        this.previewImage = file
        this.$refs.file.value=''
    }
  },
};
</script>

<style lang='less' scoped>
.van-popup{
    background-color: #f5f7f9;
}
</style>