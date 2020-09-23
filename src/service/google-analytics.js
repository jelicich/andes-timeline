const GoogleAnalyticsService = {
    actions: {
        CLICKED: 'clicked',
        NAVIGATED: 'navigated',
        SCROLLED_TO: 'scrolledTo',
    },

    hasStarted: false,

    init: function () {
        const _gaq = window._gaq = window._gaq || [];
        _gaq.push(['_setAccount', 'UA-178736506-1']);
        _gaq.push(['_trackPageview']);
      
        (function() {
          var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
          ga.src = 'https://ssl.google-analytics.com/ga.js';
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
       
        this.hasStarted = true;
    },

    trackEvent: function(action, value) {
        window._gaq.push(['_trackEvent', value, action]);
    },

    formatValue: function(chipData) {
        const filterName = Object.keys(chipData)[0];
        const filterValue = chipData[filterName].map(filter => filter.label).join(',');
        return `${filterName}: ${filterValue}`;
    }
}

export default GoogleAnalyticsService
