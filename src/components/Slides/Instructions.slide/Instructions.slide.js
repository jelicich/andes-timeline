import SlideMixin from '../../../mixins/SlideMixin'

export default {
    name: 'start-slide',
    mixins: [SlideMixin],
    components: {},
    props: [],
    data() {
        return {

        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        start: function() {
            window.goTo(1);
        },
    }
}


