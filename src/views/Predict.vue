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
          <div id="predict-desc">
            <p>Sift-PUL prediction needs two information:</p>
            <ul>
              <li>(1) information of protein sequences</li>
              <li>(2) information of protein location in chromosome</li>
            </ul>
            <p>
              Protein location information is determined by the order in which
              the protein sequences are arranged in the fasta file. Therefore,
              before prediction, ensure sequences are in fasta format and in
              order.
            </p>
          </div>

          <el-divider></el-divider>

          <div id="input-container">
            <p>Enter protein sequences.</p>

            <textarea
              id="fasta-input"
              v-model="fasta"
              placeholder=">Seq1
MVGINERLVMAALVLIIIGLSYT......
>Seq2
MKNSIVILFLLLLSQSGYAQGR......"
            />
            <div id="file-select">
              <div style="margin-right: 20px">
                <p>Or upload protein fasta file</p>
              </div>
              <div>
                <input
                  type="file"
                  value=""
                  id="file"
                  accept=".fasta,.fa,.fas"
                  @change="upload"
                />
              </div>
              <div style="margin-top: auto; margin-bottom: auto">
                <el-button @click="chooseFile" id="file-select-button">
                  Select file
                </el-button>
              </div>

              <div id="filename" style="margin-left: 20px">
                <p>{{ filename }}</p>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
          <div style="text-align: left; margin-left: 10px">
            <el-button id="submit" icon="el-icon-video-play" @click="submit">
              submit and predict
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
// import LineReader from "line-reader";

export default {
  name: "Predict",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      fasta: "",
      file: null,
      filename: "No file is selected",
    };
  },
  methods: {
    chooseFile() {
      let input = document.getElementById("file");
      input.click();
    },
    upload(e) {
      // let formData = new FormData();
      this.checkFastaFile(e.target.files[0]);

      // formData.append("file", e.target.files[0]);
      // let url = "/api/predict/file";
      // let config = {
      //   headers: { "Content-Type": "multipart/form-data" },
      // };
      // const self = this;
      // this.axios.post(url, formData, config).then(function (response) {
      //   if (response["data"]["status"] == "OK") {
      //     let token = response["data"]["data"]["token"];
      //     self.$router.push({
      //       name: "predict-result",
      //       params: { token: token },
      //     });
      //   } else {
      //     console.log("[ERROR] msg: " + response["data"]["msg"]);
      //   }
      // });
    },
    predictByFile() {
      let formData = new FormData();
      formData.append("file", this.file);
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
    predictByFasta() {
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
    checkFastaFile(file) {
      if (file === undefined) {
        return false;
      }
      if (file.size > 50000000) {
        this.$alert(
          "File is too large, please confirm it is a protein sequece file from bacterium",
          "WARNING",
          {
            confirmButtonText: "OK",
          }
        );
        let input = document.getElementById("file");
        input.value = "";
      }
      var blob = file.slice(0, 1);
      new Response(blob).text().then((text) => {
        if (text === ">") {
          this.file = file;
          this.filename = this.file.name;
        } else {
          this.$alert("Not a valid fasta file, please check.", {
            confirmButtonText: "OK",
          });
          let input = document.getElementById("file");
          input.value = "";
        }
      });
    },
    submit() {
      if (this.fasta.trim().length > 0) {
        if (this.fasta.startsWith(">")) {
          this.predictByFasta();
        } else {
          this.$alert("Not in fasta format, please check.", {
            confirmButtonText: "OK",
          });
        }
      } else if (this.file !== null) {
        this.predictByFile();
      }
    },
  },
};
</script>

<style >
p {
  text-align: left;
}
#predict-desc {
  text-align: left;
}
#fasta-input {
  width: 100%;
  height: 100px;
}
#input-container {
  width: 90%;
  align-items: center;
  /* margin-top: 50px; */
  margin-left: auto;
  margin-right: auto;
}
#file-select {
  display: flex;
}
#file {
  opacity: 0;
  width: 0;
}
#file-select-button {
  text-align: center;
  margin: auto;
  /* height: 80%; */
  /* border-radius: 20px; */
}

#submit {
  background-color: #666666;
  color: white;
  /* text-align: center; */
  /* margin: auto; */
  /* border-radius: 20px; */
}
</style>
