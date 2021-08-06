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
              <div align="center" class="grid-content">
                <el-card class="box-card" style="width: 90%; text-align: left">
                  <div slot="header" class="clearfix">
                    <strong>PUL information</strong>
                  </div>
                  <div>
                    <p>
                      <strong>Taxonomy</strong>:
                      <span
                        >{{ data.kingdom }} / {{ data.phylum }} /
                        {{ data.class }} / {{ data.order }} /
                        {{ data.family }}</span
                      >
                    </p>
                  </div>
                  <div>
                    <el-table :data="pul_info" border style="width: 100%">
                      <el-table-column fixed prop="pul_type" label="PUL Type">
                      </el-table-column>
                      <el-table-column prop="pul_id" label="PUL ID">
                      </el-table-column>
                      <el-table-column
                        prop="assembly_accession"
                        label="GCF Number"
                      >
                      </el-table-column>
                      <el-table-column prop="taxonomy_id" label="Taxonomy ID">
                      </el-table-column>
                      <el-table-column
                        prop="assembly_level"
                        label="Assembly Level"
                      >
                      </el-table-column>
                      <el-table-column prop="gene_count" label="Gene Number">
                      </el-table-column>
                      <el-table-column prop="pul_start" label="PUL Start">
                      </el-table-column>
                      <el-table-column prop="pul_end" label="PUL End">
                      </el-table-column>
                    </el-table>
                  </div>
                  <div>
                    <p>
                      <strong>Download</strong>:&nbsp;
                      <a :href="dl_dna_link" target="_blank">DNA</a>&nbsp;&nbsp;
                      <a :href="dl_protein_link" target="_blank">Protein</a
                      >&nbsp;&nbsp;
                      <a :href="dl_genbank_link" target="_blank">Genbank</a
                      >&nbsp;&nbsp;
                    </p>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>

          <el-row style="margin-top: 20px; width: 100%">
            <el-col :span="24">
              <div align="center" class="grid-content">
                <el-card class="box-card" style="width: 90%; text-align: left">
                  <div slot="header" class="clearfix" style="text-align: left">
                    <strong>PUL genes</strong>
                  </div>
                  <div v-if="show_gggenes" align="center" class="grid-content">
                    <img
                      v-bind:src="gggenes_base64"
                      style="width: 95%; height: 95%"
                    />
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>

          <el-row style="margin-top: 20px; width: 100%">
            <el-col :span="24">
              <div align="center" class="grid-content">
                <el-card
                  class="box-card"
                  style="width: 90%; text-align: center"
                >
                  <div slot="header" class="clearfix" style="text-align: left">
                    <strong>PUL content</strong>
                  </div>
                  <div>
                    <el-table :data="pul_content" border style="width: 100%">
                      <el-table-column
                        prop="gene_id"
                        label="Gene ID"
                        :width="width_150"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="gene_name"
                        label="Gene Name"
                        :width="width_200"
                      >
                      </el-table-column>
                      <el-table-column prop="domains" label="Domains">
                        <template slot-scope="scope">
                          <div v-html="scope.row.domains"></div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="gene_type"
                        label="Classification"
                        :width="width_200"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="gene_start"
                        label="Gene Start"
                        :width="width_100"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="gene_end"
                        label="Gene End"
                        :width="width_100"
                      >
                      </el-table-column>
                    </el-table>
                  </div>
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

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "PUL",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      data: {},
      pul_info: [],
      pul_content: [],
      gggenes_base64: "",
      show_gggenes: false,
      // Download
      dl_dna_link: "",
      dl_protein_link: "",
      dl_genbank_link: "",
      // Width
      width_100: "100px",
      width_200: "200px",
    };
  },
  methods: {
    getData: function () {
      var api = "/api";
      var self = this;

      return this.axios
        .get(api + "/" + this.$route.params.pul_id)
        .then(function (response) {
          //console.log(response);
          if (response["data"]["status"] == "OK") {
            self.data = response["data"]["data"];

            // 生成pul info数据, 只有一行
            self.pul_info.push({
              id: self.data["id"],
              pul_type: self.data["pul_type"],
              pul_id: self.data["id"],
              assembly_accession: self.data["assembly_accession"],
              taxonomy_id: self.data["taxonomy_id"],
              assembly_level: self.data["assembly_level"],
              gene_count: self.data.content.length,
              pul_start: self.data["pul_start"],
              pul_end: self.data["pul_end"],
            });

            for (var i = 0; i < self.data.content.length; i++) {
              var row = self.data.content[i];
              self.pul_content.push({
                gene_id: row["gene_id"],
                gene_name: row["gene_name"],
                gene_type: row["gene_type"],
                gene_start: row["gene_start"],
                gene_end: row["gene_end"],
                domains: row.domains.join("<br>"),
              });
            }

            // 同上，对download链接也有异步的问题
            self.dl_dna_link = self.dlDna();
            self.dl_protein_link = self.dlProtein();
            self.dl_genbank_link = self.dlGenbank();
          } else {
            console.log("[ERROR] query msg: " + response["data"]["msg"]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    plotGggense: function () {
      var api = "/api";
      var self = this;

      return this.axios
        .get(api + "/" + this.$route.params.pul_id + "/" + "gggenes")
        .then(function (response) {
          //console.log(response);
          if (response["data"]["status"] == "OK") {
            self.gggenes_base64 = response["data"]["data"]["base64"];
            self.show_gggenes = true;
          } else {
            console.log("[ERROR] query msg: " + response["data"]["msg"]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    dlData: function (suffix) {
      let id = this.pul_info[0].id;
      let pul_type = this.pul_info[0].pul_type;
      if (suffix == "genbank") {
        return `/static/media/release/genbank/${pul_type}/${id}.genbank`;
      } else {
        return `/static/media/release/${suffix}/${pul_type}/${id}_${suffix}.fasta`;
      }
    },
    dlDna: function () {
      return this.dlData("DNA");
    },
    dlProtein: function () {
      return this.dlData("protein");
    },
    dlGenbank: function () {
      return this.dlData("genbank");
    },
  },
  created() {
    console.log("> PUL ID: " + this.$route.params.pul_id);
    this.getData();
    this.plotGggense();
  },
};
</script>
