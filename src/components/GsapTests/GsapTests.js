import gsap from 'gsap'

export default {
  name: 'gsap-tests',
  components: {},
  props: [],
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {
  },
  methods: {
    turnPlane() {
        gsap.from(this.$refs.plane, {duration:0.3, skewX:'-20deg', skewY:'-180deg'});
        this.$refs.plane.classList.toggle('turn-right');

    }
  }
}


