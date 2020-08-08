export default {
    props: ['isActive'],
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