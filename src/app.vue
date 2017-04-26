<template>
    <div>
        <div v-if="connected">
            kitty-irc component<br>
            | <br>
            +-- channel chat <br>
            +-- private chat <br>
            +-- ... <br>
        </div>
        <login v-else @connect="connected = true"></login>
    </div>
</template>

<style lang="scss">
    body {
        /*font-family: 'Roboto', sans-serif;*/
        font-family: 'Roboto Mono', monospace;
    }
    .btn {
        cursor: pointer;
    }
</style>

<script>
    import login from './components/login.vue'
    export default {
        data () {
            return {
                connected: false
            }
        },
        components: {
            login
        }
    }
</script>
