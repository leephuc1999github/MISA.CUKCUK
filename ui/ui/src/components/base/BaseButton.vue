<template>
  <div
    class="MISAButton"
    @click="$emit('click')"
    :class="typeButton"
    v-shortkey="shortkey" @shortkey="$emit('click')"
    :id="customButtonId"
    :title="titleName"
  >
    <button>
      <div class="icon" :class="customIconClass"></div>
      <span>{{ displayName }}</span>
    </button>
  </div>
</template>

<script>
export default {
  props: ["displayName", "customIconClass", "typeButton", "customButtonId", "shortkey", "titleName"],
};
</script>

<style scoped>
@import "../../styles/own-css/button.css";
</style>