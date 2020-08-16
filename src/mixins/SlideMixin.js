const BG_SLIDER_SEL = '#slider .custom-background';

export default {
    props: ['isActive', 'duration'],
    data() {
        return {}
    },

    computed: {
        
    },

    mounted() {
        
    },

    watch: {
        isActive: function() {
            this.isActive && this.onActive();
        }
    },

    methods: {

        // @override
        onActive: function() {
            document.querySelector(BG_SLIDER_SEL).classList.remove('isVisible');
            setTimeout(() => {
                document.querySelector(BG_SLIDER_SEL).classList.remove('cloudy');
            }, this.duration * 1000)
        }
    }
}