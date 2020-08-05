import gsap from 'gsap';
import StartSlide from '../Slides/Start.slide'
import SecondPlaneSlide from '../Slides/SecondPlane.slide'
import Cloud from '../Cloud'
import Util from '../../service/util';

const util = new Util();
const SLIDER_SEL = '#slider';

export default {
    name: 'slider',
    components: {
        StartSlide,
        SecondPlaneSlide,
        Cloud
    },
    props: [],
    data() {
        return {
            tl: gsap.timeline(),
            state: this.$store.state,
                        
            slides: [
                'start-slide',
                'second-plane-slide'
            ]
        };
    },
    computed: {

    },
    mounted() {
        console.log('mounted', this.state)
        window.addEventListener('wheel', this.setSlide);
    },
    watch: {
        state: {
            deep: true,

            handler: function() {
                this.animateSlide(this.state.activeSlide);
            }
        }
    },
    methods: {
        setSlide: function(e) {
            console.log('scrolling and setting slide')
            // if the container is animating the wheel won't work
            if (this.tl && this.tl.isActive()) {
                return;
            }
            // temp variable to see if we're at the beginning or end
            let activeSlide = this.state.activeSlide;
            const oldSlide = activeSlide;
            // which way did we scroll the mousewheel
            activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
            // are we at the beginning of the slides?
            activeSlide = activeSlide < 0 ? 0 : activeSlide;
            // are we at the end of the slides?
            activeSlide = activeSlide > this.slides.length - 1 ? this.slides.length - 1 : activeSlide;
            // if at its not at the beginning or end we update the active slide in store
            if (oldSlide !== activeSlide) {
                this.$store.setActiveSlide(activeSlide);
                console.log('store set')
            }
        },

        animateSlide: function(slideNumber) {
            console.log('animating to: ', slideNumber);
            this.tl.to(SLIDER_SEL, {
                duration:4,
                ease: "power4.out",
                x:`${-util.vw(100) * slideNumber}`,
                // transform: 'translateX(-100vw)'
            })
        }
    },
};
