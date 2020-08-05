const Store = {
    state: {
        activeSlide: 0
    },

    setActiveSlide: function (value) {
        this.state.activeSlide = value;
    }
}

export default Store;