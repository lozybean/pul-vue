<template>
  <el-container direction="vertical">
    <Header></Header>
    <el-main>
      <el-container>
        <el-card
          shadow="never"
          class="box-card"
          style="width: 100%; min-height: 500px; text-align: center"
        >
          <el-row style="margin-top: 20px; width: 100%">
            <el-col :span="24">
              <div v-if="!init" align="center" class="grid-content">
                <p v-html="message" style="width: 88%; text-align: left"></p>
              </div>
              <div v-if="!init" align="center" class="grid-content">
                <el-card
                  class="box-card"
                  style="width: 88%; text-align: center"
                >
                  <PulTable :get-data="getData" key="draw_count"></PulTable>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-container>
    </el-main>
    <Footer></Footer>
  </el-container>
</template>

<style>
.el-input-group__prepend {
  min-width: 85px;
}
</style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import PulTable from "@/components/PulTable.vue";

export default {
  name: "BrowseTable",
  components: {
    Header,
    Footer,
    PulTable,
  },
  data() {
    return {
      init: false,
      draw_count: 0,
      value: "",
      message: "",
    };
  },
  methods: {
    getData: function (page_no, page_len, sort_col, sort_order) {
      var api = "/api/query";

      // 生成搜索参数
      var params = {};
      var field = this.$route.params.field;
      var term = this.$route.params.value.toLowerCase();
      if (field == "polysaccharide") {
        params = {
          option: "search_by_pul_type",
          val_pul_type: term,
          page_no,
          page_len,
        };
      } else if (field == "phylum") {
        params = {
          option: "search_by_linage",
          val_phylum: term,
          page_no,
          page_len,
        };
      }
      // 添加排序选项
      if (sort_col != null && sort_order != null) {
        params["sort_col"] = sort_col;
        params["sort_order"] = sort_order;
      }

      var self = this;

      return this.axios
        .post(api, params)
        .then(function (response) {
          //console.log(response);
          if (response["data"]["status"] == "OK") {
            self.message =
              '<strong style="color: orange;">' +
              response["data"]["data"]["total"] +
              "</strong> results are found";
            return response["data"];
          } else if (response["data"]["status"] == "WARNING") {
            self.message =
              '<strong style="color: orange;">' +
              response["data"]["data"]["total"] +
              "</strong> results are found. " +
              response["data"]["msg"];
            return response["data"];
          } else {
            console.log("[ERROR] query msg: " + response["data"]["msg"]);
            self.message = response["data"]["msg"];
            return response["data"];
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
