<template>
  <el-container direction="vertical">
    <Header></Header>
    <el-main>
      <el-container>
        <el-card shadow="never" class="box-card" style="width: 100%; min-height: 500px; text-align: left;">
          <div>
            <h1>How to search for a PUL?</h1>
            <p>We provide search options based on three catagories, substrate (eg:agar, pectin, alginate), taxonomy (CGF number, taxid, phyla or species name) and domain name (pfam name or Cazy family name). You could input one keyword or multiple keywords at once.</p>
            <h1>How to download interested PULs?</h1>
            <p>If you find the PULs from search interface, there are downloading buttons for each Sift-PUL, click it and choose the data you want.</p>
            <h1>False positives of sift-PULs</h1>
            <p>Because of relatively few PUL studies, it is difficult to assess the accuracy of prediction methods and to manually identify all true positives in prediction data. What we can currently confirm is that 65 out of 186 bacteria with predicted agar-PUL have been recorded with an agar-degrading phenotype. In future, we might manually check each predicted PUL and mark ones that have experimental evidence.</p>
            <h1>Completeness of sift-PULs</h1>
            <p>Considering the PUL’s evolutionary diversities, sift-PULs, in theory, only includes a small part of PULs in nature.</p>
            <h1>Future work in process:</h1>
            <p>We are currently adding more sift-PULs targeting other polysaccharides (xylan, alpha-mannan and ulvan) and online predicting service is also under construction.</p>
          </div>
        </el-card>
      </el-container>
    </el-main>
    <Footer></Footer>
  </el-container>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Help',
  components: {
    Header,
    Footer,
  }
}
</script>
