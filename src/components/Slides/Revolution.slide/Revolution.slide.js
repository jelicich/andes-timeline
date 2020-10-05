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
            hasToClear: false,
            clouds: 5,
        };
    },
    computed: {

    },
    mounted() {
    },
    watch: {

    },
    methods: {
        onActive: function() {

            document.querySelector(BG_SLIDER_SEL).classList.add('isVisible');
            document.querySelector(BG_SLIDER_SEL).classList.add('cloudy');

            this.hasToClear = true;
        },

        getRandomFromRange: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
    }
}


