<template>
  <div class="">
    <table class="MISATable2">
      <tbody class="title tbody2">
        <tr class="thead tr2">
          <td
            :style="{
              width: `${th.Width}%`,
            }"
            v-for="(th, i) in thead"
            :key="i"
            class="th2"
            :class="!th.Active ? 'hidden' : ''"
          >
            <span class="txt" :title="th.Name">{{ th.Name }}</span>
          </td>
        </tr>
      </tbody>
      <tbody class="table2-data-body tbody2" v-if="true">
        <tr v-for="(tr, i) in rows" :key="i" class="tr2">
          <td
            v-for="(td, j) in thead"
            :key="j"
            :style="{
              width: `${td.Width}%`,
              'justify-content': td.TextAlign,
            }"
            @click="choose(i, j)"
            :class="!td.Active ? 'hidden' : ''"
            class="td2"
          >
            <span
              :ref="`col${i}${j}_text`"
              class="td-active txt"
              :style="
                td.TypeData == 'number'
                  ? { 'text-align': 'right' }
                  : { 'text-align': 'left' }
              "
            >
              {{ rows[i][td.Code] | formatNumber }}
            </span>
            <!-- <div
              :ref="`col${i}${j}`"
              class="td-inactive"
              v-if="td.TypeFilter == typeControl.SELECTBOX"
            > -->
            <SelectBox
              v-if="td.TypeFilter == typeControl.SELECTBOX"
              v-show="x == i && y == j ? true : false"
              :customClassName="'service-addition-site'"
              :required="false"
              :displayName="'Sở thích phục vụ'"
              :typeSelectBox="'autocomplete'"
              :isGroupControl="true"
              :nameControl="'ServiceAddition'"
              :dataOptions="{
                DisplayColumn: 'NameServiceAddition',
                IsShowTitle: true,
                ColumnTitles: colTitles,
                DataRows: serviceAdditions,
              }"
              :valueSelected="rows[i].Id"
              :groupControls="groupControl"
              @selected="
                (value) => {
                  getServiceAdditionById(value);
                  rows[i].Id = value;
                  rows[i].NameServiceAddition = item.NameServiceAddition;
                  rows[i].PriceServiceAddition = item.PriceServiceAddition;
                }
              "
            ></SelectBox>
            <!-- </div> -->
            <!-- <div
              v-if="td.TypeFilter == typeControl.INPUT"
              :ref="`col${i}${j}`"
              class="td-inactive"
            > -->
            <money
              v-model="rows[i].PriceServiceAddition"
              v-bind="number"
              id="price-site"
              v-show="x == i && y == j ? true : false"
              v-if="td.TypeFilter == typeControl.INPUT"
            ></money>
            <!-- </div> -->
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pt-8 d-flex">
      <!-- Nút thêm hàng -->
      <Button
        :displayName="'Thêm dòng'"
        :typeButton="'default'"
        :customIconClass="'add-row-btn'"
        @click="
          () => {
            insertRow();
          }
        "
        v-if="true"
      ></Button>
      <!-- END Nút thêm hàng -->

      <div class="mr-8"></div>

      <!-- Nút xóa hàng -->
      <Button
        :displayName="'Xóa dòng'"
        :typeButton="classBtnRemove"
        :customIconClass="'remove-row-btn'"
        @click="
          () => {
            removeRow();
          }
        "
      ></Button>
      <!-- END Nút xóa hàng -->
    </div>
  </div>
</template>

<script>
import Button from "../base/BaseButton.vue";
import SelectBox from "../base/BaseSelectBox.vue";
import { Money } from "v-money";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["thead", "tbody"],
  components: {
    Button,
    SelectBox,
    Money,
  },
  created() {
    this.rows = this.tbody;
    // console.log(this.rows[0]);
    if (this.rows == null || this.rows.length == 0) {
      this.rows = [];
      this.insertRow();
    }
  },
  computed: {
    ...mapGetters(["serviceAdditions"]),
  },
  data() {
    return {
      classBtnRemove: "disabled",

      item: {
        NameServiceAddition: null,
        PriceServiceAddition: 0,
        Id: null,
      },

      money: 0,
      number: {
        decimal: ",",
        thousands: ".",
        precision: 0,
        masked: false,
      },
      show: false,
      x: null,
      y: null,
      rows: [],

      typeControl: {
        SELECTBOX: "select-box",
        INPUT: "input",
      },

      groupControl: [
        { NameControl: "Tìm kiếm", CustomClassName: "search-icon" },
        { NameControl: "Thêm mới", CustomClassName: "add-group-icon" },
      ],

      colTitles: [
        {
          Code: "NameServiceAddition",
          Name: "Sở thích phục vụ",
          Width: 60,
          TextAlign: "flex-start",
          TypeData: "string",
        },
        {
          Code: "PriceServiceAddition",
          Name: "Thu thêm",
          Width: 40,
          TextAlign: "flex-end",
          TypeData: "number",
        },
      ],
    };
  },
  mounted() {
    document.addEventListener("click", this.hideControl);
  },
  filters: {
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
      return params;
    },
  },
  methods: {
    ...mapActions(["publlServiceAdditions"]),

    /**
     * THêm hàng
     * Created : LP(225/9)
     */
    insertRow() {
      this.item = {
        NameServiceAddition: null,
        PriceServiceAddition: 0,
        Id: null,
      };
      this.rows.push(this.item);
    },

    /**
     * Xóa hàng cuối
     * Created : LP(25/9)
     */
    removeRow() {
      if (this.rows.length > 0) {
        this.rows.pop();
      }
    },

    /**
     * HIển hị danh sách sở thích phục vụ
     * Created : LP(23/9)
     */
    showAll() {
      this.show = true;
    },

    /**
     * Chọn ô khác
     * Created : LP(25/9)
     */
    choose(i, j) {
      this.$refs[`col${i}${j}_text`][0].classList = "txt td-inactive";
      if (this.x != null && this.y != null && (this.x != i || this.y != j)) {
        this.$refs[`col${this.x}${this.y}_text`][0].classList = "txt td-active";
      }
      this.x = i;
      this.y = j;

      if(this.x != null && this.y != null){
        this.classBtnRemove = "default";
      }


      this.$emit("export", this.rows);
    },

    /**
     * Tìm dịch vụ theo id
     * KO
     */
    getServiceAdditionById(id) {
      let i = this.serviceAdditions.findIndex(function (item) {
        return item.Id == id;
      });
      this.item =
        i == -1
          ? { NameServiceAddition: null, PriceServiceAddition: 0, Id: null }
          : this.serviceAdditions[i];
    },

    /**
     * Click ra ngoài
     * Created : LP(28//9)
     */
    hideControl(event) {
      if (!this.$el.contains(event.target)) {
        if(this.x != null && this.y != null) this.$refs[`col${this.x}${this.y}_text`][0].classList = "txt td-active";
        this.x = null;
        this.y = null;
        this.classBtnRemove = "disabled";
      }
    },
  },
};
</script>

<style scoped>
@import "../../styles/own-css/table2.css";
</style>