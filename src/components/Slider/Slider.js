import gsap from 'gsap';
import InstructionsSlide from '../Slides/Instructions.slide';
import StartSlide from '../Slides/Start.slide';
import SecondPlaneSlide from '../Slides/SecondPlane.slide';
import RevolutionSlide from '../Slides/Revolution.slide';
import SecondRouteSlide from '../Slides/SecondRoute.slide';
import ThirdPlaneSlide from '../Slides/ThirdPlane.slide';
import BombardierSlide from '../Slides/Bombardier.slide';
import AirbusSlide from '../Slides/Airbus.slide';
import BoeingSlide from '../Slides/Boeing.slide';
import TheMomentSlide from '../Slides/TheMoment.slide';
import ReturnSlide from '../Slides/Return.slide';
import WorldCupSlide from '../Slides/WorldCup.slide';
import MalvinasSlide from '../Slides/Malvinas.slide';
import DebtSlide from '../Slides/Debt.slide';
import PandemicSlide from '../Slides/Pandemic.slide';
import LastSlide from '../Slides/Last.slide';

import Util from '../../service/util';

const util = new Util();
const SLIDER_SEL = '#slider';
const CUSTOM_BG_SEL = '.custom-background';
const BLOCKED_CLASS = 'isBlocked';

export default {
    name: 'slider',
    components: {
        InstructionsSlide,
        StartSlide,
        SecondPlaneSlide,
        SecondRouteSlide,
        RevolutionSlide,
        ThirdPlaneSlide,
        BombardierSlide,
        AirbusSlide,
        BoeingSlide,
        TheMomentSlide,
        ReturnSlide,
        WorldCupSlide,
        MalvinasSlide,
        DebtSlide,
        PandemicSlide,
        LastSlide
    },
    props: ['slides', 'duration', 'isDelayed'],
    data() {
        return {
            tl: gsap.timeline(),
            state: this.$store.state,
            delayTime: 2,
            touchStart: null,
        };
    },
    computed: {

    },
    mounted() {
        const sliderEl = document.querySelector(SLIDER_SEL);
        sliderEl.querySelector(CUSTOM_BG_SEL).style.width = sliderEl.offsetWidth + 'px';

        window.addEventListener('wheel', this.setSlide);
    
        // mobile events
        window.addEventListener('touchstart', this.setTouchStart);
        window.addEventListener('touchend', this.setSlideMobile);
    },
    watch: {
        state: {
            deep: true,

            handler: function() {
                this.animateSlide(this.state.activeSlide);
                this.$ga.trackEvent(this.$ga.actions.SCROLLED_TO, this.slides[this.state.activeSlide].title);
            }
        }
    },
    methods: {
        setSlide: function(e) {
            const sliderEl = document.querySelector(SLIDER_SEL);
            // if the container is animating the wheel won't work
            if (this.tl && this.tl.isActive() || sliderEl.classList.contains(BLOCKED_CLASS)) {
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
            }
        },

        setSlideMobile: function(e) {
            const sliderEl = document.querySelector(SLIDER_SEL);
            if (this.tl && this.tl.isActive() || sliderEl.classList.contains(BLOCKED_CLASS)) {
                return;
            }
            const touchEnd = e.changedTouches[0].clientX;
            let currentSlide = this.state.activeSlide;
            
            // check if slide gesture is long enough to slide
            // we don't want a slightly slide to change slides
            const isSlidable = Math.abs(this.touchStart - touchEnd) > 30;

            if(isSlidable) {
                if (this.touchStart > touchEnd) {
                    currentSlide = currentSlide+1 > this.slides.length-1 ? this.slides.length-1 : currentSlide+1;                
                } else {
                    currentSlide = currentSlide-1 < 0 ? 0 : currentSlide-1;                   
                }
    
                if (currentSlide !== this.state.activeSlide) {
                    this.$store.setActiveSlide(currentSlide);
                }
            }
            
        },

        animateSlide: function(slideNumber) {
            const duration = this.isDelayed ? this.duration - this.delayTime : this.duration;
            const delay = this.isDelayed ? this.delayTime : 0;
            this.tl.to(SLIDER_SEL, {
                duration: duration,
                ease: "power4.out",
                x:`${-util.vw(100) * slideNumber}`,
                delay: delay
            })
        },

        setTouchStart: function(e) {
            this.touchStart = e.touches[0].clientX;
        },

        handleShake: function(status) {
            this.$emit('shake-plane', status);
        }
    },
    beforeDestroy: function(){
        this.$store.setActiveSlide(0);
        window.removeEventListener('wheel', this.setSlide);
        
        // mobile events
        window.removeEventListener('touchstart', this.setTouchStart);       
        window.removeEventListener('touchend', this.setSlideMobile);
    }
};
