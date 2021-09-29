<template>
  <div class="inventory-item d-flex-col">
    <div class="title-site d-flex align-items-c">
      <div class="title">Thực đơn</div>
      <div class="ml-auto"></div>

      <!-- Nút phản hồi -->
      <Button
        v-if="true"
        :displayName="'Phản hồi'"
        :customIconClass="'feedback-btn'"
        :typeButton="'disabled'"
      ></Button>
      <!-- END Nút phản hồi -->
    </div>
    <div class="table-site">
      <div class="feature-site d-flex">
        <!-- Nút thêm mới -->
        <Button
          v-if="true"
          :displayName="'Thêm mới'"
          :titleName="'Thêm mới(Ctrl + 1)'"
          :customIconClass="'add-btn'"
          :typeButton="'default'"
          :customButtonId="'add-btn'"
          @click="workingForm(feature.ADD)"
          :shortkey="['ctrl', '1']"
        ></Button>
        <!-- END Nút thêm mới -->

        <!-- Nút nhân bản -->
        <Button
          v-if="true"
          :displayName="'Nhân bản'"
          :customButtonId="'clone-btn'"
          :typeButton="'default'"
          :customIconClass="'clone-btn'"
          @click="workingForm(feature.CLONE)"
        ></Button>
        <!-- END Nút nhân bản -->

        <!-- Nút sửa -->
        <Button
          v-if="true"
          :displayName="'Sửa'"
          :titleName="'Sửa(Ctrl + E)'"
          :customButtonId="'edit-btn'"
          @click="workingForm(feature.EDIT)"
          :typeButton="'default'"
          :shortkey="['ctrl', 'e']"
        ></Button>
        <!-- END Nút sửa -->

        <!-- Nút xóa -->
        <Button
          v-if="true"
          :displayName="'Xóa'"
          :titleName="'Xóa(Ctrl + D)'"
          :customButtonId="'delete-btn'"
          :typeButton="'default'"
          :customIconClass="'delete-btn'"
          :shortkey="['ctrl', 'd']"
          @click="confirmDelete"
        ></Button>
        <!-- END Nút xóa -->

        <!-- Nút nạp -->
        <Button
          v-if="true"
          :displayName="'Nạp'"
          :customButtonId="'load-btn'"
          :customIconClass="'load-btn'"
          :typeButton="'default'"
          @click="loadInventoryItem"
        ></Button>

        <!-- END Nút nạp -->
      </div>
      <div class="data-site">
        <Table1
          v-if="true"
          :thead="titlesTable"
          :tbody="inventoryItems"
          :className="isExpand ? 'expand' : ''"
          :hasControlHeader="true"
          :hasControlBody="false"
          @filter="
            (value) => {
              workingFilter(value);
            }
          "
          @choose="
            (value) => {
              SET_ID(value);
            }
          "
          @working="
            (value) => {
              workingForm(value);
            }
          "
        ></Table1>
      </div>
      <div class="pagination-site">
        <Pagination
          :sizeOnPage="sizeOnPage"
          :pageSize="pageSize"
          :pageIndex="pageIndex"
          :allRecord="allRecord"
          :allPage="allPage"
          :sizePage="sizeCurrentPage"
          @reload="
            () => {
              loadInventoryItem();
            }
          "
          @choose="
            (value) => {
              SET_PAGE_SIZE(value);
              SET_PAGE_INDEX(1);
              loadInventoryItem();
            }
          "
          @change="
            (value) => {
              SET_PAGE_INDEX(value);
              loadInventoryItem();
            }
          "
          v-if="true"
        ></Pagination>
      </div>
    </div>

    <div class="form-site">
      <InventoryItemDetail
        v-if="openningForm"
        :type="typeForm"
        @closeForm="
          (typeValue) => {
            closeForm(typeValue);
          }
        "
        @resultForm="
          (response) => {
            handleResultForm(response);
          }
        "
      ></InventoryItemDetail>
    </div>
    <Dialog
      v-if="showDialog"
      :content="contentDialog"
      :type="'delete'"
      @yes="deleteInventoryItem"
      @no="showDialog = false"
    ></Dialog>
    <Loading v-if="isLoading"></Loading>
  </div>
</template>

<script>
import Dialog from "../base/BaseDialog.vue";
import Table1 from "../base/BaseTable1.vue";
import Button from "../base/BaseButton.vue";
import Pagination from "../base/BasePagination.vue";
import InventoryItemDetail from "../views/InventoryItemDetail.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import EventBus from "../../eventBus";
import Common from "../../common";
import Loading from "../base/BaseLoading.vue";
import * as Resource from "../../store/resource";
import axios from "axios";
export default {
  components: {
    Table1,
    Button,
    Pagination,
    InventoryItemDetail,
    Loading,
    Dialog,
  },
  created() {
    EventBus.$on("toggle", () => {
      this.isExpand = !this.isExpand;
    });
    // this.SET_FILTER(this.filterObj);
    this.$store.dispatch("pullInventoryItems");
    this.$store.dispatch("pullUnits");
    this.$store.dispatch("pullInventoryItemGroups");
    this.$store.dispatch("pullServiceAdditions");
  },
  computed: {
    ...mapGetters([
      "sizeOnPage",
      "inventoryItems",
      "inventoryItemId",
      "feature",
      "openningForm",
      "pageIndex",
      "pageSize",
      "allPage",
      "isLoading",
      "allRecord",
      "sizeCurrentPage",
      "API_URL",
      "services"
    ]),
  },
  data() {
    return {
      contentDialog: null,
      showDialog: false,
      typeForm: null,
      isExpand: false,
      titlesTable: Resource.THEAD_TABLE_INVENTORY_ITEM,
      filterObj: [
        {
          NameProperty: "NameInventoryItem",
          Operator: "LIKE",
          KeySearch: null,
        },
        {
          NameProperty: "CodeInventoryItem",
          Operator: "LIKE",
          KeySearch: null,
        },

        {
          NameProperty: "NameUnit_FULLTEXT",
          Operator: "LIKE",
          KeySearch: null,
        },
        {
          NameProperty: "NameInventoryItemGroup_FULLTEXT",
          Operator: "LIKE",
          KeySearch: null,
        },
        {
          NameProperty: "Active",
          Operator: "=",
          KeySearch: null,
        },
        {
          NameProperty: "Price",
          Operator: "=",
          KeySearch: null,
        },
        {
          NameProperty: "HasMaterial",
          Operator: "=",
          KeySearch: null,
        },
        {
          NameProperty: "IsAutoChange",
          Operator: "=",
          KeySearch: null,
        },
        {
          NameProperty: "StoppedSell",
          Operator: "=",
          KeySearch: null,
        },
        {
          NameProperty: "TypeInventoryItem",
          Operator: "LIKE",
          KeySearch: null,
        },
        {
          NameProperty: "IsChangeByTime",
          Operator: "=",
          KeySearch: null,
        },
      ],
    };
  },
  mounted() {},
  methods: {
    ...mapMutations([
      "SET_ID",
      "SET_DEFAULT_INVENTORY_ITEM",
      "SET_DEFAULT_INVENTORY_ITEM_ID",
      "SET_OPENNING_FORM",
      "SET_PAGE_SIZE",
      "SET_PAGE_INDEX",
      "SET_FILTER",
      "SET_SERVICES"
    ]),
    ...mapActions([
      "pullInventoryItems",
      "pullInventoryItem",
      "pullUnits",
      "publlServiceAdditions",
      "pullInventoryItemGroups",
    ]),
    /**
     * Xóa món ăn theo id
     * Created : LP(27)
     */
    deleteInventoryItem() {
      let self = this;
      axios
        .delete(this.API_URL + `inventoryitems/${this.inventoryItemId}`)
        .then(function (response) {
          self.handleResultForm(response);
          self.showDialog = false;
        })
        .catch(function (error) {
          console.log("deleteInventoryitem".concat(error));
        });
    },

    /**
     * Xác nhận xóa món ăn
     * Created : 27/9
     */
    confirmDelete() {
      let self = this;
      let i = this.inventoryItems.findIndex(function (item) {
        return item.IdInventoryItem == self.inventoryItemId;
      });
      this.contentDialog = `Bạn có chắc chắn muốn xóa món <<${this.inventoryItems[i].CodeInventoryItem} - ${this.inventoryItems[i].NameInventoryItem}>> không?`;
      this.showDialog = true;
    },
    /**
     * Xử lý kết quả form
     * Created : LP(27/9)
     */
    handleResultForm(response) {
      switch (response.data.ResultCode) {
        case 200:
          this.$toast.success(response.data.UserMessage);
          break;
        case 500:
          this.$toast.error(response.data.UserMessage);
          break;
        case 201:
          this.$toast.success(response.data.UserMessage);
          break;
      }
      this.loadInventoryItem();
    },

    workingFilter(control) {
      this.filterObj.forEach((element) => {
        if (element.NameProperty == control.name) {
          element.Operator = control.operator;
          element.KeySearch = control.value;
        }
      });
      this.SET_FILTER(this.filterObj);
      this.loadInventoryItem();
    },

    /**
     * Tải lại dữ liệu
     * Created : LP(24/9)
     */
    loadInventoryItem() {
      this.$store.dispatch("pullInventoryItems");
    },

    /**
     * Thực hiện với form
     * Created : LP(24/9)
     */
    workingForm(type) {
      switch (type) {
        case this.feature.ADD:
          this.addInventoryItem();
          break;
        case this.feature.EDIT:
          this.editInventoryItem();
          break;
        case this.feature.CLONE:
          this.cloneInventoryItem();
          break;
        default:
          console.log("Không có tính năng này");
          break;
      }
    },

    /**
     * Nhân bản món ăn
     * Created: LP(24/9)
     */
    cloneInventoryItem() {
      try {
        if (!Common.isNullOrUndefined(this.inventoryItemId)) {
          this.$store.dispatch("pullInventoryItem");
          this.typeForm = this.feature.CLONE;
        }
      } catch (error) {
        console.log("cloneInventoryItem".concat(error));
      }
    },

    /**
     * THêm mới món ăn
     * Created: LP(24/9)
     */
    addInventoryItem() {
      try {
        if (this.inventoryItems.length > 0) {
          this.SET_ID(this.inventoryItems[0].IdInventoryItem);
        } else {
          this.SET_ID(null);
        }
        this.typeForm = this.feature.ADD;
        this.SET_OPENNING_FORM(true);
        this.SET_SERVICES(null);
      } catch (error) {
        console.log("addInventoryItem".concat(error));
      }
    },

    /**
     * Sửa món ăn
     * Created : LP(24/9)
     */
    editInventoryItem() {
      try {
        if (!Common.isNullOrUndefined(this.inventoryItemId)) {
          this.$store.dispatch("pullInventoryItem");
          this.typeForm = this.feature.EDIT;
        }
      } catch (error) {
        console.log("editInventoryItem".concat(error));
      }
    },

    /**
     * Đóng form
     * Created : 27/9
     */
    closeForm(typeValue) {
      if (typeValue == Resource.TYPE_CLOSE_FORM.CLOSE) {
        console.log("demo");
      } else {
        this.SET_OPENNING_FORM(false);
        this.SET_DEFAULT_INVENTORY_ITEM();
      }
    },
  },
};
</script>

<style scoped>
@import "../../styles/view-css/inventory-item.css";
</style>