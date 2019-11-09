import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)
Vue.config.productionTip = false

// 09 novembre
// Ajout de PouchDB qui permettra d'enregistrer les informations en base de données
import PouchDB from 'pouchdb'
var db = new PouchDB('atDbQuestionnaire')

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
