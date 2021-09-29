<template>
  <fieldset class="MISAUploadFile">
    <legend>Ảnh đại diện</legend>
    <div class="img-site">
      <div class="symbol-site">
        <div class="pencil-icon"></div>
        <span>Biểu tượng</span>
      </div>
      <img :src="image" alt="" width="160" height="121" />

      <!-- ../../assets/ImageHandler.png -->
      <div class="noti">
        Chọn các ảnh có định dạng
        <span style="font-weight: bold">(.jpg, .jpeg, .png, .gif)</span>
      </div>
    </div>
    <div class="action-site">
      <input
        type="file"
        hidden
        ref="avatar"
        accept="image/png, image/jpeg"
        @change="previewFile"
      />
      <button class="choose-icon" @click="chooseImage">...</button>
      <button class="remove-icon" @click="removeImage">x</button>
    </div>
  </fieldset>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  created() {
    if (this.image == null) {
      {
        this.SET_URL_IMAGE(
          "https://localhost:44379/images/inventory-item/f97161f9-a510-4fec-9e06-796cb2521e69.png"
        );
      }
    }
  },
  props: ["image"],
  data() {
    return {
      avatar: null,
    };
  },
  methods: {
    ...mapMutations(["SET_URL_IMAGE"]),

    /**
     * Chọn ảnh
     * Created: LP(22/9)
     */
    chooseImage() {
      this.$refs.avatar.click();
    },

    /**
     * Kiểm tra ảnh
     * Created : LP(22/9)
     */
    previewFile(event) {
      this.avatar = event.target.files[0];
      this.SET_URL_IMAGE(URL.createObjectURL(this.avatar));
      this.$emit("file", this.avatar);
    },

    /**
     * Gỡ ảnh
     * Created : LP(22/9)
     */
    removeImage() {
      this.avatar = null;
      this.$emit("file", this.avatar);
      this.SET_URL_IMAGE(
        "https://localhost:44379/images/inventory-item/f97161f9-a510-4fec-9e06-796cb2521e69.png"
      );
    },
  },
};
</script>
<style scoped>
@import "../../styles/own-css/upload-file.css";
</style>
