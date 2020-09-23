import SlideMixin from '../../../mixins/SlideMixin';
import CloudPng from '../../CloudPng';
import InstaPhoto from '../../InstaPhoto';

const BG_SLIDER_SEL = '#slider .custom-background';

export default {
    name: 'revolution-slide',
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

            handler: function() {
                if(this.hasToClear && !this.isActive) {
                    // document.querySelector(BG_SLIDER_SEL).classList.remove('isVisible');
                    // setTimeout(() => {
                    //     document.querySelector(BG_SLIDER_SEL).classList.remove('cloudy');
                    // }, this.duration * 1000)

                    // this.$emit('shake-plane', false);
                }
            }
        }
    },
    methods: {
        onActive: function() {
            // document.querySelector(SLIDER_SEL).classList.add(this.backgroundClass);

            document.querySelector(BG_SLIDER_SEL).classList.add('isVisible');
            document.querySelector(BG_SLIDER_SEL).classList.add('cloudy');
            
            // this.$emit('shake-plane', true);

            this.hasToClear = true;
        },

        getRandomFromRange: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
    }
}


