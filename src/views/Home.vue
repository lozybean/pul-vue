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
          <div>
            <h1>
              1. What is Sift-PULs database(Specific functional Polysaccharide utilization locus)?
            </h1>
            <p>
              Sift-PUL database is a public repository providing predicted PULs with specific functional annotations. The key difference between sift-PUL and other PUL databases (e.g. PULDB, CGCs and dbCAN-PUL) is the functional annotation for each predicted PUL.
            </p>

            <h1>2. Signature genes specific for each polysaccharide are used for Sift-PUL prediction</h1>
            <p>
              The key to predicting PUL is what signature genes (also called as marker genes) are selected, for example SusC/D and carbohydrate active enzymes are used in PULDB and transcription factor, sugar transporter and carbohydrate active enzymes are used in CGCs. Signature genes used for Sift-PUL prediction are specific for each polysaccharide and are classified into two categories: core genes (backbone monosaccharide’s metabolic genes) and alternative genes (carbohydrate active enzymes). 
            </p>

            <h1>3. How do we predict sift-PULs?</h1>
            <p>
              A sift-PUL specific for one polysaccharide must have all corresponding core genes and at least one corresponding alternative gene. To ensure specificity, most Hmmer models of core genes and alternative genes were rebuilt locally. 
            </p>

            <p>
              <br />
              <strong>Development of Sift-PULs:</strong><br />
              2014.06-2016.06: Agar PUL prediction using conserved metabolic genes (Dr. Tao Song and Mr Congchong Wei in Sichuan University)<br />

              2016.06-2018.06: Discovery of novel enzymes and novel pathways based on predicted agar PULs.(Dr. Tao Song)<br />

              2018.06-2021.06: Website construction (Dr. Tao Song and Mr Congchong Wei in Chengdu University)<br />
            </p>
            <p>
              If you have any questions, please contact us.<br />
              songtao@cdu.edu.cn
            </p>
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
  name: "Home",
  components: {
    Header,
    Footer,
  },
};
</script>
