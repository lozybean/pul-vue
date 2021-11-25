<template>
  <el-container direction="vertical">
    <Header></Header>
    <el-main>
      <el-container>
        <el-card
          shadow="never"
          class="box-card"
          style="width: 100%; min-height: 500px; text-align: left"
        >
          <!-- <a @click="chooseFile"
            >choose genbank file (.gbff format) to predict</a
          > -->
          <input
            type="file"
            value=""
            id="file"
            accept=".fasta,.fa,.fas"
            @change="upload"
          />
          <el-button @click="chooseFile" id="upload-button">
            choose fasta file (.fasta format) to predict
          </el-button>
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
  name: "Predict",
  components: {
    Header,
    Footer,
  },
  methods: {
    chooseFile() {
      let input = document.getElementById("file");
      input.click();
    },
    upload(e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      let url = "/api/predict";
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      const self = this;
      this.axios.post(url, formData, config).then(function (response) {
        if (response["data"]["status"] == "OK") {
          let token = response["data"]["data"]["token"];
          self.$router.push({
            name: "predict-result",
            params: { token: token },
          });
        } else {
          console.log("[ERROR] msg: " + response["data"]["msg"]);
        }
      });
    },
  },
};
</script>

<style >
#file {
  opacity: 0;
}
#upload-button {
  text-align: center;
  margin: 10px;
  border-radius: 20px;
}
</style>
