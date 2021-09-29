<template>
  <div class="MISADialog">
    <div class="box">
      <div class="header-site">CUKCUK - Quản lý nhà hàng</div>
      <div class="content-site">
        <div class="content">
          <div><div class="info-icon"></div></div>
          <span>{{ content }}</span>
        </div>
        <div class="footer-site">
          <div style="margin-left: auto"></div>
          <!-- Nút hủy bỏ -->
          <Button
            v-if="true"
            :displayName="'Có'"
            :typeButton="'default'"
            :customButtonId="'yesBtn'"
            @click="$emit('yes')"
          ></Button>
          <!-- END Nút hủy bỏ -->
          <!-- Nút hủy bỏ -->
          <Button
            v-if="true"
            :displayName="'Không'"
            :typeButton="'default'"
            :customButtonId="'noBtn'"
            @click="$emit('no')"
          ></Button>
          <!-- END Nút hủy bỏ -->
          <!-- Nút hủy bỏ -->
          <Button
            v-if="type == 'delete' ? false : true"
            :displayName="'Hủy bỏ'"
            :typeButton="'default'"
            :customButtonId="'cancleBtn'"
            @click="$emit('cancle')"
          ></Button>
          <!-- END Nút hủy bỏ -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../base/BaseButton.vue";
export default {
  components: {
    Button,
  },
  props: ["content", "type"],
};
</script>

<style scoped>
@import "../../styles/own-css/dialog.css";
</style>