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
          <div v-if="status !== 'SUCCESS'" class="loading-page">
            <p>please wait... you can view predict result later:</p>
            <a v-bind:href="url">{{ url }}</a>
          </div>
          <div v-if="status === 'SUCCESS'" align="center" class="grid-content">
            <el-card class="box-card" style="width: 88%; text-align: center">
              <pre style="text-align: left"> {{ result }} </pre>
            </el-card>
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
  name: "PredictResult",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      token: "",
      status: "RUNNING",
      result: "",
    };
  },
  methods: {
    getResult() {
      let api = "/api/predict/" + this.token + "/result";
      var self = this;
      return this.axios.get(api).then((response) => {
        if (response["data"]["status"] == "OK") {
          self.result = response["data"]["data"];
          return response["data"];
        } else {
          console.log("[ERROR] msg: " + response["data"]["msg"]);
        }
      });
    },
    getDetail(index) {
      let token = this.token;
      let pul_id = this.pul_info[index]["id"];
      let routeData = this.$router.resolve({
        name: "predict-pul",
        params: { pul_id, token },
      });
      window.open(routeData.href, "_blank");
    },
    getStatus() {
      let api = "/api/predict/" + this.token;
      var self = this;
      return this.axios.get(api).then((response) => {
        if (response["data"]["status"] == "OK") {
          self.status = response["data"]["data"]["status"];
          if (self.status === "SUCCESS") {
            clearInterval(this.timer);
            this.getResult();
          }
        } else {
          console.log("[ERROR] msg: " + response["data"]["msg"]);
        }
      });
    },
  },
  mounted() {
    this.getStatus();
  },
  created() {
    this.token = this.$route.params.token;
    this.url = location.href;
    this.timer = setInterval(() => {
      setTimeout(this.getStatus, 0);
    }, 1000 * 5);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(this.timer);
    });
  },
};
</script>

<style >
</style>
