<template lang="html">
    <div class="chatlist-box">
        <ul>
            <li v-for="channel in channels" class="channel">
                {{channel.name}}
            </li>
        </ul>
    </div>
</template>

<style lang="scss">
body {
    /*font-family: 'Roboto', sans-serif;*/
    font-family: 'Roboto Mono', monospace;
}


</style>

<script>
export default {
    data () {
        return {
            channels:[

            ]
        }
    },
    methods: {
        addChannel(){
            //TODO
        },
        removeChannel(){
            //TODO
        }
    }
}
</script>
