<template>
  <div class="navbar" :class="isToggle ? 'toggle' : ''">
    <div class="menu">
      <router-link to="/dashboard" class="menu-item" exact-active-class="">
        <div class="menu-icon dashboard"></div>
        <span>Tổng quan</span>
      </router-link>
      <router-link to="/" class="menu-item" active-class="">
        <img src="../../assets/vector-smart-object.png" alt="" />
        <span>Thực đơn</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import EventBus from '../../eventBus'
export default {
  data() {
    return {
      isToggle : false
    }
  },
  created() {
    EventBus.$on("toggle", () => {
      this.isToggle = !this.isToggle;
    })
  },
};
</script>

<style scoped>
@import "../../styles/layout-css/navbar.css";
</style>