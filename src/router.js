import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/response',
      name: 'response',
      component: () => import('./views/Response.vue')
    },
    {
      path: '/questionnaire',
      name: 'questionnaire',
      component: () => import('./views/Questionnaire.vue')
    }
  ]
})
