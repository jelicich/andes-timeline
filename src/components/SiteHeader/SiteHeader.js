const SLIDER_SEL = '#slider';

export default {
    name: 'site-header',
    components: {},
    props: [],
    data() {
        return {
            drawer: false,
        }
    },
    computed: {

    },
    watch: {
        drawer: function() {
            const sliderClass = 'isBlocked';
            const slider = document.querySelector(SLIDER_SEL)
            slider && slider.classList.toggle(sliderClass, this.drawer);
        }
    },
    mounted() {
    },
    methods: {
    }
}


