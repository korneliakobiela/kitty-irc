<template lang="html">
    <section id="chat-users" class="chat-users">
        <header>
            Użytkownicy:
        </header>
        <ul  class="chat-user-list">
            <li v-for="nick in nicks">
                {{nick}}
            </li>
        </ul>
    </section>
</template>

<script>
export default {

    data() {
        return {
            nicks:[]
        }
    },

    props: ['client'],

    created() {
        this.client.addListener('names',function (channel, nicks) {
            //TODO: Refactoring
            console.log(Object.keys(nicks));
        });
        //this.client.addLisstener('names', this.onNames);
    },

    methods: {
        onNames(channel, nicks) {
            Object.keys(nicks.forEach(
                //TODO
            );
        }
    }
}
</script>

<style lang="scss">

</style>
