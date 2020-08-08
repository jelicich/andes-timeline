import gsap from 'gsap';
// import Util from '../../service/util';
// import variables from '../../styles/variables.scss';

// const util = new Util();
const FORWARD = 'forward';
const BACKWARD = 'backward';

export default {
    name: 'timeline',
    components: {},
    props: ['slides', 'duration'],
    data() {
        return {
            state: this.$store.state,
            timeline: gsap.timeline(),
            // liWidth: variables.timelineElementWidth,
            liWidth: 300, // TODO import from css???
            turnDuration: 0.2,
            previousSlide: this.$store.state.activeSlide,
            previousDirection: FORWARD,
            direction: null
        }
    },
    computed: {

    },
    watch: {
        state: {
            deep: true,

            handler: function() {
                this.direction = this.state.activeSlide > this.previousSlide ? FORWARD : BACKWARD;
                this.moveTimeline(this.state.activeSlide);
            }
        }
    },
    mounted() {

    },
    methods: {
        // turnPlane() {
            
        //     if(this.timeline.isActive()){
        //         return 
        //     } else {
        //         this.timeline.to(this.$refs.plane, {
        //             duration:0.3,  
        //             scaleX:0, 
        //             repeat:1, 
        //             yoyo:true,
        //             ease: "power2.inOut",
        //         })
        //         .to(this.$refs.timeline, {
        //             duration:1,
        //             x:'-=300',
        //         },0)
        //     }
        //     this.$refs.plane.classList.toggle('turn-right');
        // },

        moveTimeline: function(slideNumber) {
            if(this.direction !== this.previousDirection) {
                this.timeline.to(this.$refs.plane, {
                    duration: this.turnDuration,  
                    scaleX: 0, 
                    repeat: 1, 
                    yoyo:true,
                    ease: "power2.inOut",
                }).to(this.$refs.timeline, {
                    duration: this.duration - this.turnDuration,
                    // x:'-=300',
                    x:`${-this.liWidth * slideNumber}`,
                },'+=0')

                this.$refs.plane.classList.toggle('turn-right');    
            } else {
                this.timeline.to(this.$refs.timeline, {
                    duration: this.duration,
                    // x:'-=300',
                    x:`${-this.liWidth * slideNumber}`,
                })
            }
            this.previousSlide = slideNumber;
            this.previousDirection = this.direction;            
            // if(this.timeline.isActive()){
            //     return 
            // } else {
            //     this.timeline.to(this.$refs.timeline, {
            //         duration: this.duration,
            //         // x:'-=300',
            //         x:`${-this.liWidth * slideNumber}`,
            //     })
            // }
        },

        goTo: function(slide) {
            if(this.timeline.isActive()) {
                return
            }
            this.$store.setActiveSlide(slide);
        }
    }
}


