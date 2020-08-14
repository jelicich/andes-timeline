import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import './styles/styles.scss';
import Store from './service/store';
import router from './router'

Vue.config.productionTip = false;

Vue.prototype.$store = Store;

new Vue({
  vuetify,
  router,
  render: (h) => h(App)
}).$mount('#app');
