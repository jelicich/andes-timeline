import SlideMixin from '../../../mixins/SlideMixin';
import CloudPng from '../../CloudPng';
import gsap from 'gsap';

const SLIDER_SEL = '#slider';

export default {
    name: 'revolution-slide',
    mixins: [SlideMixin],
    components: {
        CloudPng
    },
    props: ['isActive'],
    data() {
        return {
            state: this.$store.state,
            backgroundClass: 'cloudy',
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
                    this.tl.to(SLIDER_SEL, {
                        duration: this.duration,
                        ease: "power4.out",
                        backgroundImage: 'linear-gradient(0deg, #62a0d8 0%, #2178d1 50%, #085cb3 100%)',
                    }).to(this.$refs.cloudsContainer, {
                        duration: this.duration / 2,
                        opacity: 0,
                        ease: "power4.out",
                    }, '-='+this.duration);  
                    this.hasToClear = false;
                }
            }
        }
    },
    methods: {
        onActive: function() {
            // document.querySelector(SLIDER_SEL).classList.add(this.backgroundClass);
            
            this.tl.to(SLIDER_SEL, {
                duration: this.duration,
                ease: "power4.out",
                backgroundImage: 'linear-gradient(0deg, #d2d2d2 0%, #8f8f8f 50%, #151515 100%)',
            }).to(this.$refs.cloudsContainer, {
                duration: this.duration / 2,
                opacity: 1,
                ease: "power4.out",
            }, '-=' + this.duration * .75);

            this.hasToClear = true;
        },

        getRandomFromRange: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
    }
}


