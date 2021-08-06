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
