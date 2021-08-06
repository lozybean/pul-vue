<template>
  <v-chart :options="data"/>
</template>

<script>
  export default {
    name: 'EchartBar',
    props: {
      getOptionsData: {
        type: Function,
        default: () => {}
      }
    },
    data () {
      return {
        data: {},
      }
    },
    created() {
      console.log("> Echart Bar created");
      this.data = this.getOptionsData();
      console.log(this.data);
    },
  }
</script>

<style>
  /**
   * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
   * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
   *
   * 必须设置尺寸大小，否则生产环境中不能正常显示
   */
  .echarts {
    min-width: 600px;
    min-height: 400px;
    width: 100%;
    height: 100%;
  }
</style>
