import gsap from 'gsap';
import StartSlide from '../Slides/Start.slide'
import SecondPlaneSlide from '../Slides/SecondPlane.slide'
import RevolutionSlide from '../Slides/Revolution.slide'
import Util from '../../service/util';

const util = new Util();
const SLIDER_SEL = '#slider';
const CUSTOM_BG_SEL = '.custom-background';
const BLOCKED_CLASS = 'isBlocked';

export default {
    name: 'slider',
    components: {
        StartSlide,
        SecondPlaneSlide,
        RevolutionSlide
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
        this.$store.setTotalSlides = this.slides.length;
        const sliderEl = document.querySelector(SLIDER_SEL);
        sliderEl.querySelector(CUSTOM_BG_SEL).style.width = sliderEl.offsetWidth + 'px';
        // window.addEventListener('wheel', this.calculateScroll);
        
        window.addEventListener('load', () => {
            window.addEventListener('wheel', this.setSlide);
        
            // mobile events
            window.addEventListener('touchstart', (e) => {
                this.touchStart = e.touches[0].clientX;
            });
            
            window.addEventListener('touchend', this.setSlideMobile);

            console.log('page loaded event listeners registered');
        })
        
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
            const isSlidable = Math.abs(this.touchStart - touchEnd) > 20;

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

        
        // BELLOW: experimental mimic scrollTrigger
        calculateScroll(e) {
            console.log('delta:', e.deltaY);
            this.moveSlide(e.deltaY);
        },

        // move accordingly to scroll 
        moveSlide: function(deltaY) {
            if (this.tl && this.tl.isActive()) {
                return;
            }

            deltaY = deltaY * 10; 

            const sliderEl = document.querySelector(SLIDER_SEL);
            const sliderWidth = document.querySelector(SLIDER_SEL).offsetWidth;
            const currentPosition = Math.abs(parseFloat(this.getTranslateValues(sliderEl).x));
            let newPosition;
            if ((currentPosition + deltaY) > (sliderWidth - window.innerWidth)) {
                newPosition = sliderWidth - innerWidth;
            } else if ((currentPosition + deltaY) < 0) {
                newPosition = 0;
            } else {
                newPosition = currentPosition + deltaY;
            }
            this.tl.to(SLIDER_SEL, {
                duration: .5,
                ease: "power4.out",
                // x:`${-util.vw(100) * slideNumber}`,
                x:`${-newPosition}`,
                // transform: 'translateX(-100vw)'
            })
        },

        /**
         * Gets computed translate values
         * @param {HTMLElement} element
         * @returns {Object}
         */
        getTranslateValues: function(element) {
            const style = window.getComputedStyle(element)
            const matrix = style.transform || style.webkitTransform || style.mozTransform

            // No transform property. Simply return 0 values.
            if (matrix === 'none') {
                return {
                    x: 0,
                    y: 0,
                    z: 0
                }
            }

            // Can either be 2d or 3d transform
            const matrixType = matrix.includes('3d') ? '3d' : '2d'
            const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

            // 2d matrices have 6 values
            // Last 2 values are X and Y.
            // 2d matrices does not have Z value.
            if (matrixType === '2d') {
                return {
                    x: matrixValues[4],
                    y: matrixValues[5],
                    z: 0
                }
            }

            // 3d matrices have 16 values
            // The 13th, 14th, and 15th values are X, Y, and Z
            if (matrixType === '3d') {
                return {
                    x: matrixValues[12],
                    y: matrixValues[13],
                    z: matrixValues[14]
                }
            }
        },

        handleShake: function(status) {
            this.$emit('shake-plane', status);
        }
    },
};
