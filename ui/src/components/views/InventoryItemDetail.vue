<template>
  <Form
    :titleName="titleForm"
    :width="750"
    :height="600"
    @close="$emit('closeForm', typeCloseForm.CLOSE)"
    @yesDialog="handleSave(typeSave.SAVE)"
    @noDialog="$emit('closeForm', typeCloseForm.CANCLE)"
  >
    <template v-slot:content>
      <div class="tabs">
        <div class="tab-head">
          <a :class="tabName == 'ttc' ? 'active' : ''" @click="choose('ttc')"
            >Thông tin chung</a
          >
          <a :class="tabName == 'stpv' ? 'active' : ''" @click="choose('stpv')"
            >Sở thích phục vụ</a
          >
        </div>
        <div class="tab-content">
          <div
            class="d-flex inventory-item-form"
            v-show="tabName == 'ttc' ? true : false"
          >
            <div class="left">
              <div class="row">
                <div class="label-site">
                  <label for="Tên món">
                    Tên món
                    <span style="color: red">(*)</span>
                  </label>
                </div>

                <Input
                  :displayName="'Tên món'"
                  :required="true"
                  :type="'text'"
                  :showError="flagName"
                  @error="
                    (value) => {
                      flagName = value;
                    }
                  "
                  @tab="
                    (value) => {
                      countTab = value;
                    }
                  "
                  v-model="model.NameInventoryItem"
                  :customClassName="'name-site'"
                  :refName="'NameInventoryItem'"
                  :tabindex="1"
                ></Input>
              </div>
              <div class="row" v-if="true">
                <div class="label-site">
                  <label for="Mã món">
                    Mã món
                    <span style="color: red">(*)</span>
                  </label>
                </div>

                <Input
                  :displayName="'Mã món'"
                  :required="true"
                  :customClassName="'code-site'"
                  :showError="flagCode"
                  @error="
                    (value) => {
                      flagCode = value;
                    }
                  "
                  @tab="
                    (value) => {
                      countTab = value;
                    }
                  "
                  :type="'text'"
                  :refName="'CodeInventoryItem'"
                  v-model="model.CodeInventoryItem"
                  :tabindex="2"
                ></Input>
              </div>

              <div class="row" v-if="true">
                <div class="label-site">
                  <label for="Nhóm thực đơn">Nhóm thực đơn</label>
                </div>
                <SelectBox
                  v-if="true"
                  :customClassName="'category-site'"
                  :required="false"
                  :displayName="'Nhóm thực đơn'"
                  :typeSelectBox="'autocomplete'"
                  :isGroupControl="true"
                  :nameControl="'inventoryItemGroupId'"
                  :tabindex="3"
                  :dataOptions="{
                    DisplayColumn: 'Name',
                    IsShowTitle: false,
                    ColumnTitles: [
                      { Code: 'Name', Name: 'Tên cột', Width: 100 },
                    ],
                    DataRows: inventoryItemGroups,
                  }"
                  :valueSelected="model.InventoryItemGroupId"
                  :groupControls="[
                    {
                      NameControl: 'Thêm mới',
                      CustomClassName: 'add-group-ii-btn',
                    },
                  ]"
                  @selected="
                    (value) => {
                      model.InventoryItemGroupId = value;
                    }
                  "
                ></SelectBox>
              </div>

              <div class="row" v-if="true">
                <div class="label-site">
                  <label for="Đơn vị tính"
                    >Đơn vị tính <span style="color: red">(*)</span></label
                  >
                </div>

                <SelectBox
                  v-if="true"
                  :customClassName="'unit-site'"
                  :required="false"
                  :displayName="'Đơn vị tính'"
                  :typeSelectBox="'autocomplete'"
                  :showError="flagUnit"
                  @error="
                    (value) => {
                      flagUnit = value;
                    }
                  "
                  :nameControl="'unitId'"
                  :valueSelected="model.UnitId"
                  :tabindex="4"
                  :groupControls="[
                    {
                      NameControl: 'Thêm mới',
                      CustomClassName: 'add-group-ii-btn',
                    },
                  ]"
                  :isGroupControl="true"
                  :dataOptions="{
                    DisplayColumn: 'Name',
                    IsShowTitle: false,
                    ColumnTitles: [
                      { Code: 'Name', Name: 'Tên cột', Width: 100 },
                    ],
                    DataRows: units,
                  }"
                  @selected="
                    (value) => {
                      model.UnitId = value;
                    }
                  "
                ></SelectBox>
              </div>

              <div class="row" v-if="true">
                <div class="label-site">
                  <label for="Giá bán">
                    Giá bán<span style="color: red">(*)</span>
                  </label>
                </div>
                <money
                  v-model="model.Price"
                  v-bind="number"
                  id="input-number"
                  :tabindex="5"
                ></money>
              </div>

              <div class="row" v-if="true">
                <div class="label-site">
                  <label for="Tên món"> Giá vốn </label>
                </div>
                <money
                  v-model="model.OriginalPrice"
                  v-bind="number"
                  id="input-number"
                  :tabindex="6"
                ></money>
              </div>

              <div class="row" v-if="true">
                <div class="label-site">
                  <label for="Mô tả">Mô tả</label>
                </div>
                <textarea
                  class="description-site"
                  v-model="model.DescriptionInventoryItem"
                  tabindex="7"
                ></textarea>
              </div>

              <div class="row" v-if="true">
                <div class="label-site">
                  <label for="Chế biến tại">Chế biến tại</label>
                </div>
                <SelectBox
                  v-if="true"
                  :customClassName="'processing-in-site'"
                  :required="false"
                  :displayName="'Chế biến tại'"
                  :typeSelectBox="'autocomplete'"
                  :isGroupControl="false"
                  :valueSelected="model.ProcessingIn"
                  :nameControl="'processingIn'"
                  :tabindex="8"
                  :dataOptions="places"
                  @selected="
                    (value) => {
                      model.ProcessingIn = value;
                    }
                  "
                ></SelectBox>
              </div>

              <div class="row" v-if="true">
                <div class="label-site">
                  <label for=""></label>
                </div>
                <input type="checkbox" v-model="inActive" tabindex="9" /> Không
                hiển thị trên thực đơn
              </div>
            </div>
            <div class="right">
              <div class="box">
                <UploadFile
                  :image="urlImage"
                  @file="
                    (value) => {
                      avatar = value;
                    }
                  "
                ></UploadFile>
              </div>
            </div>
          </div>
          <div
            class="service-addition"
            v-show="tabName == 'stpv' ? true : false"
          >
            <span class="name-site"
              >Món ăn :
              <input type="text" readonly v-model="model.NameInventoryItem"
            /></span>
            <div class="notification-site d-flex align-items-c pt-8">
              <div class="info-icon"></div>
              <span
                >Ghi lại các sở thích của khách hàng giúp nhân viên phục vụ chọn
                nhanh order.<br />
                VD: không cay/ít hành/thêm phomai...</span
              >
            </div>
            <div class="pt-8">
              <Table2
                v-if="true"
                :thead="titlesTable"
                :tbody="services"
                @export="
                  (value) => {
                    SET_SERVICES(value);
                  }
                "
              ></Table2>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <!-- Nút giúp -->
      <Button
        :displayName="'Giúp'"
        :typeButton="'disabled'"
        :customIconClass="'help-icon'"
        v-if="true"
      ></Button>
      <!-- END Nút giúp -->

      <div class="ml-auto"></div>

      <!-- Nút cất -->
      <Button
        :displayName="'Cất'"
        :typeButton="'default'"
        :customIconClass="'save-btn'"
        :customButtonId="'save-btn'"
        @click="handleSave(typeSave.SAVE)"
        :shortkey="['ctrl', 's']"
        :titleName="'Cất(Ctrl + S)'"
        v-if="true"
      ></Button>
      <!-- END Nút cất -->

      <!-- Nút cất và thêm  -->
      <Button
        :displayName="'Cất & Thêm'"
        :typeButton="'default'"
        :customIconClass="'save-add-btn'"
        :customButtonId="'save-add-btn'"
        @click="handleSave(typeSave.SAVE_ADD)"
        :shortkey="['ctrl', 'shift', 's']"
        :titleName="'Cất & Thêm(Ctrl + Shift + S)'"
        v-if="true"
      ></Button>
      <!-- END Nút cất và thêm -->

      <!-- Nút hủy bỏ -->
      <Button
        v-if="true"
        :displayName="'Hủy bỏ'"
        :typeButton="'default'"
        :customIconClass="'cancle-btn'"
        @click="$emit('closeForm', typeCloseForm.CANCLE)"
        :shortkey="['ctrl', 'b']"
        :titleName="'Hủy bỏ(Ctrl + B)'"
      ></Button>
      <!-- END Nút hủy bỏ -->
    </template>
  </Form>
</template>

<script>
import Form from "../base/BaseForm.vue";
import Button from "../base/BaseButton.vue";
import Input from "../base/BaseInput.vue";
import SelectBox from "../base/BaseSelectBox.vue";
import UploadFile from "../base/BaseUploadFile.vue";
import Table2 from "../base/BaseTable2.vue";
import { mapGetters, mapMutations } from "vuex";
import * as Resource from "../../store/resource";
import { Money } from "v-money";
import axios from "axios";
import Common from "../../common";
export default {
  components: {
    Form,
    Button,
    Input,
    SelectBox,
    UploadFile,
    Table2,
    Money,
  },
  props: ["type"],
  data() {
    return {
      countTab: 0,

      flagUnit: false,
      flagName: false,
      flagCode: false,
      titleForm: "Thêm mới",
      tabName: "ttc",
      titlesTable: Resource.THEAD_TABLE_SERVICE_ADDITION,
      model: null,
      inActive: false,

      avatar: null,

      typeForm: Resource.TYPE_FORM,
      typeSave: Resource.TYPE_SAVE,
      typeCloseForm: Resource.TYPE_CLOSE_FORM,

      number: {
        decimal: ",",
        thousands: ".",
        precision: 0,
        masked: false,
      },
    };
  },
  computed: {
    ...mapGetters([
      "languages",
      "serviceAdditions",
      "inventoryItem",
      "inventoryItemGroups",
      "units",
      "places",
      "services",
      "API_URL",
      "urlImage",
      "inventoryItemId",
    ]),
  },
  created() {
    switch (this.type) {
      case "edit":
        this.titleForm = "Sửa món";
        break;
      default:
        this.titleForm = "Thêm món";
        break;
    }

    this.model = this.inventoryItem;
    if (this.inventoryItem == null) {
      this.resetForm();
      this.inActive = !this.model.Active;
    }

    if (this.type == Resource.TYPE_FORM.CLONE) {
      this.newCodeInventoryItem();
    }
  },
  mounted() {},
  watch: {
    countTab() {
      if (this.countTab == 2) {
        if (Common.isNullOrUndefined(this.model.CodeInventoryItem))
          this.newCodeInventoryItem();
      }
    },
  },
  methods: {
    ...mapMutations([
      "SET_OPENNING_FORM",
      "SET_DEFAULT_INVENTORY_ITEM",
      "SET_SERVICES",
    ]),

    /**
     * Sinh mã
     * Created : LP()
     */
    newCodeInventoryItem() {
      if (this.model.NameInventoryItem != null) {
        let self = this;
        let code = this.model.NameInventoryItem.replace(
          /\s/g,
          ""
        ).toUpperCase();
        code = Common.removeVietnameseTones(code);
        let url =
          this.API_URL +
          `inventoryitems/newcode?columnName=CodeInventoryItem&value=${code}&id=${this.inventoryItemId}`;
        if (
          this.type == Resource.TYPE_FORM.ADD ||
          this.type == Resource.TYPE_FORM.CLONE
        ) {
          url =
            this.API_URL +
            `inventoryitems/newcode?columnName=CodeInventoryItem&value=${code}`;
        }
        try {
          axios.get(url).then(function (response) {
            self.model.CodeInventoryItem = response.data.Data;
          });
        } catch (error) {
          console.log("newCodeInventoryItem".concat(error));
        }
      }
    },

    /**
     * Reset form
     * Crewated : LP
     */
    resetForm() {
      this.model = {
        IdInventoryItem: null,
        CodeInventoryItem: null,
        NameInventoryItem: null,
        Price: 0,
        OriginalPrice: 0,
        DescriptionInventoryItem: null,
        UnitId: null,
        InventoryItemGroupId: null,
        ProcessingIn: null,
        Active: 1,
        PictureId: null,
      };
    },
    /*
     * Xử lý nút lưu
     * Created : 27/9
     */
    handleSave(typeSave) {
      if (
        this.model.NameInventoryItem == "" ||
        this.model.NameInventoryItem == "" ||
        this.model.NameInventoryItem == null
      ) {
        this.flagName = true;
      }
      if (
        this.model.CodeInventoryItem == "" ||
        this.model.CodeInventoryItem == "" ||
        this.model.CodeInventoryItem == null
      ) {
        this.flagCode = true;
      }
      if (
        this.model.UnitId == "" ||
        this.model.UnitId == "" ||
        this.model.UnitId == null
      ) {
        this.flagUnit = true;
      }
      if (!this.flagName && !this.flagCode && !this.flagUnit) {
        try {
          this.model.Active = this.inActive ? 0 : 1;
          this.model.PictureId = this.avatar == null ? null : this.model.PictureId;

          delete this.model.IdInventoryItem;
          let formData = new FormData();
          formData.append("file", this.avatar);
          formData.append("data", JSON.stringify(this.model));
          formData.append(
            "service",
            JSON.stringify(
              this.services.map(function (item) {
                return {
                  NameServiceAddition: item.NameServiceAddition,
                  PriceServiceAddition: item.PriceServiceAddition,
                  IdServiceAddition: item.Id,
                };
              })
            )
          );

          let urlApi = this.API_URL;

          if (
            this.type == Resource.TYPE_FORM.ADD ||
            this.type == Resource.TYPE_FORM.CLONE
          ) {
            urlApi += "inventoryitems/insert";
            delete this.model.IdInventoryItem;
            this.insertInventoryItem(urlApi, formData, typeSave);
          }

          if (this.type == Resource.TYPE_FORM.EDIT) {
            urlApi += "inventoryitems/edit/" + this.inventoryItemId;
            this.editInventoryItem(urlApi, formData, typeSave);
          }
        } catch (error) {
          console.log("save".concat(error));
        }
      }
    },

    /**
     * Chỉnh sửa món ăn
     * Created : LP(27/9)
     */
    editInventoryItem(urlApi, formData, typeSave) {
      let self = this;
      try {
        axios
          .put(urlApi, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(function (response) {
            self.$emit("resultForm", response);
            if (typeSave == self.typeSave.SAVE) {
              self.SET_OPENNING_FORM(false);
            }
            self.SET_DEFAULT_INVENTORY_ITEM();
            self.SET_SERVICES(null);
            self.resetForm();
            self.titleForm = "Thêm món";
          })
          .catch(function (error) {
            console.log("save".concat(error));
          });
      } catch (error) {
        console.log("save".concat(error));
      }
    },

    /**
     * Thêm mới món ăn
     * Created : LP(27/9)
     */
    insertInventoryItem(urlApi, formData, typeSave) {
      let self = this;
      try {
        axios
          .post(urlApi, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(function (response) {
            self.$emit("resultForm", response);
            if (typeSave == self.typeSave.SAVE) {
              self.SET_OPENNING_FORM(false);
            }
            self.SET_DEFAULT_INVENTORY_ITEM();
            self.SET_SERVICES(null);
            self.resetForm();
            self.titleForm = "Thêm món";
          })
          .catch(function (error) {
            console.log("save".concat(error));
          });
      } catch (error) {
        console.log("save".concat(error));
      }
    },

    /**
     * Chọn tab
     * Created : 27/9
     */
    choose(tabName) {
      this.tabName = tabName;
    },

    /**
     * Log dữ liệu
     * Created : 27/9
     */
    log(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped>
@import "../../styles/view-css/inventory-item-form.css";
</style>