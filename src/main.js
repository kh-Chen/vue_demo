import Vue from 'vue';
import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import 'video.js/dist/video-js.css'
import i18n from './lang-i18n';
import component from "./common/component";
import fn from "./common/fn";
import vars from "./common/variable";
import './directive/afterrender';
import App from './App';
import menu_router from './router';

Vue.use(iView);
Vue.use(component);
Vue.use(fn);

axios.defaults.baseURL = process.env.API_ROOT;
Vue.prototype.$ajax = axios;
Vue.prototype.$vars = vars;


new Vue({
  el:'#iview_demo',
  components: { App },
  template: '<App />',
  router:menu_router.getRouter(),
  i18n
})
