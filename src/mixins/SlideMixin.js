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
        onActive: function() {}
    }
}