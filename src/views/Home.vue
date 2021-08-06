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
              What is Sift-PULs (Specific functional Polysaccharide utilization
              locus)?
            </h1>
            <p>
              Polysaccharide utilization locus(PUL) is bacterial gene cluster
              including genes responsible for multiple biological processes
              (polysaccharide degradation, sugar transporting and metabolism).
              PUL studies are blooming in recent years but the biochemical
              characterization is relative slow. There is a demand for PUL
              database with function prediction. In term of this problem,
              Sift-PULs is proposed, not only to predict PULs, but also to
              assign specific functions to each PUL.
            </p>

            <h1>How do we predict Sift-PULs?</h1>
            <p>
              By analyzing biochemically characterized PULs, we identified
              signature genes that specific for alginate, agar, carrageenan,
              chitin, beta-mannan, pectin and xylan, respectively. Using
              signature genes, PULs with specific functions were predicted.
            </p>

            <h1>Advantage of Sift-PULs?</h1>
            <p>
              • <strong>Specificity</strong>: We assign a specific function to
              each PUL.<br />
              • <strong>Diversity</strong>: PULs come from different phyla other
              than <i>Bacteroidetes</i>. <br />
            </p>

            <p>
              <br />
              <strong>Development of Sift-PULs:</strong><br />
              2014.06-2016.06: Agar PUL prediction using conserved metabolic
              genes<br />
              (Finished by Dr. Tao Song and Mr Congchong Wei in Sichuan
              University)<br />
              2016.06-2018.06: Discovery of novel enzymes and novel pathways
              based on predicted agar PULs.<br />
              (Finished by Dr. Tao Song)<br />
              2018.06-2021.06: Website construction<br />
              (Finished by Dr. Tao Song and Mr Congchong Wei in Chengdu
              University)
            </p>
            <p>
              If you have any questions, please contact us. <br />
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
