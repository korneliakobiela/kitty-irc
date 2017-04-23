var Vue = require('vue');
var App = require('./app.vue');


new Vue({
    el: '#kitty-irc-app',
    render: function (createElement) {
        return createElement(App);
    }
});
