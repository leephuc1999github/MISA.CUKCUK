<template>
  <div class="MISASelectBoxGroup" :class="customClassName" :title="displayName">
    <div
      class="group-control"
      :ref="nameControl + '_box'"
      :class="showError ? 'b-red' : ''"
      @click="focusControl"
    >
      <!-- Ô tìm kiếm  -->
      <input
        type="text"
        v-model="keysearch"
        :readonly="typeSelectBox == typeControl.DROPDOWN"
        :ref="nameControl"
        :tabindex="tabindex"
      />
      <!-- END Ô tìm kiếm -->

      <!-- Nút hiển thị dữ liệu -->
      <div class="rotate-site" @click.stop="showAll($event)"></div>
      <!-- END Nút hiển thị dữ liệu -->

      <!-- Nhóm nút đi kèm -->
      <div
        class="button-control"
        v-if="isGroupControl"
        :ref="nameControl + '_button'"
      >
        <div
          class="icon"
          :title="control.NameControl"
          :class="control.CustomClassName"
          v-for="(control, index) in groupControls"
          :key="index"
        ></div>
      </div>
      <!-- END Nhóm nút đi kèm -->
    </div>
    <!-- Lỗi -->
    <div class="errors" :ref="nameControl + '_errors'" v-if="showError">
      {{ displayName }} không được để trống
    </div>
    <!-- END Lỗi -->

    <!-- Hiển thị options -->
    <div class="data" v-if="false" :style="styleObject">
      <div
        :class="option.Id == currentId ? 'active' : ''"
        @click="choose(option)"
        v-for="(option, index) in options"
        :key="index"
        class="option-item"
      >
        <span>{{ option.Name }}</span>
      </div>
    </div>

    <div class="data" v-if="show && options != null" :style="styleObject">
      <table>
        <tbody class="data-body">
          <tr class="thead" v-if="options.IsShowTitle">
            <td
              v-for="(th, i) in options.ColumnTitles"
              :key="i"
              :style="{ width: th.Width + '%' }"
            >
              {{ th.Name }}
            </td>
          </tr>
          <tr
            v-for="(tr, i) in options.DataRows"
            :key="i"
            :class="tr.Id == currentId ? 'active' : ''"
            @click="choose(tr)"
          >
            <td
              v-for="(td, j) in options.ColumnTitles"
              :key="j"
              :style="{
                width: td.Width + '%',
                'justify-content': td.TextAlign,
              }"
            >
              <span v-if="td.TypeData == 'number'">{{
                tr[td.Code] | formatNumber
              }}</span>
              <span v-else>{{ tr[td.Code] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- END Hiển thị options -->
  </div>
</template>

<script>
export default {
  props: [
    "valueSelected",
    "required",
    "displayName",
    "typeSelectBox",
    "isGroupControl",
    "dataOptions",
    "errors",
    "groupControls",
    "customClassName",
    "nameControl",
    "tabindex",
    "showError",
  ],
  data() {
    return {
      show: false,
      keysearch: null,
      currentId: null,
      currentName: null,
      options: [],

      mousePointer: {
        x: 0,
        y: 0,
      },

      styleObject: null,

      typeControl: {
        COMBOBOX_AUTO_COMPLETE: "autocomplete",
        DROPDOWN: "dropdown",
      },
    };
  },
  created() {
    this.options = this.dataOptions;
    if (this.valueSelected == null) {
      this.keysearch = null;
      this.currentName = null;
    }
    if (this.dataOptions != null) this.chooseById(this.valueSelected);
  },
  filters: {
    /**
     * Định dạng lại kiểu số
     * Created : 26/9
     */
    formatNumber: function (params) {
      try {
        if (typeof params == "number") {
          let preHandler = params.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          });
          return preHandler.substring(0, preHandler.length - 2);
        }
      } catch (error) {
        console.log("formatNumber".concat(error));
      }
      return null;
    },
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  watch: {
    /**
     * Chức năng autocomplete
     * Created : LP(26/9)
     */
    keysearch() {
      if (this.currentName != this.keysearch) {
        this.options = [];
        this.dataOptions.DataRows.forEach((element) => {
          if (
            element[this.dataOptions.DisplayColumn]
              .toLowerCase()
              .includes(this.keysearch.toLowerCase())
          ) {
            this.options.push(element);
          }
        });
        this.show = true;
      }
    },

    valueSelected() {
      if (this.dataOptions != null) this.chooseById(this.valueSelected);
    },
  },
  methods: {
    /**
     * Focus vào control
     * Created : LP
     */
    focusControl() {
      this.$emit("error", false);
    },

    /**
     * Show all options
     * Author : LP(31/8)
     */
    showAll(event) {
      this.$emit("error", false);

      let target = event.currentTarget;
      let x = target.getBoundingClientRect().x;
      let y = target.getBoundingClientRect().y;

      let w = this.$refs[this.nameControl + "_box"].clientWidth;
      let w1 = this.isGroupControl
        ? this.$refs[this.nameControl + "_button"].clientWidth - 2
        : 0;

      this.mousePointer.x = x;
      this.mousePointer.y = y + 26;

      this.styleObject = {
        width: w + "px",
        top: this.mousePointer.y + "px",
        left: this.mousePointer.x - w + w1 + 22 + "px",
      };

      this.options = this.dataOptions;
      // đóng mở dữ liệu
      this.show = !this.show;

      // trỏ vào input
      this.$refs[this.nameControl].focus();
    },

    /**
     * Choose option
     * Author : LP(31/7)
     */
    choose(option) {
      this.currentId = option.Id;
      this.currentName = option[this.dataOptions.DisplayColumn];
      this.keysearch = option[this.dataOptions.DisplayColumn];
      this.$emit("selected", this.currentId);
      this.$refs[this.nameControl].focus();
      this.show = false;
    },

    /**
     * Chọn theo giá trị truyền vào
     * Author : LP(31/8)
     */
    chooseById(id) {
      let isValid = false;
      try {
        this.dataOptions.DataRows.forEach((element) => {
          if (element.Id == id) {
            this.currentId = id;
            this.keysearch = element[this.dataOptions.DisplayColumn];
            this.currentName = element[this.dataOptions.DisplayColumn];
            isValid = true;
          }
        });
        if (!isValid) {
          this.keysearch = null;
          this.currentName = null;
          this.currentId = null;
        }
      } catch (error) {
        console.log(this.nameControl.concat(error));
      }
    },

    /**-------------------------------------------------------
     * Close data
     * Author : LP(28/8)
     */
    close(event) {
      if (!this.$el.contains(event.target)) {
        this.show = false;
      }
    },
  },
};
</script>

<style scoped>
@import "../../styles/own-css/selectbox.css";
</style>