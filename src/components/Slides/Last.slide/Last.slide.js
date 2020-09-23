import SlideMixin from '../../../mixins/SlideMixin';
import CloudPng from '../../CloudPng';
import InstaPhoto from '../../InstaPhoto';

import gsap from 'gsap';

const BG_SLIDER_SEL = '#slider .custom-background';

export default {
    name: 'last-slide',
    mixins: [SlideMixin],
    components: {
        CloudPng,
        InstaPhoto
    },
    props: [],
    data() {
        return {
            state: this.$store.state,
            // backgroundClass: 'cloudy',
            tl: gsap.timeline(),
            hasToClear: false,

            clouds: 5,
            hasInit: false,
            picsAmount: 75,
        };
    },
    computed: {
        shuffledPicturesArray: function () {
            let numbers = Array.from(Array(this.picsAmount)).map((v,i) => {
                return i
            })

            return this.shuffleArray(numbers);
        },
    },
    mounted() {
    },
    watch: {
        state: {
            deep: true,

            handler: function () {
                if (this.hasToClear && !this.isActive) {
                    // document.querySelector(BG_SLIDER_SEL).classList.remove('isVisible');
                    // setTimeout(() => {
                    //     document.querySelector(BG_SLIDER_SEL).classList.remove('cloudy');
                    // }, this.duration * 1000)

                    if (this.slideNumber > this.state.activeSlide) {
                        this.$emit('shake-plane', false);
                    }

                }
            }
        }
    },
    methods: {
        onActive: function () {
            // document.querySelector(SLIDER_SEL).classList.add(this.backgroundClass);
            if(!this.hasInit) {
                this.animateBg();
            }
                
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

            setTimeout(() => {
                this.$emit('shake-plane', true);
                this.hasToClear = true;
            }, this.duration * 1001)

            this.hasInit = true;
        },

        getRandomFromRange: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },

        shuffleArray: function (arr) {
            const array = [...arr];
            for(var i = array.length-1; i >= 0; i--) {
                const target = this.getRandomFromRange(0,i);
                
                const tempTo = array[target];
                array[target] = array[i];
                array[i] = tempTo;
            }
            return array;
        },

        animateBg: function () {
            let numbers = Array.from(Array(this.picsAmount)).map((v,i) => {
                return i
            })

            numbers = this.shuffleArray(numbers);

            // shuffle
            // for(var i = this.picsAmount-1; i >= 0; i--) {
            //     const target = this.getRandomFromRange(0,i);
                
            //     const tempTo = numbers[target];
            //     numbers[target] = numbers[i];
            //     numbers[i] = tempTo;
            // }

            setTimeout((() => {
                numbers.map((n, i) => {
                    setTimeout((() => {
                        this.$refs.pic[n].style.opacity = 0.35;
                        this.$refs.pic[n].style.visibility = 'visible';
                    }).bind(this), i * 300)
                })
            }).bind(this), this.duration); 
        }

    }
}


