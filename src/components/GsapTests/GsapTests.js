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
    this.moveTitle();
  },
  methods: {
    moveTitle() {
      gsap.to('#gsap', {
        duration:1, 
        x:200, 
        repeat:-1, 
        delay:1, 
        repeatDelay:1, 
        yoyo:true, 
        ease:"none"
      } )
    }
  }
}


