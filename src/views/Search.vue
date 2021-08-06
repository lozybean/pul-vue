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
          <el-row style="margin-top: 5px; width: 100%">
            <el-col :span="20" :offset="2">
              <div class="grid-content">
                <el-collapse v-model="active_name_lst">
                  <el-collapse-item
                    title="Search by PUL type"
                    name="search_by_pul_type"
                  >
                    <div @keyup.enter="query_by_pul_type">
                      <div style="text-align: left">
                        eg:
                        <i
                          >Agar, Alginate, Carrageenan, Chitin, Mannan,
                          Pectin</i
                        >
                      </div>
                      <el-input
                        placeholder=""
                        v-model="val_pul_type"
                        style="width: 100%"
                      >
                        <template slot="prepend">PUL type</template>

                        <el-button
                          slot="append"
                          icon="el-icon-search"
                          @click="query_by_pul_type"
                        ></el-button>
                      </el-input>
                    </div>
                  </el-collapse-item>

                  <el-collapse-item
                    title="Search by Taxonomy"
                    name="search_by_linage"
                  >
                    <div @keyup.enter="query_by_linage">
                      <div style="text-align: left">eg: <i>203122</i></div>
                      <el-input
                        placeholder=""
                        v-model="val_taxonomy_id"
                        style="width: 100%"
                      >
                        <template slot="prepend">Taxonomy ID</template>
                      </el-input>
                      <div style="text-align: left">
                        eg: <i>GCF_000013665</i>
                      </div>
                      <el-input
                        placeholder=""
                        v-model="val_assembly_accession"
                        style="width: 100%"
                      >
                        <template slot="prepend">GCF Number</template>
                      </el-input>
                      <div style="text-align: left">
                        eg: <i>Acetobacter cibinongensis</i>
                      </div>
                      <el-input
                        placeholder=""
                        v-model="val_species"
                        style="width: 100%"
                      >
                        <template slot="prepend">Species</template>
                      </el-input>
                      <div style="text-align: left">
                        eg:
                        <i
                          >Actinobacteria, Bacteroidetes, Firmicutes,
                          Proteobacteria</i
                        >
                      </div>
                      <el-input
                        placeholder=""
                        v-model="val_phylum"
                        style="width: 100%"
                      >
                        <template slot="prepend">Phylum</template>
                        <el-button
                          slot="append"
                          icon="el-icon-search"
                          @click="query_by_linage"
                        ></el-button>
                      </el-input>
                    </div>
                  </el-collapse-item>

                  <el-collapse-item
                    title="Search by domain name"
                    name="search_by_domain_name"
                  >
                    <div @keyup.enter="query_by_domain_name">
                      <div style="text-align: left">
                        eg: <i>ABC_tran, BPD_transp_1</i>
                      </div>
                      <el-input
                        placeholder=""
                        v-model="val_domain_name"
                        style="width: 100%"
                      >
                        <template slot="prepend">Domain name</template>
                        <el-button
                          slot="append"
                          icon="el-icon-search"
                          @click="query_by_domain_name"
                        ></el-button>
                      </el-input>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-col>
          </el-row>
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
  name: "Search",
  components: {
    Header,
    Footer,
    PulTable,
  },
  data() {
    return {
      init: true,
      draw_count: 0,
      value: "",
      message: "",
      // subtypes search
      active_name_lst: [
        "search_by_pul_type",
        "search_by_linage",
        "search_by_domain_name",
      ],
      active_name: "",
      val_pul_type: "",
      val_taxonomy_id: "",
      val_assembly_accession: "",
      val_species: "",
      val_phylum: "",
      val_domain_name: "",
    };
  },
  methods: {
    query: function (event) {
      if (event) {
        this.reloadPulTable();
      }
    },
    query_by_pul_type: function (event) {
      this.active_name = "search_by_pul_type";
      this.query(event);
    },
    query_by_linage: function (event) {
      this.active_name = "search_by_linage";
      this.query(event);
    },
    query_by_domain_name: function (event) {
      this.active_name = "search_by_domain_name";
      this.query(event);
    },
    getData: function (page_no, page_len, sort_col, sort_order) {
      var api = "/api/query";

      // 生成搜索参数
      var params = {};
      if (this.active_name == "search_by_pul_type") {
        params = {
          option: this.active_name,
          val_pul_type: this.val_pul_type,
          page_no,
          page_len,
        };
      } else if (this.active_name == "search_by_linage") {
        params = {
          option: this.active_name,
          val_taxonomy_id: this.val_taxonomy_id,
          val_assembly_accession: this.val_assembly_accession,
          val_species: this.val_species,
          val_phylum: this.val_phylum,
          page_no,
          page_len,
        };
      } else if (this.active_name == "search_by_domain_name") {
        params = {
          option: this.active_name,
          val_domain_name: this.val_domain_name,
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
    reloadPulTable: function () {
      // 初始化message
      this.message = "";
      // 移除组件
      this.init = true;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.init = false;
      });
    },
  },
};
</script>
