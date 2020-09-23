 
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

export const animationDuration = util.isMobile() ? 2 : 3;

export default {
    name: 'App',
    components: {
        //Home,
        SiteHeader
    },
    data: () => ({
        // animationDuration: util.isMobile() ? 2 : 2,
    }),
    mounted() {

        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        // this.$ga.init();
        // set duration for css transition

        if(util.isMobile()) {
            document.documentElement.style.setProperty('--animation-duration', animationDuration+'s');

            
            // document.querySelector('body').style.height = window.innerHeight + 'px';
            // window.addEventListener('resize', () => {
            //     document.querySelector('body').style.height = window.innerHeight + 'px';
            // })
        }
        window.addEventListener('load', () => {
            const splash = document.querySelector(SPLASH_SEL);
            splash.style.opacity = 0;
            setTimeout(() => {
                splash.parentElement.removeChild(splash);
            }, animationDuration * 1000)
        })
    },
    watch: {
    },
    methods: {

    }
};
</script>