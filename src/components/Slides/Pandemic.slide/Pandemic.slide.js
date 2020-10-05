import SlideMixin from '../../../mixins/SlideMixin';
import CloudPng from '../../CloudPng';
import InstaPhoto from '../../InstaPhoto';

import gsap from 'gsap';

const BG_SLIDER_SEL = '#slider .custom-background';

export default {
    name: 'pandemic-slide',
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
        };
    },
    computed: {

    },
    mounted() {
    },
    watch: {
        state: {
            deep: true,

            handler: function () {
                if (this.hasToClear && !this.isActive) {
                    if(this.slideNumber > this.state.activeSlide+2) {
                        this.$emit('shake-plane', false);
                    }
                }
            }
        }
    },
    methods: {
        onActive: function () {

            document.querySelector(BG_SLIDER_SEL).classList.add('isVisible');
            document.querySelector(BG_SLIDER_SEL).classList.add('cloudy');

            setTimeout(() => {
                this.$emit('shake-plane', true);
                this.hasToClear = true;
            }, this.duration * 1001)
        },

        getRandomFromRange: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
    }
}
