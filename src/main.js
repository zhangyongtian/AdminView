import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-tiptap/lib/index.css';
import { ElementTiptapPlugin } from 'element-tiptap';
Vue.use(ElementTiptapPlugin, {
  lang: 'zh',
});
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
