<template>
    <h1 class="color">{{ msg }}</h1>
</template>

<style>
    .color {
        color: green;
    }
</style>

<script>
    export default {
        data () {
            return {
                msg: 'Hello kitty-irc!'
            }
        }
    }
</script>
