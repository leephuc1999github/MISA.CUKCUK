<template>
  <div class="MISAPagination">
    <div class="paging-site">
      <div class="first-page-icon" @click="goToFirstPage"></div>
      <div class="prev-page-icon" @click="goToPrevPage"></div>
      <div class="divide"></div>

      <div class="current-page-site">
        <span>Trang</span>
        <input
          type="number"
          :value="pageIndex"
          ref="pageIndex"
          @keypress.enter="emitPageIndex"
        />
        <span>trên {{ allPage }}</span>
      </div>

      <div class="divide"></div>
      <div class="next-page-icon" @click="goToNextPage"></div>
      <div class="last-page-icon" @click="goToLastPage"></div>
      <div class="divide"></div>
      <div class="refresh-icon" @click="reloadPage"></div>
      <div class="divide"></div>

      <div class="size-on-page-site">
        <SelectBox
          v-if="true"
          :customClassName="'pageSize-site'"
          :required="false"
          :displayName="'Độ dài bản ghi trên một trang'"
          :typeSelectBox="'dropdown'"
          :isGroupControl="false"
          :nameControl="'PageSize'"
          :valueSelected="pageSize"
          @selected="
            (value) => {
              $emit('choose', value);
            }
          "
          :dataOptions="sizeOnPage"
        ></SelectBox>
      </div>
    </div>
    <div style="margin-left: auto"></div>
    <div class="total-site">
      Hiển thị {{ (pageIndex-1)*pageSize + 1 }} - {{ (pageIndex-1)*pageSize + sizePage }} trên {{ allRecord }} kết quả
    </div>
  </div>
</template>

<script>
import SelectBox from "../base/BaseSelectBox.vue";
export default {
  props: [
    "sizeOnPage",
    "pageSize",
    "allPage",
    "pageIndex",
    "allRecord",
    "sizePage",
  ],
  components: { SelectBox },
  created() {},
  data() {
    return {
      indexStart: 0,
      indexEnd: 0,
    };
  },
  mounted() {
    this.indexStart = (this.pageIndex - 1) * this.pageSize + 1;
    this.indexEnd = this.indexStart + this.sizePage - 1;
  },
  watch: {},
  methods: {
    /**
     * Kích hoạt thay đổi số trang
     * Created : LP(24/9)
     */
    emitPageIndex() {
      try {
        let val = this.$refs.pageIndex.value;
        if (val < 0) val = 1;
        if (val > this.allPage) val = this.allPage;
        this.$emit("change", val);
      } catch (error) {
        console.log("emitPageIndex".concat(error));
      }
    },

    /**
     * Về dầu trang
     * Created: LP(24/9)
     */
    goToFirstPage() {
      try {
        this.$refs.pageIndex.value = 1;
        this.emitPageIndex();
      } catch (error) {
        console.log("goToFirstPage".concat(error));
      }
    },

    /**
     * Về cuối trang
     * Created : LP(24/9)
     */
    goToLastPage() {
      try {
        this.$refs.pageIndex.value = this.allPage;
        this.emitPageIndex();
      } catch (error) {
        console.log("goToLastPage".concat(error));
      }
    },

    /**
     * Đến trang tiếp
     * Created : LP(24/9)
     */
    goToNextPage() {
      try {
        let val = this.$refs.pageIndex.value;
        this.$refs.pageIndex.value = Number(val) + 1;
        this.emitPageIndex();
      } catch (error) {
        console.log("goToNextPage".concat(error));
      }
    },

    /**
     * Quay lại trang trước
     * Created : 24/9
     */
    goToPrevPage() {
      try {
        let val = this.$refs.pageIndex.value;
        this.$refs.pageIndex.value = Number(val) - 1 == 0 ? 1 : ( Number(val) - 1);
        this.emitPageIndex();
      } catch (error) {
        console.log("goToPrevPage".concat(error));
      }
    },

    /**
     * Tải lại trang
     * Created : LP(24/9)
     */
    reloadPage() {
      this.emitPageIndex();
    },
  },
};
</script>

<style scoped>
@import "../../styles/own-css/pagination.css";
</style>