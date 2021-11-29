<template>
  <el-footer>
    <div class="footer-container">
      <div class="footer-main">
        <span
          >Copyright &copy; 2021 Sift-PULs | All Rights Reserved | Email:
          <a href="#"> songtao@cdu.edu.cn</a></span
        >
      </div>
      <div id="clustrmaps-container">
        <remote-script
          id="clustrmaps"
          src="//clustrmaps.com/map_v2.js?d=UdMFN_HC3kswSnbZNRw8bblEOI8UjjRjiGpSK9isClE&cl=ffffff&w=a"
        ></remote-script>
      </div>
    </div>
  </el-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
/* footer {
  display: flex;
  align-content: space-around;
} */
#footer-container {
  display: flex;
  justify-content: end;
}
.footer-main {
  font-size: 10px;
  color: #909399;
}
#clustrmaps-container {
  width: 20%;
  height: 100%;
}
</style>
