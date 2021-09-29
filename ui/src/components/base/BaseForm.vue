<template>
  <div class="dark-screen">
    <div class="MISAForm">
      <div
        class="modal"
        :style="{ width: width + 'px', height: height + 'px' }"
      >
        <div class="header-site">
          <span>{{ titleName }}</span>
          <div style="margin-left: auto"></div>
          <div class="close-icon" @click="closeForm"></div>
        </div>
        <div class="content-site">
          <slot name="content"></slot>
          <div class="footer-site">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
    <Dialog
      v-if="isOpenDialog"
      :content="'Dữ liệu đã thay đổi, bạn có muốn cất không?'"
      @yes="isOpenDialog = false; $emit('yesDialog')"
      @no="$emit('noDialog')"
      @cancle="isOpenDialog = false"
    ></Dialog>
  </div>
</template>

<script>
import Dialog from "../base/BaseDialog.vue";
export default {
  components: {
    Dialog,
  },
  props: ["titleName", "height", "width"],
  data() {
    return {
      isOpenDialog: false,
    };
  },
  methods: {
    /**
     * Đóng form
     * Created : LP(22/9)
     * Modified : NULL
     */
    closeForm() {
      this.$emit("close");
      this.isOpenDialog = true;
    },
  },
};
</script>

<style scoped>
@import "../../styles/own-css/form.css";
</style>