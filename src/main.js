import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import './styles/styles.scss';
import Store from './service/store';
import router from './router'
import GoogleAnalyticsService from './service/google-analytics';

Vue.config.productionTip = false;

Vue.prototype.$store = Store;
Vue.prototype.$ga = GoogleAnalyticsService;
Vue.prototype.$ga.init();
Vue.prototype.$baseUrl = process.env.BASE_URL;

new Vue({
  vuetify,
  router,
  render: (h) => h(App)
}).$mount('#app');
