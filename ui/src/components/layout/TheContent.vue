<template>
  <div class="content d-flex-col" :class="isExpand ? 'expand' : ''">
    <div class="info-site d-flex">
      <div class="pl-8">
        Vui lòng cập nhật thông tin nhà hàng để chúng tôi phục vụ quý khách tốt
        hơn.
      </div>
      <div class="ml-auto"></div>
      <div class="update-site d-flex align-items-c pr-15">
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        <a href="javascript:void(0)">Cập nhật ngay</a>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import EventBus from "../../eventBus";
export default {
  data() {
    return {
      isExpand: false,
    };
  },
  created() {
    EventBus.$on("toggle", () => {
      this.isExpand = !this.isExpand;
    });
  },
  methods: {
  },
};
</script>

<style scoped>
@import "../../styles/layout-css/content.css";
</style>