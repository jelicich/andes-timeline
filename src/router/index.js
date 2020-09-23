import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'
import Media from '../views/Media'
import { animationDuration } from '../App.vue'

Vue.use(VueRouter)

const DEFAULT_TITLE = 'Empleados Andes';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        props: { animationDuration: animationDuration },
        meta: {title: `${DEFAULT_TITLE} - Línea de tiempo`}
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: {title: `${DEFAULT_TITLE} - Actualidad`}
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/media',
        name: 'Media',
        component: Media,
        meta: {title: `${DEFAULT_TITLE} - En los medios`}
    }
]

const router = new VueRouter({
    routes
})

router.afterEach((function(to, from) {
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
    // do not track first load as navigated
    if(!from.name) {
        return;
    }
    this.$ga.trackEvent(this.$ga.actions.NAVIGATED, to.name);
}).bind(Vue.prototype));

export default router
