<template>
  <div class="MISAInput" :class="customClassName">
    <div class="box" :ref="refName" :class="showError ? 'b-red' : ''">
      <input
        type="text"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @focus="hideError()"
        @blur="checkEmpty($event.target.value)"
        :ref="refName + '_input'"
        :tabindex="tabindex"
      />
    </div>
    <div class="errors" v-if="showError">
      {{ displayName }} không được để trống
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "displayName",
    "required",
    "value",
    "refName",
    "customClassName",
    "tabindex",
    "showError"
  ],
  mounted() {
    if (this.tabindex == 1) {
      this.$refs[this.refName + "_input"].focus();
    }
  },
  watch: {
  },
  methods: {
    /**
     * Check trống
     * Created : LP(27/9)
     */
    checkEmpty(value) {
      if (this.required) {
        if (value == "" || value == "") {
          this.$emit("error", false);
        }
      }
      this.$emit("tab", this.tabindex);
    },

    /**
     * Ẩn lỗi
     * Created :LP
     */
    hideError() {
      this.$emit("error", false);
    },
  },
};
</script>
<style scoped>
@import "../../styles/own-css/input.css";
</style>