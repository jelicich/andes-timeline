import gsap from 'gsap';

export default {
    name: 'cloud',
    components: {},
    props: ['seed'],
    data() {
        return {
            tl: gsap.timeline()
        }
    },
    computed: {

    },
    mounted() {
        // this.animateCloud();
    },
    methods: {

        // it's not smooth and too much resources used
        animateCloud: function() {
            this.tl.to('.feTurbulence', {
                //delay: 1,
                attr:{'baseFrequency':0.02},
                repeat:-1,
                yoyo:false
            });
        
        }
    }
}


