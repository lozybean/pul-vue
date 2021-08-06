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
            <el-col :span="12">
              <div align="center" class="grid-content">
                <el-card
                  class="box-card"
                  style="width: 88%; text-align: left; min-height: 400px"
                >
                  <div slot="header" class="clearfix">
                    <strong>Polysaccharide</strong>
                  </div>
                  <div>
                    <p v-for="item in data.polysaccharide" :key="item.name">
                      {{ item.name }}
                      <a
                        :href="'/browse/polysaccharide/' + item.name"
                        target="_blank"
                      >
                        <strong style="color: green">{{ item.count }}</strong>
                      </a>
                      PULs
                    </p>
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-col :span="12">
              <div align="center" class="grid-content">
                <el-card
                  class="box-card"
                  style="width: 88%; text-align: left; min-height: 400px"
                >
                  <div slot="header" class="clearfix">
                    <strong>Phylum</strong>
                  </div>
                  <div>
                    <p v-for="item in data.phylum" :key="item.name">
                      {{ item.name }}
                      <a :href="'/browse/phylum/' + item.name" target="_blank">
                        <strong style="color: green">{{ item.count }}</strong>
                      </a>
                      PULs
                    </p>
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
  name: "Browse",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      data: {},
    };
  },
  methods: {
    getData: function () {
      var api = "/api/browse";
      var self = this;

      return this.axios
        .get(api)
        .then(function (response) {
          //console.log(response);
          if (response["data"]["status"] == "OK") {
            self.data = response["data"]["data"];
            //console.log(self.data);
          } else {
            console.log("[ERROR] query msg: " + response["data"]["msg"]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>
