<template>
    <div >
        <kitty-irc v-if="connected" :client="client"></kitty-irc>
        <login v-else @connected="connect"></login>
    </div>
</template>

<script>
    import login from './components/login.vue';
    import kittyIrc from './components/kitty-irc.vue';

    export default {
        data () {
            return {
                connected: false,
                client: null
            }
        },

        components: {
            login,
            kittyIrc
        },

        methods: {
            connect(args) {
                const client = args[0];

                this.connected = true;
                this.client = client;
            }
        }
    }


</script>

<style lang="scss">
    body {
        /*font-family: 'Roboto', sans-serif;*/
        font-family: 'Roboto Mono', monospace;
    }
    .btn {
        cursor: pointer;
    }
</style>
