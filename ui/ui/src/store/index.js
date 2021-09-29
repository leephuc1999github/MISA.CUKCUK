import Vue from 'vue'
import Vuex from 'vuex'
import * as data from './data'
import axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    HOST_URL: data.HOST_URL,
    API_URL: data.API_URL,
    branches: data.BRANCHES,
    languages: data.LANGUAGES,
    sizeOnPage: data.SIZE_ON_PAGE,
    inventoryItems: [],
    inventoryItem: null,
    serviceAdditions: data.SERVICE_ADDITIONS,
    isResize: false,
    inventoryItemId: null,
    feature: data.TYPE_FEATURE,
    openningForm: false,
    inventoryItemGroups: null,
    units: null,
    pageSize: "25",
    pageIndex: "1",
    allPage: "0",
    allRecord: "0",
    places: data.PROCESSING_IN,
    filters: [],
    isLoading: false,
    sizeCurrentPage: 0,
    services: null,
    urlImage: null,
  },

  getters: {
    branches: state => state.branches,
    languages: state => state.languages,
    sizeOnPage: state => state.sizeOnPage,
    inventoryItems: state => state.inventoryItems,
    serviceAdditions: state => state.serviceAdditions,
    isResize: state => state.isResize,
    API_URL: state => state.API_URL,
    inventoryItemId: state => state.inventoryItemId,
    feature: state => state.feature,
    inventoryItem: state => state.inventoryItem,
    openningForm: state => state.openningForm,
    inventoryItemGroups: state => state.inventoryItemGroups,
    units: state => state.units,
    pageIndex: state => state.pageIndex,
    pageSize: state => state.pageSize,
    allPage: state => state.allPage,
    places: state => state.places,
    filters: state => state.filters,
    isLoading: state => state.isLoading,
    allRecord: state => state.allRecord,
    sizeCurrentPage: state => state.sizeCurrentPage,
    services: state => state.services,
    urlImage: state => state.urlImage,
  },

  mutations: {
    SET_IS_RESIZE(state, payload) {
      state.isResize = payload;
    },
    SET_ID(state, payload) {
      state.inventoryItemId = payload;
    },
    SET_FEATURE(state, payload) {
      state.feature = payload;
    },
    SET_DEFAULT_INVENTORY_ITEM(state) {
      state.inventoryItem = null;
      state.urlImage = "https://localhost:44379/images/inventory-item/f97161f9-a510-4fec-9e06-796cb2521e69.png";
    },
    SET_INVENTORY_ITEM(state, payload) {
      state.inventoryItem = payload;
    },
    SET_OPENNING_FORM(state, payload) {
      state.openningForm = payload;
    },
    SET_PAGE_INDEX(state, payload) {
      state.pageIndex = payload;
    },
    SET_PAGE_SIZE(state, payload) {
      state.pageSize = payload;
    },
    SET_ALL_PAGE(state, payload) {
      state.allPage = payload;
    },
    SET_FILTERS(state, payload) {
      state.filters = payload;
    },
    SET_IS_LOADING(state, payload) {
      state.isLoading = payload;
    },
    SET_FILTER(state, payload) {
      state.filters = payload;
    },
    SET_URL_IMAGE(state, payload){
      state.urlImage = payload;
    },
    SET_SERVICES(state, payload){
      state.services = payload;
    }
  },

  actions: {
    /**
     * Lấy danh sách món ăn / phân trang
     * Created : 26/9
     * @param {} param0 
     */
    pullInventoryItems({ state, commit }) {
      try {
        // bắt đầu tải dữ liệu
        state.isLoading = true;
        // lấy dữ liệu từ server
        axios.post(state.API_URL + 'inventoryitems/paging?pageIndex=' + state.pageIndex + "&pageSize=" + state.pageSize, state.filters).then(function (response) {
          let data = response.data;
          // console.log(data);
          // dữ liệu trống
          if (data.ResultCode == 204) {
            state.inventoryItems = [];
          } else {
            state.inventoryItems = data.Data.Data;
            state.allPage = data.Data.TotalPage;
            state.allRecord = data.Data.TotalRecord;
            state.sizeCurrentPage = state.inventoryItems.length;
            commit("SET_ID", state.inventoryItems[0].IdInventoryItem);
          }
          // tải dữ liệu xong
          state.isLoading = false;

        }).catch(function (error) {
          console.log("pullInventoryItems".concat(error));
        })

      } catch (error) {
        console.log("pullInventoryItems".concat(error));
      }

    },

    /**
     * Lấy món ăn theo id
     * Created : LP(26/9)
     * @param {*} param0 
     */
    pullInventoryItem({ state, commit, dispatch }) {
      try {
        state.isLoading = true;

        axios.get(state.API_URL + 'inventoryitems/' + state.inventoryItemId).then(function (response) {
          let data = response.data;
          dispatch("pullServicesAdditionsByInventoryItemId");
          commit("SET_INVENTORY_ITEM", data.Data);
          // dữ liệu trống
          if (data.ResultCode == 204) {
            commit("SET_INVENTORY_ITEM", null);
          }else{
            if(data.Data.UrlPicture != null) commit("SET_URL_IMAGE", state.HOST_URL +  data.Data.UrlPicture);
          }
          state.isLoading = false;
        }).catch(function (error) {
          console.log("pullInventoryItem".concat(error));
        })
      } catch (error) {
        console.log("pullInventoryItem".concat(error));
      }
    },

    /**
     * Lấy ds nhóm thực đơn
     * Created : LP(26/9)
     * @param {*} param0 
     */
    pullInventoryItemGroups({ state }) {
      try {
        axios.get(state.API_URL + 'inventoryitemgroups/').then(function (response) {
          let data = response.data;
          // dữ liệu trống
          if (data.ResultCode == 204) {
            state.inventoryItemGroups = [];
          } else {
            state.inventoryItemGroups = data.Data.map((element) => {
              return { Id: element.IdInventoryItemGroup, Name: element.NameInventoryItemGroup };
            });
          }
        }).catch(function (error) {
          console.log("pullInventoryItem".concat(error));
        })
      } catch (error) {
        console.log("pullInventoryItem".concat(error));
      }
    },


    /**
     * Lây danh sách đơn vị
     * Created : LP(26/9)
     * @param {*} param0 
     */
    pullUnits({ state }) {
      try {
        axios.get(state.API_URL + 'units/').then(function (response) {
          let data = response.data;

          // dữ liệu trống
          if (data.ResultCode == 204) {
            state.units = [];
          } else {
            state.units = data.Data.map((element) => {
              return { Name: element.NameUnit, Id: element.IdUnit };
            });
          }
        }).catch(function (error) {
          console.log("pullUnits".concat(error));
        })
      } catch (error) {
        console.log("pullUnits".concat(error));
      }
    },


    /**
     * Lấy ds dịch vụ thêm
     * Created : LP(26/9)
     * @param {*} param0 
     */
    pullServiceAdditions({ state }) {
      try {
        axios.get(state.API_URL + 'serviceadditions/').then(function (response) {
          let data = response.data;
          if (data.ResultCode == 204) {
            state.serviceAdditions = [];
          } else {
            state.serviceAdditions = data.Data.map((item) => {
              return { NameServiceAddition: item.NameServiceAddition, PriceServiceAddition: item.PriceServiceAddition, Id: item.IdServiceAddition };
            });
          }
        }).catch(function (error) {
          console.log("pullServiceAdditions".concat(error));
        })
      } catch (error) {
        console.log("pullServiceAdditions".concat(error));
      }
    },

    /**
     * Lấy dịch vụ theo món ăn
     * Created : LP(26/9)
     * @param {*} param0 
     */
    pullServicesAdditionsByInventoryItemId({ state, commit }) {
      try {
        axios.get(state.API_URL + `serviceadditions/filter?inventoryItemId=${state.inventoryItemId}`).then(function (response) {
          let data = response.data;
          if (data.ResultCode == 204) {
            state.services = [];
          } else {
            state.services = data.Data.map((item) => {
              return { NameServiceAddition: item.NameServiceAddition, PriceServiceAddition: item.PriceServiceAddition, Id: item.IdServiceAddition };
            });
          }
          commit("SET_OPENNING_FORM", true);

        }).catch(function (error) {
          console.log("pullServiceAdditions".concat(error));
        })
      } catch (error) {
        console.log("pullServiceAdditions".concat(error));
      }
    }

  }
})

