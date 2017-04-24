import Vue from 'vue';
import App from './app.vue';

new Vue({
    el: '#kitty-irc-app',
    render: function (createElement) {
        return createElement(App);
    }
});
