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
            console.log('changed drawer')
            const sliderClass = 'isBlocked';
            document.querySelector(SLIDER_SEL).classList.toggle(sliderClass, this.drawer);
        }
    },
    mounted() {
    },
    methods: {
    }
}


