import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import axios from "axios";
import VueAxios from "vue-axios";
import qs from "qs";
import uploader from "vue-simple-uploader";

import ECharts from "vue-echarts"; // 在 webpack 环境下指向 components/ECharts.vue
// 手动引入 ECharts 各模块来减小打包体积
import "echarts/lib/chart/bar";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";
//import 'echarts/lib/component/title'

Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(uploader);
Vue.prototype.$qs = qs;

// 注册组件后即可使用
Vue.component("v-chart", ECharts);

Vue.component("remote-script", {
  render: function(createElement) {
    var self = this;
    return createElement("script", {
      attrs: {
        type: "text/javascript",
        src: this.src,
        id: this.id,
      },
      on: {
        load: function(event) {
          self.$emit("load", event);
        },
        error: function(event) {
          self.$emit("error", event);
        },
        readystatechange: function(event) {
          if (this.readyState == "complete") {
            self.$emit("load", event);
          }
        },
      },
    });
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
  },
});

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
