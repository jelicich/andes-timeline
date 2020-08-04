import gsap from 'gsap';
import StartSlide from '../Slides/Start.slide'
import SecondPlaneSlide from '../Slides/SecondPlane.slide'
import Cloud from '../Cloud'
import Util from '../../service/util';

const util = new Util();
const SLIDER_SEL = '#slider';

export default {
    name: 'slider',
    components: {
        StartSlide,
        SecondPlaneSlide,
        Cloud
    },
    props: [],
    data() {
        return {
            tl: gsap.timeline(),
            // TweenLite.defaultEase = Power2.easeInOut;
            activeSlide: 0,
            oldSlide: 0,
            
            slides: [
                'start-slide',
                'second-plane-slide'
            ]
            // slides: [
            //     {
            //         titleTemplate: '<h1><p>Inicio de operaciones</p>',
            //         description: 'Andes fue autorizada a realizar servicios no regulares domesticos e internacionales',
            //         date: '06-2006',
            //         link: 'https://www.gacetaeronautica.com/gaceta/wp-101/?p=30927'
            //     },
            //     {
            //         title: '2 Pasa algo mas',
            //         description: 'Se describe algo mas',
            //         date: '09-2008',
            //     },
            //     {
            //         title: '3 No pasa nada',
            //         description: 'No se describe algo',
            //         date: '12-2010',
            //     },
            //     {
            //         title: '4 Se acabó',
            //         description: 'Todo, todillo',
            //         date: '02-2020',
            //     },
            // ],
        };
    },
    computed: {

    },
    mounted() {
        console.log('mounter')
        window.addEventListener('wheel', this.moveSlide);
    },
    methods: {
        moveSlide: function(e) {
            // if the container is animating the wheel won't work
            if (this.tl && this.tl.isActive()) {
                return;
            }
            // temp variable to see if we're at the beginning or end
            this.oldSlide = this.activeSlide;
            // which way did we scroll the mousewheel
            this.activeSlide = e.deltaY > 0 ? (this.activeSlide += 1) : (this.activeSlide -= 1);
            // are we at the beginning of the slides?
            this.activeSlide = this.activeSlide < 0 ? 0 : this.activeSlide;
            // are we at the end of the slides?
            this.activeSlide = this.activeSlide > this.slides.length - 1 ? this.slides.length - 1 : this.activeSlide;
            // if at the beginning or end there is nothing to animate
            if (this.oldSlide === this.activeSlide) {
                return;
            }
            // if not at the beginning or end, we can animate the container 
            // and the targets to the new position
            //this.tl = new TimelineMax();
            //this.tl.to(SLIDER_SEL, 0.4, { xPercent: -100 / slides.length * activeSlide });
            this.tl.to(SLIDER_SEL, {
                duration:4,
                ease: "power4.out",
                // ease: CustomEase.create("custom", "M0,0 C0,0 0.334,0.042 0.5,0.5 0.628,0.966 1,1 1,1 "),
                // xPercent: -100 / this.slides.length * this.activeSlide
                // x: '-=300',
                x:`${-util.vw(100) * this.activeSlide}`,
                // transform: 'translateX(-100vw)'
            })

        }
    },
};
