import Slider from '../../components/Slider';
import Sky from '../../components/Sky';
import Timeline from '../../components/Timeline';
import Util from '../../service/util';

// const util = new Util();
const SLIDER_SEL = '#slider';

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
                    title: 'Segunda Ruta',
                    date: 'Nov 2006',
                    component: 'second-route-slide'
                },
                {
                    title: 'Crece',
                    date: 'Dic 2006',
                    component: 'second-plane-slide'
                },
                {
                    title: 'Nuevo MD',
                    date: 'Dic 2007',
                    component: 'third-plane-slide'
                },
                {
                    title: 'Aviones estratégicos',
                    date: 'Dic 2009',
                    component: 'bombardier-slide'
                },
                {
                    title: 'Airbus',
                    date: 'Ene 2012',
                    component: 'airbus-slide'
                },
                {
                    title: 'Expansión',
                    date: 'May 2017',
                    component: 'boeing-slide'
                },
                {
                    title: 'La Cumbre',
                    date: 'Mar 2018',
                    component: 'the-moment-slide'
                },
                {
                    title: 'Principio del fin',
                    date: 'Ago 2018',
                    component: 'revolution-slide'
                },
                {
                    title: 'Devolución',
                    date: 'Oct 2018',
                    component: 'return-slide'
                },
            ],
            // animationDuration: util.isMobile() ? 2 : 4,
            shakePlane: false,
            //slidesLength: this.slides.length
            util: new Util(),

            isFirstLoad: window.andesTimeline.isFirstLoad,
        };
    },
    computed: {
        slidesLength: function() {
            return this.slides.length;
        }
    },
    mounted() {
        if(this.util.isMobile()) {
            const sliderClass = 'isBlocked';
            document.querySelector(SLIDER_SEL).classList.add(sliderClass);
        }
    },
    methods: {
        onShakePlane: function(status) {
            this.shakePlane = status;
        },

        closeIntro: function() {
            const sliderClass = 'isBlocked';
            document.querySelector(SLIDER_SEL).classList.remove(sliderClass);
            this.$refs.intro.parentElement.removeChild(this.$refs.intro);
        }
    },
};
