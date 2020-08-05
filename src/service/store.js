const Store = {
    state: {
        activeSlide: 0,
        totalSlides: 0
    },

    setActiveSlide: function (value) {
        this.state.activeSlide = value;
    },

    setTotalSlides: function (value) {
        this.state.totalSlides = value;
    }
}

export default Store;