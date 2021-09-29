<template>
  <div class="MISAContext">
    <div class="group-control">
      <!-- Nút chọn loại lọc -->
      <input
        type="text"
        v-model="operatorFilter"
        readonly
        @click.stop="showAll($event)"
      />
    </div>
    <!-- END Nút chọn loại lọc -->

    <!-- Dữ liệu lọc -->
    <money
      v-model="valueFilter"
      v-bind="number"
      v-if="typeDataFilter === typeData.NUMBER"
      class="searchbox number"
    ></money>
    <input
      type="text"
      class="searchbox string"
      v-model="valueFilter"
      v-else
      @keyup.enter="choose(currentOption)"
    />
    <!-- END Dữ liệu lọc -->

    <!-- DS Loại lọc -->
    <div class="data" v-if="show" :style="stylePosition">
      <div
        :class="currentOption === operator ? 'active' : ''"
        @click="choose(operator)"
        v-for="(operator, index) in operators"
        :key="index"
        class="option-item"
      >
        <div class="active-icon"></div>
        <span>{{ operator.DisplayText }}</span>
      </div>
    </div>
    <!-- END DS Loại lọc -->
  </div>
</template>

<script>
import { Money } from "v-money";
export default {
  props: ["displayName", "typeDataFilter", "nameContext"],
  components: {
    Money,
  },
  data() {
    return {
      // Cấu hình input dạng số
      number: {
        decimal: ",",
        thousands: ".",
        precision: 0,
        masked: false,
      },

      // Kiểu dữ liệu lọc
      typeData: {
        STRING: "string",
        NUMBER: "number",
      },
      // Trạng thái ds lọc
      show: false,

      // Biểu tượng lọc hiện tại
      operatorFilter: null,
      // Giá trị lọc
      valueFilter: null,
      // Loại lọc hiện tại
      currentOption: null,

      operators: [],

      optionsSearchString: [
        {
          Symbold: "∗",
          DisplayText: "∗:Chứa",
          Key: "like",
          Id: "contain",
        },
        {
          Symbold: "=",
          DisplayText: "=:Bằng",
          Key: "=",
          Id: "equal",
        },
        {
          Symbold: "+",
          DisplayText: "+:Bắt đầu bằng",
          Key: "like",
          Id: "startEqual",
        },
        {
          Symbold: "-",
          DisplayText: "-:Kết thúc bằng",
          Key: "like",
          Id: "endEqual",
        },
        {
          Symbold: "!",
          DisplayText: "!:Không chứa",
          Key: "not like",
          Id: "notContain",
        },
      ],
      optionsFilterNumber: [
        {
          Symbold: "=",
          DisplayText: "=:Bằng",
          Key: "=",
        },
        {
          Symbold: "≤",
          DisplayText: "≤:Nhỏ hơn hoặc bằng",
          Key: "<=",
        },
        {
          Symbold: "<",
          DisplayText: "<:Nhỏ hơn",
          Key: "<",
        },
        {
          Symbold: "≥",
          DisplayText: "≥:Lớn hơn hoặc bằng",
          Key: ">=",
        },
        {
          Symbold: ">",
          DisplayText: ">:Lớn hơn",
          Key: ">",
        },
      ],

      stylePosition: null,

      mousePointer: {
        x: 0,
        y: 0,
      },
    };
  },
  created() {
    if (this.typeDataFilter === this.typeData.NUMBER) {
      this.operators = this.optionsFilterNumber;
      this.valueFilter = 0;
    } else {
      this.operators = this.optionsSearchString;
    }
    // chọn option đầu
    if (this.operators.length > 0) {
      // gán giá trị để hiển thị
      this.operatorFilter = this.operators[0].Symbold;
      this.currentOption = this.operators[0];
    }
  },
  mounted() {
    document.addEventListener("click", this.hideOptions);
  },
  methods: {
    /**
     * Show all options
     * Author : LP(31/8)
     */
    showAll(event) {
      try {
        // xác định tọa độ trỏ chuột
        let target = event.currentTarget;
        let x = target.getBoundingClientRect().x;
        let y = target.getBoundingClientRect().y + 28;

        this.mousePointer.x = `${x}px`;
        this.mousePointer.y = `${y}px`;

        // css vị trí dữ liệu hiển thị
        this.stylePosition = {
          top: this.mousePointer.y,
          left: this.mousePointer.x,
        };

        // Đóng mở options
        this.show = !this.show;
      } catch (error) {
        console.log(this.nameContext.concat(error));
      }
    },

    /**
     * Choose loại tìm kiếm
     * Author : LP(31/7)
     */
    choose(operator) {
      try {
        // gán giá trị để hiển thị
        this.operatorFilter = operator.Symbold;
        this.currentOption = operator;

        let val = null;
        if (
          this.valueFilter == null ||
          this.valueFilter == "" ||
          this.valueFilter == "" ||
          typeof this.valueFilter == "undefined" ||
          this.valueFilter.length == 0
        ) {
          val = null;
          this.valueFilter = null;
        }
        if (this.typeDataFilter == this.typeData.STRING) {
          if (this.valueFilter != null) {
            switch (operator.Id) {
              case "contain":
                val = `'%${this.valueFilter}%'`;
                break;
              case "notContain":
                val = `'%${this.valueFilter}%'`;
                break;
              case "equal":
                val = `'${this.valueFilter}'`;
                break;
              case "startEqual":
                val = `'${this.valueFilter}%'`;
                break;
              case "endEqual":
                val = `'%${this.valueFilter}'`;
                break;
            }
          }
        } else {
          if (this.valueFilter == null) {
            val = this.valueFilter;
          } else {
            val = `${this.valueFilter}`;
          }
        }

        // gửi dữ liệu
        this.$emit("selected", {
          operator: operator.Key,
          value: val,
          name: this.nameContext,
        });

        // Đóng options
        this.show = false;
      } catch (error) {
        console.log(this.nameContext.concat(error));
      }
    },

    /**-------------------------------------------------------
     * Close data
     * Author : LP(28/8)
     */
    hideOptions(event) {
      if (!this.$el.contains(event.target)) {
        // đóng hiển thị dữ liệu khi đống control
        this.show = false;
      }
    },
  },
};
</script>

<style scoped>
@import "../../styles/own-css/context.css";
</style>