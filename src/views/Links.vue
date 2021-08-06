<template>
  <el-container direction="vertical">
    <Header></Header>
    <el-main>
      <el-container>
        <el-card shadow="never" class="box-card" style="width: 100%; min-height: 500px; text-align: left;">
          <div>
            <p>
              <strong>Cazy database</strong>: <a href="http://www.cazy.org/">http://www.cazy.org/</a><br>
              <strong>PULDB</strong>: <a href="http://www.cazy.org/PULDB/">http://www.cazy.org/PULDB/</a><br>
              <strong>dbCAN database</strong>: <a href="http://bcb.unl.edu/dbCAN2/">http://bcb.unl.edu/dbCAN2/</a><br>
              <strong>pfam</strong>: <a href="http://pfam.xfam.org/">http://pfam.xfam.org/</a><br>
              <strong>NCBI</strong>: <a href="https://www.ncbi.nlm.nih.gov/">https://www.ncbi.nlm.nih.gov/</a><br>
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
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Links',
  components: {
    Header,
    Footer,
  }
}
</script>
