 
<template>
  <v-app>
    <site-header></site-header>
    <!-- <home :animationDuration="animationDuration"></home> -->
    <router-view/>
  </v-app>
</template>

<script>
// import Home from './views/home';
import SiteHeader from './components/SiteHeader';
import Util from './service/util'

const util = new Util();
const SPLASH_SEL = '#splash-screen';

export const animationDuration = util.isMobile() ? 2 : 4;

export default {
    name: 'App',
    components: {
        //Home,
        SiteHeader
    },
    data: () => ({
        animationDuration: util.isMobile() ? 2 : 4,
    }),
    mounted() {
        // set duration for css transition
        if(util.isMobile()) {
            document.documentElement.style.setProperty('--animation-duration', '2s');
        }
        window.addEventListener('load', () => {
            const splash = document.querySelector(SPLASH_SEL);
            splash.style.opacity = 0;
            setTimeout(() => {
                splash.parentElement.removeChild(splash);
            }, this.animationDuration * 1000)
        })
    },
    watch: {
        $route: function(to, from) {
            if(from.name === 'Home') {
                this.removeCanvas();
            }
        }
    },
    methods: {
        removeCanvas: function() {
            const canvas = document.querySelector('canvas');
            canvas.parentElement.removeChild(canvas);
        }
    }
};
</script>