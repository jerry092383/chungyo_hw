import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// bootstrap
import 'bootstrap'

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

// toasted
import Toasted from 'vue-toasted'
Vue.use(Toasted);
Vue.use(Toasted, Option);

// font-awesome
import 'font-awesome/css/font-awesome.css'

// UIkit
// import * as UIkit from 'uikit'
// import * as  Icons from 'uikit/dist/js/uikit-icons'
// import 'uikit/dist/css/uikit.min.css'
// UIkit.use(Icons)
// Vue.prototype.$uikit = UIkit;

Vue.config.productionTip = false
Vue.prototype.$api = 'https://cy-cinemas.ml'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
