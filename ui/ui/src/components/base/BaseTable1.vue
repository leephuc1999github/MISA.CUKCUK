<template>
  <div class="background-table" :class="className">
    <table class="MISATable1" v-if="true">
      <tbody class="title tbody1">
        <tr class="thead tr1">
          <td
            :style="{
              width: `${th.Width}%`,
              'justify-content': 'center',
              'max-width': `${th.Width}%`,
            }"
            v-for="(th, i) in thead"
            :key="i"
            class="th1"
            :class="!th.Active ? 'hidden' : ''"
          >
            <!-- Tên cột -->
            <span class="txt" :title="th.Name">{{ th.Name }}</span>
            <!-- END Tên cột -->

            <!-- Tìm kiếm theo số || chuỗi -->
            <Context
              v-if="
                (th.TypeFilter == typeControl.INPUT.NUMBER ||
                  th.TypeFilter == typeControl.INPUT.STRING) &&
                th.Active
              "
              :displayName="'Tìm kiếm sử dụng context'"
              :typeDataFilter="th.TypeFilter"
              :nameContext="th.NameFieldFilter"
              @selected="
                (option) => {
                  chooseFilter(option);
                }
              "
            ></Context>
            <!-- END Tìm kiếm theo số || chuỗi -->

            <!-- Dropdown tìm kiếm  -->
            <SelectBox
              v-if="th.TypeFilter == typeControl.SELECTBOX && th.Active"
              :customClassName="'select-box-site'"
              :required="false"
              :displayName="`${th.Name}`"
              :typeSelectBox="'dropdown'"
              :isGroupControl="false"
              :nameControl="th.Code"
              :dataOptions="{
                DisplayColumn: 'Name',
                IsShowTitle: false,
                ColumnTitles: [
                  {
                    Code: 'Name',
                    Name: 'Tên cột',
                    Width: 100,
                    TextAlign: 'flex-start',
                  },
                ],
                DataRows: th.Options,
              }"
              :valueSelected="null"
              @selected="
                (option) => {
                  option = {
                    operator: '=',
                    value: option,
                    name: th.NameFieldFilter,
                  };
                  chooseFilter(option);
                }
              "
            ></SelectBox>
            <!-- END Dropdown tìm kiếm -->
          </td>
        </tr>
      </tbody>
      <tbody class="table1-data-body tbody1" v-if="true">
        <tr
          v-for="(tr, i) in tbody"
          :key="i"
          @click="choose(tbody[i][thead[0].Code])"
          @dblclick="openForm()"
          :class="tbody[i][thead[0].Code] == inventoryItemId ? 'active' : ''"
          class="tr1"
        >
          <td
            v-for="(td, j) in thead"
            :key="j"
            :style="{
              width: `${td.Width}%`,
              'justify-content': td.TextAlign,
              'max-width': `${td.Width}%`,
            }"
            :title="tbody[i][td.Code]"
            :class="!td.Active ? 'hidden' : ''"
            class="td1"
            :name="td.Code"
          >
            <!-- Nếu kiểu dữ liệu là chuỗi -->
            <span
              class="txt"
              v-if="td.TypeData == typeControl.INPUT.STRING && td.Active"
            >
              {{ tbody[i][td.Code] }}
            </span>
            <!-- END Nếu kiểu dữ liệu là chuỗi -->

            <!-- Nếu kiểu dữ liệu là số -->
            <span
              v-if="td.TypeData == typeControl.INPUT.NUMBER && td.Active"
              class="txt"
              >{{ tbody[i][td.Code] | formatNumber }}</span
            >
            <!-- END Nếu kiểu dữ liệu là số -->

            <!-- Nếu kiểu dữ liệu là bit => checkbox -->
            <span v-if="td.TypeData == typeControl.CHECKBOX && td.Active"
              ><input
                type="checkbox"
                v-model="tbody[i][td.Code]"
                onclick="return false;"
            /></span>
            <!-- END Nếu kiểu dữ liệu là bit => checkbox -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Context from "./BaseContext.vue";
import { mapGetters, mapMutations } from "vuex";
import SelectBox from "./BaseSelectBox.vue";
import Common from '../../common';
export default {
  props: ["thead", "tbody", "className", "hasControlHeader", "hasControlBody"],
  components: {
    Context,
    SelectBox,
  },
  computed: {
    ...mapGetters(["inventoryItemId", "filters"]),
  },
  data() {
    return {
      // Vị trí hiển thị của dữ liệu lọc kiểu select-box
      stylePosition: null,

      // Trạng thái hiển thị dữ liệu kiểu select-box
      show: false,

      // Vị trí trỏ chuột
      mousePointer: {
        x: 0,
        y: 0,
      },

      //Kiểu dữ control lọc
      typeControl: {
        SELECTBOX: "select-box",
        CHECKBOX: "checkbox",
        INPUT: {
          NUMBER: "number",
          STRING: "string",
        },
      },

      options: [],
      NameControlCurrent: null,
    };
  },
  filters: {
    formatNumber: function (params) {
      return Common.formatNumber(params);
    },
  },
  mounted() {
    document.addEventListener("click", this.closeData);
  },
  methods: {
    ...mapMutations(["SET_FILTER"]),

    chooseFilter(option) {
      if(option.operator == '='){
        if(option.value != null) option.value = `'${option.value}'`;
      }
      this.$emit("filter", option);
    },

    /**
     * Đóng dữ liệu dropdown
     * Created : LP(25/9)
     */
    closeData(event) {
      if (!this.$el.contains(event.target)) {
        this.show = false;
      }
    },

    /**
     * Chọn hàng
     * Created : LP(24/9)
     */
    choose(id) {
      this.$emit("choose", id);
    },

    /**
     * Mở form
     * Created : LP(24/9)
     */
    openForm() {
      this.$emit("working", "edit");
    },
  },
};
</script>

<style scoped>
@import "../../styles/own-css/table1.css";
</style>