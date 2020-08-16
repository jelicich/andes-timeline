import SlideMixin from '../../../mixins/SlideMixin';
import CloudPng from '../../CloudPng';
import InstaPhoto from '../../InstaPhoto';

import gsap from 'gsap';

const BG_SLIDER_SEL = '#slider .custom-background';

export default {
    name: 'revolution-slide',
    mixins: [SlideMixin],
    components: {
        CloudPng,
        InstaPhoto
    },
    props: ['isActive'],
    data() {
        return {
            state: this.$store.state,
            // backgroundClass: 'cloudy',
            tl: gsap.timeline(),
            hasToClear: false,

            clouds: 5,
        };
    },
    computed: {

    },
    mounted() {
        console.log('start mounted: ', this.isActive);
    },
    watch: {
        state: {
            deep: true,

            handler: function() {
                if(this.hasToClear && !this.isActive) {
                    document.querySelector(BG_SLIDER_SEL).classList.remove('isVisible');
                    setTimeout(() => {
                        document.querySelector(BG_SLIDER_SEL).classList.remove('cloudy');
                    }, this.duration * 1000)
                    

                    // this.tl.to(SLIDER_SEL, {
                    //     duration: this.duration,
                    //     ease: "power4.out",
                    //     // backgroundImage: 'linear-gradient(0deg, #62a0d8 0%, #2178d1 50%, #085cb3 100%)',
                    //     backgroundImage: `url(${backgroundBlueUrl})`,// "-webkit-linear-gradient(top, #62a0d8, #085cb3)",
                    //     // background:"linear-gradient(to top, #62a0d8, #085cb3)"
                    // }).to(this.$refs.cloudsContainer, {
                    //     duration: this.duration / 2,
                    //     opacity: 0,
                    //     ease: "power4.out",
                    // }, '-='+this.duration);
                    // this.hasToClear = false;

                    this.$emit('shake-plane', false);
                }
            }
        }
    },
    methods: {
        onActive: function() {
            // document.querySelector(SLIDER_SEL).classList.add(this.backgroundClass);

            document.querySelector(BG_SLIDER_SEL).classList.add('isVisible');
            document.querySelector(BG_SLIDER_SEL).classList.add('cloudy');
            
            // this.tl.to(SLIDER_SEL, {
            //         duration: this.duration,
            //         ease: "power4.out",
            //         // backgroundImage: 'linear-gradient(0deg, #d2d2d2 0%, #8f8f8f 50%, #151515 100%)',
            //         backgroundImage: `url(${backgroundGrayUrl})`,// "-webkit-linear-gradient(top, #d2d2d2, #151515)",
            //         // background:"linear-gradient(to top, #d2d2d2, #151515)"
            //     })
            //     .to(this.$refs.cloudsContainer, {
            //         duration: this.duration / 2,
            //         opacity: 1,
            //         ease: "power4.out",
            //     }, '-=' + this.duration * .75);

            this.$emit('shake-plane', true);

            this.hasToClear = true;
        },

        getRandomFromRange: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
    }
}


