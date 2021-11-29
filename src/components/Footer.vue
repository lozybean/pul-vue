<template>
  <el-footer>
    <div class="footer-container">
      <div class="footer-main">
        <span
          >Copyright &copy; 2021 Sift-PULs | All Rights Reserved | Email:
          <a href="#"> songtao@cdu.edu.cn</a></span
        >
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
  justify-content: flex-end;
}
.footer-main {
  font-size: 10px;
  color: #909399;
}
</style>
