import Slider from '../../components/Slider';
import Sky from '../../components/Sky';
import Timeline from '../../components/Timeline';
// import Util from '../../service/util';

// const util = new Util();

export default {
    name: 'home',
    components: {
        Slider,
        Sky,
        Timeline
    },
    props: ['animationDuration'],
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
            // animationDuration: util.isMobile() ? 2 : 4,
            shakePlane: false,
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
        onShakePlane: function(status) {
            this.shakePlane = status;
        }
    },
};
