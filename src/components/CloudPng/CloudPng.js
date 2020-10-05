// import gsap from 'gsap';
import { TimelineMax, TweenLite, Power1 } from 'gsap';

export default {
    name: 'cloud-png',
    components: {},
    props: ['imgNumber'],
    data() {
        return {
            tlCloud: null,
        }
    },
    computed: {

    },
    mounted() {
        // this.animateCloud();
    },
    methods: {
        animateCloud: function() {
            this.tlCloud = new TimelineMax({repeat:-1});
            const cloud = this.$refs.cloudPng;
            
            this.tlCloud
                .to(cloud, 3, { 
                    y:'-=10', 
                    ease:Power1.easeInOut
                })
                .to(cloud, 2, { 
                    y:'+=10', 
                    ease:Power1.easeInOut
                })
    
            TweenLite.to(cloud, 27, {ease:Power1.easeInOut})
        }
    }
}


