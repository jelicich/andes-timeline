import Cloud from '../Cloud';
import CloudPng from '../CloudPng';
import Util from '../../service/util';
import gsap from 'gsap';

const util = new Util();

const RATIO = 0.5; // used to set the width of the sky ie: 0.5 = half of the slider width

// used for css clouds
const CLOUD_DISPLACEMENT = 0.5; // 20% 
const CLOUD_OFFSET = 110; // the cloud grows up around 110 px;

export default {
    name: 'sky',
    components: {
        Cloud,
        CloudPng
    },
    props: ['slidesLength', 'duration', ],
    data() {
        return {
            state: this.$store.state,
            tl: gsap.timeline(),
            cloudOffset: CLOUD_OFFSET
        }
    },
    computed: {
        clouds: function() {
            return Math.round(this.slidesLength * 0.8); // TODO make dynamic
        },
        
        width: function() {
            return this.slidesLength * 100 * RATIO;
        },

        widthCss: function() {
            return this.width + 'vw';
        },

        // vhLimit: function() {
        //     return window
        // }

    },
    watch: {
        state: {
            deep: true,

            handler: function() {
                this.moveSky(this.state.activeSlide);
            }
        }
    },
    mounted() {
        // console.log('length', this.slidesLength, 'width', this.width)
    },
    methods: {
        getRandom: function(n) {
            return Math.floor(Math.random() * n+1);
        },

        getRandomFromRange: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },

        moveSky: function(activeSlide) {
            const width = util.vw(this.slidesLength * 100 * RATIO);
            const offset = width - util.vw(100);
            const step = offset / this.slidesLength;

            this.tl.to(this.$refs.sky, {
                duration: this.duration,
                ease: "power4.out",
                x:`${-step * activeSlide}`,
                // transform: 'translateX(-100vw)'
            }).to(this.$refs.cloudContainer, {
                duration: this.duration,
                ease: "power4.out",
                x:`${- (step * CLOUD_DISPLACEMENT) * activeSlide}`,
            }, `-=${this.duration}`);

            return activeSlide;
        },

    
    }
}


