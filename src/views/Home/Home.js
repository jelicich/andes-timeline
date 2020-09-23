import Slider from '../../components/Slider';
import Sky from '../../components/Sky';
import Timeline from '../../components/Timeline';
import Util from '../../service/util';

// const util = new Util();
const SLIDER_SEL = '#slider';

export default {
    name: 'home',
    components: {
        Slider,
        Sky,
        Timeline
    },
    props: ['animationDuration'],
    data() {
        return {
            slides: [
                {
                    title: '',
                    date: '',
                    component: 'instructions-slide'
                },
                {
                    title: 'Inicio',
                    date: 'Jun 2006',
                    component: 'start-slide'
                },
                {
                    title: 'Segunda Ruta',
                    date: 'Nov 2006',
                    component: 'second-route-slide'
                },
                {
                    title: 'Crece',
                    date: 'Dic 2006',
                    component: 'second-plane-slide'
                },
                {
                    title: 'Nuevo MD',
                    date: 'Dic 2007',
                    component: 'third-plane-slide'
                },
                {
                    title: 'Aviones estratégicos',
                    date: 'Jun 2010',
                    component: 'bombardier-slide'
                },
                {
                    title: 'Airbus',
                    date: 'Ene 2012',
                    component: 'airbus-slide',
                    miscs: [{
                        icon: 'mdi-home-heart',
                        content: `<strong>OCT 2012:</strong> A partir de 2012 y durante 2013, 2014, 2015 y 2017 colaboramos con la organización <strong>Un techo para mi país</strong> transportando donaciones y ayudando en la construcción de las casas.
                        <img src="${require('../../assets/techo.png')}" height="200"/>`
                    }, {
                        icon: 'mdi-music',
                        content: '<strong>DIC 2012:</strong> Transportamos al equipo técnico de <strong>Madonna</strong> en los destinos sudamericanos de la gira MDNA World Tour.'
                    }]
                },
                {
                    title: 'Mundial Brasil',
                    date: 'Jul 2014',
                    component: 'world-cup-slide',
                    miscs: [{
                        icon: 'mdi-car',
                        content: `<strong>ENE 2014 / 2015 / 2016 / 2017:</strong> La aerolínea fue contratada para trasladar a los equipos del <strong>Rally Dakar</strong>, periodistas y miembros de la organización entre los distintos tramos del territorio argentino, así como por <strong>Bolivia y Chile</strong>.
                        <img src="${require('../../assets/dakar.jpg')}" height="200"/>`
                    }, {
                        icon: 'mdi-music',
                        content: `<strong>ABR 2014:</strong> Trasladamos a los músicos y equipo técnico de <strong>Paul McCartney</strong> durante el tour Out There! por latinoamerica (Uruguay, Chile, Perú, Ecuador y Costa Rica).`
                    }]
                },
                {
                    title: 'Expansión',
                    date: 'May 2017',
                    component: 'boeing-slide',
                    miscs: [{
                        icon: 'mdi-soccer',
                        content: `<strong>OCT 2017:</strong> Acompañamos a la Selección Argentina de Fútbol en las eliminatorias rumbo a Rusia 2018.
                        <img src="${require('../../assets/eliminatorias.jpg')}" height="200"/>`
                    },{
                        icon: 'mdi-music',
                        content: `<strong>NOV 2017:</strong> Transportamos a los músicos y técnicos de <strong>Bruno Mars</strong> durante la gira por América Latina (Brasil, Chile, Perú, Ecuador, Colombia y Costa Rica).
                        <img src="${require('../../assets/bruno-mars.jpg')}" height="200"/>`
                    }]
                },
                {
                    title: 'La Cumbre',
                    date: 'Mar 2018',
                    component: 'the-moment-slide',
                },
                {
                    title: 'Malvinas',
                    date: 'Abr 2018',
                    component: 'malvinas-slide',
                    miscs: [{
                        icon: 'mdi-motorbike',
                        content: `<strong>ABR 2018:</strong> Llevamos a los pilotos y equipos del <strong>Moto GP</strong>. En el año 2019 volvimos a hacer estos vuelos.`
                    }]
                },
                {
                    title: 'Principio del fin',
                    date: 'Ago 2018',
                    component: 'revolution-slide',
                    miscs: [{
                        icon: 'mdi-school',
                        content: `<strong>2018:</strong> Durante cuatro años fuimos una parte importante de la operativa de los viajes de egresados de <strong>TravelRock</strong> a Bariloche, transportando más de 250.000 estudiantes desde las diferentes provincias del país.
                        <img src="${require('../../assets/travel-rock.jpg')}" height="160"/>`
                    }]
                },
                {
                    title: 'Devolución',
                    date: 'Oct 2018',
                    component: 'return-slide',
                    miscs: [{
                        icon: 'mdi-music',
                        content: `<strong>MAR 2019:</strong> Realizamos la gira por latinoamerica transportando al equipo técnico de <strong>Luis Miguel</strong> en el tour "México por siempre". (Chile, Argentina, Paraguay, Perú, Colombia, Panamá, Costa Rica, El Salvador, Guatemala, República Dominicana, Puerto Rico).
                        <img src="${require('../../assets/luis-miguel.jpg')}" height="160"/>`
                    }]
                },
                {
                    title: 'Deuda',
                    date: 'Nov 2019',
                    component: 'debt-slide'
                },
                {
                    title: 'Pandemia',
                    date: 'Mar 2020',
                    component: 'pandemic-slide'
                },
                {
                    title: '#TodosSomosAndes',
                    date: 'HOY',
                    component: 'last-slide'
                },
            ],
            // animationDuration: util.isMobile() ? 2 : 4,
            shakePlane: false,
            //slidesLength: this.slides.length
            util: new Util(),

        };
    },
    computed: {
        slidesLength: function() {
            return this.slides.length;
        }
    },
    mounted() {

    },
    methods: {
        onShakePlane: function(status) {
            this.shakePlane = status;
        },

        closeIntro: function() {
            const sliderClass = 'isBlocked';
            document.querySelector(SLIDER_SEL).classList.remove(sliderClass);
            this.$refs.intro.parentElement.removeChild(this.$refs.intro);
        }
    },
};
