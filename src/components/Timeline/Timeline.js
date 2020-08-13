import gsap from 'gsap';
import { TimelineMax, TweenLite, Power1 } from 'gsap';
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
    props: ['slides', 'duration', 'shakePlane'],
    data() {
        return {
            state: this.$store.state,
            timeline: gsap.timeline(),
            // liWidth: variables.timelineElementWidth,
            liWidth: 300, // TODO import from css???
            turnDuration: 2.5,
            previousSlide: this.$store.state.activeSlide,
            previousDirection: FORWARD,
            direction: null,

            scene: null,
            camera: null,
            renderer: null,
            plane: null,

            canvasHeight: 400,

            shakeTl: new TimelineMax({repeat:-1}),
            hasTurned: false,
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
        },

        shakePlane: function() {
            this.onShakePlaneChange();
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

                this.camera.updateProjectionMatrix();
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

                this.timeline.eventCallback("onComplete", () => {
                    if(this.hasTurned) {
                        console.log('rotation reset');
                        this.plane.rotation.x = 0;
                        this.plane.rotation.z = 0;    
                        this.hasTurned = false;
                    }
                });
            })
        },

        render: function() {
            requestAnimationFrame(this.render);
            this.renderer.render(this.scene, this.camera);
        },

        moveTimeline: function(slideNumber) {

            if(this.direction !== this.previousDirection) {
                
                if(this.direction === BACKWARD) {
                    this.turnPlaneBackwards();
                } else {
                    this.turnPlaneForward();
                }

                // sorry future me for this calculations
                this.timeline.to(this.$refs.timeline, {
                    duration: ((this.duration / 2) + (this.duration * 0.25 / 2)), // magic do not touch
                    x:`${-this.liWidth * slideNumber}`,
                }, '-=' + ((this.duration / 2) + (this.duration * 0.25 / 2)) /2) // magic do not touch

            } else {
                this.timeline.to(this.$refs.timeline, {
                    duration: this.duration,
                    x:`${-this.liWidth * slideNumber}`,
                })
            }

            this.previousSlide = slideNumber;
            this.previousDirection = this.direction;            
            
        },

        turnPlaneBackwards: function() {
            const tau = Math.PI * 2;
            this.hasTurned = true;
            this.timeline.to(this.plane.rotation, {
                    duration: this.duration / 2,
                    x: tau * .10, 
                    y: tau * .25, 
                    z: -tau * .25, 
                    ease: 'power1.inOut'
                },)
                .to(this.plane.position, {
                    duration: this.duration / 2,
                    x: -20,
                    ease: 'power1.inOut',
                }, '-=' + this.duration / 2)
                .to(this.plane.position, {
                    duration: this.duration * 0.4,
                    z: 95,
                    x: -30,
                    ease: 'power1.inOut',
                }, '-=' + this.duration * 0.4)
                .to(this.plane.position, {
                    duration: this.duration * 0.25,
                    x: 0,
                    ease: 'power1.inOut',
                }, '-=' + this.duration * 0.25)
                .to(this.plane.position, {
                    duration: this.duration * 0.25,
                    z: 0,
                    ease: 'power1.inOut',
                }, '-=' + this.duration * 0.25 / 2)
                .to(this.plane.rotation, {
                    duration: this.duration * 0.25,
                    x: tau * .25, 
                    ease: 'power1.inOut',
                }, '-=' + this.duration * 0.25)  
        },

        turnPlaneForward: function() {
            const tau = Math.PI * 2;
            this.hasTurned = true;
            this.timeline.to(this.plane.rotation, {
                    duration: this.duration / 2,
                    x: tau * 0.10,
                    y: -tau * .25,
                    z: tau * 0.25,
                    ease: 'power1.inOut'
                })
                .to(this.plane.position, {
                    duration: this.duration / 2,
                    x: 20,
                    ease: 'power1.inOut',
                }, '-=' + this.duration / 2)
                .to(this.plane.position, {
                    duration: this.duration * 0.4,
                    z: 95,
                    x: 30,
                    ease: 'power1.inOut',
                }, '-=' + this.duration * 0.4)
                .to(this.plane.position, {
                    duration: this.duration * 0.25,
                    x: 0,
                    ease: 'power1.inOut',
                }, '-=' + this.duration * 0.25)
                .to(this.plane.position, {
                    duration: this.duration * 0.25,
                    z: 0,
                    ease: 'power1.inOut',
                }, '-=' + this.duration * 0.25 / 2)
                .to(this.plane.rotation, {
                    duration: this.duration * 0.25,
                    x: tau * .25, 
                    ease: 'power1.inOut',
                }, '-=' + this.duration * 0.25)
        },

        goTo: function(slide) {
            if(this.timeline.isActive()) {
                return;
            }

            if(slide < 0 || slide > this.slides.length -1) {
                return;
            }
            this.$store.setActiveSlide(slide);
        },

        onShakePlaneChange: function() {
            console.log('plane shake', this.shakePlane);
            if(this.shakePlane) {
                
                if(this.timeline.isActive()) {
                    setTimeout(() => {
                        this.onShakePlaneChange();
                    }, this.duration * 1001);

                    return;
                }
                
                const tau = Math.PI * 2;

                this.shakeTl
                    .to(this.plane.rotation, 0.2, { 
                        x: tau * 0.003, 
                        y: '+=' + tau * 0.003, 
                        z: tau * 0.006, 
                        // ease:Power1.easeInOut
                    })
                    .to(this.plane.rotation, 0.4, { 
                        x: -tau * 0.006,
                        y: '+=' + -tau * 0.006,  
                        z: -tau * 0.012,
                        // ease:Power1.easeInOut
                    })
                    .to(this.plane.rotation, 0.2, { 
                        x: 0, 
                        y: '+=' + tau * 0.003, 
                        z: 0, 
                        // ease:Power1.easeInOut
                    })
        
                TweenLite.to(this.plane.rotation, 27, {ease:Power1.easeInOut})
                TweenLite.to(this.plane.position, {ease:Power1.easeInOut})
            } else {
                this.shakeTl.clear();
            }
        }
    }
}
