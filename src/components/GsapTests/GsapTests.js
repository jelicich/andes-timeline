import gsap from 'gsap'

export default {
  name: 'gsap-tests',
  components: {},
  props: [],
  data () {
    return {
      timeline: gsap.timeline()
    }
  },
  computed: {

  },
  mounted () {
  },
  methods: {
    turnPlane() {

      if(this.timeline.isActive()){
        return 
      } else {
        this.timeline.to(this.$refs.plane, {
          duration:0.3,  
          scaleX:0, 
          repeat:1, 
          yoyo:true,
          ease: "power2.inOut",
        })
        .to(this.$refs.timeline, {
          duration:1,
          x:'-=300',
        }, '-=0.3')
      }
        this.$refs.plane.classList.toggle('turn-right');
    }
  }
}