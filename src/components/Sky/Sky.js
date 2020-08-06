import Cloud from '../Cloud'
import Util from '../../service/util';
import gsap from 'gsap';

const util = new Util();

const RATIO = 0.5;

export default {
    name: 'sky',
    components: {
        Cloud
    },
    props: ['slidesLength', 'duration'],
    data() {
        return {
            state: this.$store.state,
            tl: gsap.timeline(),
        }
    },
    computed: {
        clouds: function() {
            return 3; // TODO make dynamic
        },
        
        width: function() {
            return this.slidesLength * 100 * RATIO + 'vw';
        } 
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
        console.log('length', this.slidesLength, 'width', this.width)
    },
    methods: {
        getRandom: function(n) {
            return Math.floor(Math.random() * n+1);
        },

        moveSky: function(activeSlide) {
            console.log('moving sky')
            this.tl.to(this.$refs.sky, {
                duration: this.duration,
                ease: "power4.out",
                x:`${-util.vw(100*RATIO) * activeSlide}`,
                // transform: 'translateX(-100vw)'
            })
            return activeSlide;
        }
        
    }
}


