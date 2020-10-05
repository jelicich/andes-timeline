import SlideMixin from '../../../mixins/SlideMixin'
import Util from '../../../service/util';
import gsap from 'gsap';

export default {
    name: 'start-slide',
    mixins: [SlideMixin],
    components: {},
    props: [],
    data() {
        return {
            util: new Util(),
            timeline: gsap.timeline(),
        }
    },
    computed: {

    },
    mounted() {
        
    }, 
    methods: {
        onActive: function() {
            setTimeout(()=> {
                this.timeline.to('.start-slide .instructions', {
                    opacity: 0,
                    duration: 3,
                    ease: 'power1.inOut'
                })
            },10 * 1000)
        }
    }
}


