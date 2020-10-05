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
            tl: gsap.timeline(),
            hasToClear: false,

            clouds: 5,
            hasInit: false,
            picsAmount: 75,
            bgInterval: null,
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
                    if (this.slideNumber > this.state.activeSlide) {
                        this.$emit('shake-plane', false);
                    }
                }
            }
        }
    },
    methods: {
        onActive: function () {
            if(!this.hasInit) {
                this.animateBg();
            }
                
            document.querySelector(BG_SLIDER_SEL).classList.add('isVisible');
            document.querySelector(BG_SLIDER_SEL).classList.add('cloudy');

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
            for(var i = array.length-1; i > 0; i--) {
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
            
            let i = 0;
            this.bgInterval = setInterval(() => {
                if(i == numbers.length) {
                    clearInterval(this.bgInterval);
                    return;
                }
                this.$refs.pic[numbers[i]].style.opacity = 0.35;
                this.$refs.pic[numbers[i]].style.visibility = 'visible';
                i++;
            }, 300)
        }
    }
}


