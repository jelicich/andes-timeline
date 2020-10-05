 
<template>
  <v-app>
    <site-header></site-header>
    <router-view/>
  </v-app>
</template>

<script>

import SiteHeader from './components/SiteHeader';
import Util from './service/util'

const util = new Util();
const SPLASH_SEL = '#splash-screen';

export const animationDuration = util.isMobile() ? 2 : 3;

export default {
    name: 'App',
    components: {
        SiteHeader
    },
    data: () => ({
    }),
    mounted() {

        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        if(util.isMobile()) {
            document.documentElement.style.setProperty('--animation-duration', animationDuration+'s');
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