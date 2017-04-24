<template>
    <div>
        <h1 class="color">{{ msg }}</h1>
        <p>SCSS: test!</p>
    </div>
</template>

<style lang="scss">
    .color {
        color: green;
    }
    div {
        p {
            font-family: monospace
        }
    }
</style>

<script>
    export default {
        data () {
            return {
                msg: 'Hello Cat!'
            }
        }
    }
</script>
