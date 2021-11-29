<template>
  <el-container direction="vertical">
    <Header></Header>
    <el-main>
      <el-container>
        <el-card
          shadow="never"
          class="box-card"
          style="width: 100%; min-height: 500px"
        >
          <div id="file-container">
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
          </div>
          <el-divider></el-divider>
          <div id="fasta-input-container">
            <textarea
              id="fasta-input"
              v-model="fasta"
              placeholder="or paste protein sequence(fasta format) here"
            />
            <el-button id="upload-fasta" @click="predictFasta">
              predict
            </el-button>
          </div>
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
  data() {
    return {
      fasta: "",
    };
  },
  methods: {
    chooseFile() {
      let input = document.getElementById("file");
      input.click();
    },
    upload(e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      let url = "/api/predict/file";
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
    predictFasta() {
      let fasta = this.fasta;
      const self = this;
      let url = "/api/predict/fasta";
      let config = {
        headers: { "Content-Type": "text/plain" },
      };
      this.axios.post(url, fasta, config).then(function (response) {
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
#file-container {
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
}
#file {
  opacity: 0;
  width: 0;
}
#upload-button {
  text-align: center;
  margin: auto;
  border-radius: 20px;
}
#fasta-input-container {
  width: 80%;
  align-items: center;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
}
#fasta-input {
  width: 100%;
  height: 100px;
}
#upload-fasta {
  text-align: center;
  margin: auto;
  border-radius: 20px;
}
</style>
