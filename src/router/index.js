import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'
import { animationDuration } from '../App.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        props: { animationDuration: animationDuration }
    },
    {
        path: '/about',
        name: 'About',
        component: About
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})

router.afterEach((function(to, from) {
    // do not track first load as navigated
    if(!from.name) {
        return;
    }
    this.$ga.trackEvent(this.$ga.actions.NAVIGATED, to.name);
}).bind(Vue.prototype));



export default router
