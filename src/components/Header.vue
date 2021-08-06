<template>
  <el-container>
    <div class="block">
      <el-image
        :src="banner_url"
        :fit="fit">
      </el-image>
    </div>

    <el-header class="el-menu-demo" style="width: 100%;">
      <el-menu 
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect">
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/search">Search</el-menu-item>
        <el-menu-item index="/browse">Browse</el-menu-item>
        <el-menu-item index="/download">Download</el-menu-item>
        <el-menu-item index="/links">Links</el-menu-item>
        <el-menu-item index="/help">Help</el-menu-item>
      </el-menu>
    </el-header>
  </el-container>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        activeIndex: this.$route.path,
        banner_url: require('@/assets/banner.svg'),
        fit: 'fill',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log("> Goto: "+keyPath[0]);
        this.$router.push({path: keyPath[0]});
      }
    }
  }
</script>

<style scoped>
  .el-menu--horizontal > .el-menu-item.docker-right {
    float: right;
  }
</style>
