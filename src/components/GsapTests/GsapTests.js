import gsap from 'gsap';

export default {
  name: 'gsap-tests',
  components: {},
  props: [],
  data() {
    return {

    };
  },
  computed: {

  },
  mounted() {
  },
  methods: {
    turnPlane() {
      gsap.to(this.$refs.plane, {
        duration: 0.3,
        scaleX: 0,
        repeat: 1,
        yoyo: true,
        ease: 'power2.inOut',
      });
      this.$refs.plane.classList.toggle('turn-right');
    },
  },
};
