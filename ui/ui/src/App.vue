<template>
  <div id="app" class="d-flex-col">
    <Header v-if="true"></Header>
    <div class="container d-flex" v-if="true">
      <Navbar></Navbar>
      <Content v-if="true"></Content>
    </div>

    <!-- <Button :text="'Hủy bỏ'" :position="'0 -1968px'" @click="sayHelloWorld">
    </Button>
    <br />
    <SelectBox
      v-if="true"
      :required="false"
      :displayName="'Danh mục'"
      :value="category"
      @selected="
        (value) => {
          this.category = value;
        }
      "
      :type="'autocomplete'"
      :isGroupControl="true"
      :tabindex="'1'"
      :refName="'unit'"
      :position="'0 -960px'"
    ></SelectBox>

    <br />
    <Context
      v-if="true"
      :displayName="'Tìm kiếm soos'"
      :type="'number'"
      @selected="
        (value) => {
          this.filter = value;
        }
      "
    ></Context>

    <br />

    <UploadFile></UploadFile>

    <input
      type="file"
      accept="image/jpg,image/png,image/jpeg,image/gif"
      ref="avatar"
      @click="log"
    /> -->
  </div>
</template>

<script>
// import Button from "./components/base/BaseButton.vue";
// import SelectBox from "./components/base/BaseSelectBox.vue";
// import Context from "./components/base/BaseContext.vue";
// import UploadFile from "./components/base/BaseUploadFile.vue";
import Header from "./components/layout/TheHeader.vue";
import Navbar from "./components/layout/TheNavbar.vue";
import Content from "./components/layout/TheContent.vue";
export default {
  name: "App",
  components: {
    // Button, SelectBox, Context, UploadFile
    Header,
    Navbar,
    Content,
  },
  data() {
    return {
      category: "option2",
      filter: "",
    };
  },

  mounted() {},
  methods: {
    sayHelloWorld() {
      alert("hello world");
    },
  },
};
</script>

<style>
@import "./styles/main.css";
</style>
