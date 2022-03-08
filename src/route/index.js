
import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../components/Index.vue'
import Home from '../views/Home/Home.vue'
import About from '../views/About/About.vue'
import Study from '../views/Study/Study.vue'

const routes = [
    {
        path: '/', component: Index, redirect: '/home',
        children: [
            { path: '/home', component: Home },
            { path: '/about', component: About },
            { path: '/study', component: Study },
        ]
    },

]

Vue.use(VueRouter)

const router = new VueRouter({
    routes // routes: routes 的简写
})

export default router;