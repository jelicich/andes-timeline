import Test from '../../components/test';
import GsapTest from '../../components/GsapTests';
import Slider from '../../components/Slider';
import Sky from '../../components/Sky';

export default {
    name: 'home',
    components: {
        Test,
        GsapTest,
        Slider,
        Sky
    },
    props: [],
    data() {
        return {
            slides: [
                'start-slide',
                'second-plane-slide'
            ],
            //slidesLength: this.slides.length
        };
    },
    computed: {
        slidesLength: function() {
            return this.slides.length;
        }
    },
    mounted() {
        
    },
    methods: {

    },
};
