import gsap from 'gsap';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
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
            direction: null,

            scene: null,
            camera: null,
            renderer: null,
            plane: null,

            canvasHeight: 400,
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
        this.initPlane();
    },
    methods: {

        initPlane: function() {
            this.setupScene();
            this.setupModel();
        },

        setupScene: function() {
            this.scene = new THREE.Scene();
            
            this.camera = new THREE.PerspectiveCamera(
                40,
                window.innerWidth / this.canvasHeight, // window.innerWidth / window.innerHeight,
                1,
                5000
            )
            
            // this.camera.rotation.x = -90/180*Math.PI;
            this.camera.position.x = 0;
            this.camera.position.y = -17;
            this.camera.position.z = -80;

            const light = new THREE.AmbientLight(0x404040, 0.5);
            this.scene.add(light);

            const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
            dirLight.position.set(0, 500, 0);
            dirLight.castShadow = true;
            this.scene.add(dirLight);

            const povLight = new THREE.PointLight(0xffffff, 0.4);
            povLight.position.set(0, 0, -500);
            this.scene.add(povLight);

            const frontLight = new THREE.PointLight(0xffffff, 0.5);
            frontLight.position.set(-200, 200, 0);
            this.scene.add(frontLight);

            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });

            // this.renderer.setClearColor( 0x000000, 0 ); // the default
            // this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setSize(window.innerWidth, this.canvasHeight);
            this.renderer.setPixelRatio(window.devicePixelRatio)
            
            document.body.appendChild(this.renderer.domElement);

            window.addEventListener('resize', () => {
                this.renderer.setSize(window.innerWidth, this.canvasHeight);
                this.camera.aspect = window.innerWidth / this.canvasHeight;

                this.camera.updateProjectMatrix();
            })
        },

        setupModel: function() {
            const loader = new GLTFLoader();
            loader.load('/plane-model/md80.glb', (gltf) => {
                const md = gltf.scene.children[0];
                this.camera.lookAt(md.position);
                this.plane = gltf.scene;
                window.scene = gltf.scene;
                gltf.scene.rotation.y = -90/180*Math.PI;
                gltf.scene.position.y = -17;
                this.scene.add(gltf.scene);
                
                this.render();
            })
        },

        render: function() {
            requestAnimationFrame(this.render);
            this.renderer.render(this.scene, this.camera);
        },

        moveTimeline: function(slideNumber) {
            let tau = Math.PI * 2;

            if(this.direction !== this.previousDirection) {
                
                if(this.direction === BACKWARD) {
                    this.timeline.to(this.plane.rotation, {
                        // duration: .5,
                        // x: tau * .05, 
                        // ease: 'power1.inOut'
                    }).to(this.plane.rotation, {
                        duration: 2,
                        x: tau * .10, 
                        y: tau * .25, 
                        z: -tau * .25, 
                        ease: 'power1.inOut'
                    }, '-=0.5').to(this.plane.position, {
                        duration: 1.8,
                        z: 75,
                        x: -20,
                        ease: 'power1.inOut',
                    }, '-=1.8').to(this.plane.position, {
                        duration: 1,
                        x: 0,
                        ease: 'power1.inOut',
                    }, '-=0.5').to(this.plane.position, {
                        duration: 1,
                        z: 0,
                        ease: 'power1.inOut',
                    }, '-=0.5').to(this.plane.rotation, {
                        duration: 1,
                        x: tau * .25, 
                        ease: 'power1.inOut',
                    }, '-=1').to(this.$refs.timeline, {
                        duration: this.duration - this.turnDuration,
                        x:`${-this.liWidth * slideNumber}`,
                    },'-=1')
                } else {
                    // FORWARD
                    this.timeline.to(this.plane.rotation, {
                        duration: 0.2,
                        // x: '+=' + tau * .05, 
                        ease: 'power1.inOut'
                    }).to(this.plane.rotation, {
                        duration: 1.8,
                        x: 0, // '+=' + tau * .25,
                        y: -90/180*Math.PI, // plane is rotated when loaded to show it from the side. this is the original position
                        z: 0,
                         
                        ease: 'power1.inOut'
                    }, '-=0.1').to(this.plane.position, {
                        // duration: 1.8,
                        // z: 50,
                        // ease: 'power1.inOut',
                    }, '-=1.8').to(this.plane.position, {
                        // duration: 1,
                        // z: 0,
                        // ease: 'power1.inOut',
                    }, '-=0').to(this.plane.rotation, {
                        // duration: 1,
                        // x: -tau * .25, 
                        // ease: 'power1.inOut',
                    }, '-=1').to(this.$refs.timeline, {
                        duration: this.duration - this.turnDuration,
                        x:`${-this.liWidth * slideNumber}`,
                    },'-=1')
                }
                

            } else {
                this.timeline.to(this.$refs.timeline, {
                    duration: this.duration,
                    // x:'-=300',
                    x:`${-this.liWidth * slideNumber}`,
                })
            }
            this.previousSlide = slideNumber;
            this.previousDirection = this.direction;            
            
        },

        goTo: function(slide) {
            if(this.timeline.isActive()) {
                return
            }
            this.$store.setActiveSlide(slide);
        }
    }
}


