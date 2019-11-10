import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

// 09/11
// Définition des routes qui permettent de naviguer entre les différentes pages du projet

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/result',
            name: 'result',
            component: () => import('./views/Result.vue'),
        },
        {
            path: '/questionnaire',
            name: 'questionnaire',
            component: () => import('./views/Questionnaire.vue'),
        },
        {
            path: '/listUsers',
            name: 'listUsers',
            component: () => import('./views/ListUsers.vue'),
        },
    ],
})
