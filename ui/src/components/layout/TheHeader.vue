<template>
  <div class="header d-flex">
    <div class="logo-site">
      <div class="toggle-icon" @click="toggleNavbar"></div>
      <div class="cukcuk-logo" @click="reloadPage"></div>
    </div>
    <div class="config-site d-flex align-items-c px-12">
      <div>
        <!-- Dropdown Autocomplete chi nhánh -->
        <SelectBox
          v-if="true"
          :required="false"
          :displayName="'Chi nhánh'"
          :typeSelectBox="'autocomplete'"
          :customClassName="'branch-sb'"
          :valueSelected="'pp'"
          :isGroupControl="true"
          :nameControl="'Branch'"
          :groupControls="[
            { NameControl : 'Lọc', CustomClassName : 'filter-icon' }
          ]"
          :dataOptions="branches"
        ></SelectBox>
        <!-- END Dropdown Autocomplete chi nhánh -->
      </div>
      <div class="ml-auto"></div>
      <div>

        <!-- Dropdown AutoComplete ngôn ngữ -->
        <SelectBox
          v-if="true"
          :required="false"
          :nameControl="'Language'"
          :customClassName="'language-sb'"
          :displayName="'Ngôn ngữ'"
          :typeSelectBox="'autocomplete'"
          :valueSelected="'vn'"
          :isGroupControl="false"
          :dataOptions="languages"
        ></SelectBox>
        <!-- END Dropdown Autocomplete ngôn ngữ -->
      </div>
      <div class="noti-icon">
        <i class="fa fa-globe" aria-hidden="true"></i>
      </div>

      <div class="phone-icon"></div>
      <div class="user-site">
        <div class="user-icon">
          <img src="../../assets/EmployeeImage.png" alt="">
        </div>
        <span style="padding-right: 50px">Lê Khắc Phúc</span>
        <i class="fa fa-sort-desc" style="margin-top: -5px"></i>
      </div>
      
    </div>
  </div>
</template>

<script>
import SelectBox from "../base/BaseSelectBox.vue";
import EventBus from '../../eventBus'
import { mapGetters } from "vuex";
export default {
  components: {
    SelectBox,
  },
  computed: {
    ...mapGetters(["branches", "languages", "isResize"]),
  },
  methods: {
    /**
     * Ẩn hiện thanh menu
     * Created : LP(21/9)
     * Modified : NULL
     */
    toggleNavbar() {
      EventBus.$emit("toggle");
    },

    /**
     * Tải lại trang
     * Created : LP(21/9)
     * Modified : NULL
     */
    reloadPage() {
      window.location = "/";
    },
  },
};
</script>

<style scoped>
@import "../../styles/layout-css/header.css";
</style>