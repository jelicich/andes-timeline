import Test from '../../components/test';
import GsapTest from '../../components/GsapTests';
import Slider from '../../components/Slider';
import Sky from '../../components/Sky';
import Timeline from '../../components/Timeline';

export default {
    name: 'home',
    components: {
        Test,
        GsapTest,
        Slider,
        Sky,
        Timeline
    },
    props: [],
    data() {
        return {
            slides: [
                {
                    title: 'Inicio',
                    date: 'Jun 2006',
                    component: 'start-slide'
                },
                {
                    title: 'Crece',
                    date: 'Dic 2006',
                    component: 'second-plane-slide'
                },
                {
                    title: '"Revolución"',
                    date: 'Jun 2017',
                    component: 'revolution-slide'
                },
            ],
            animationDuration: 4
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
