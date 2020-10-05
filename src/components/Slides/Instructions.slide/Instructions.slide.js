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
        today: function () {
            let date = new Date()

            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            let d;
            if (month < 10) {
                d = `${day}-0${month}-${year}`;
            } else {
                d = `${day}-${month}-${year}`;
            }
            return d;
        },

        debtMonths: function() {
            let d1 = new Date('11-1-2019');
            let d2 = new Date();
            let months;
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months -= d1.getMonth();
            months += d2.getMonth();
            return months <= 0 ? 0 : months;
        }
    },
    mounted() {

    },
    methods: {
        start: function() {
            window.goTo(1);
        },
    }
}


