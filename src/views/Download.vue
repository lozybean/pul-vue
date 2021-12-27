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
          <el-row type="flex" style="margin-top: 30px; width: 100%">
            <el-col :span="24">
              <div align="center" class="grid-content">
                <el-card class="box-card" style="width: 100%; text-align: left">
                  <div slot="header" class="clearfix">
                    <strong>Release</strong>
                  </div>
                  <div>
                    <el-collapse v-model="active_name_lst">
                      <el-collapse-item
                        title="Download all PUL data"
                        name="dowmload_all_pul_data"
                      >
                        <p>
                          <a href="/static/media/release/DNA_fasta.zip">DNA</a
                          >&nbsp;&nbsp;
                          <a href="/static/media/release/protein_fasta.zip"
                            >Protein</a
                          >&nbsp;&nbsp;
                          <a href="/static/media/release/genbank.zip">Genbank</a
                          >&nbsp;&nbsp;
                        </p>
                      </el-collapse-item>
                      <el-collapse-item
                        title="Download by polysaccharide"
                        name="dowmload_by_polysaccharide"
                      >
                        <p><a href="/static/media/release/agar.zip">Agar</a></p>
                        <p>
                          <a href="/static/media/release/alginate.zip"
                            >Alginate</a
                          >
                        </p>
                        <p>
                          <a href="/static/media/release/carrageenan.zip"
                            >Carrageenan</a
                          >
                        </p>
                        <p>
                          <a href="/static/media/release/beta-mannan.zip">Beta-Mannan</a>
                        </p>
                        <p>
                          <a href="/static/media/release/pectin.zip">Pectin</a>
                        </p>
                      </el-collapse-item>
                    </el-collapse>
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
  name: "Download",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      active_name_lst: ["dowmload_all_pul_data", "dowmload_by_polysaccharide"],
    };
  },
};
</script>
