<template lang="html">
    <section id="chat-users" class="chat-users">
        <header>
            {{users}}
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
            users: 'Użytkownicy',
            nicks:[]
        }
    },

    props: ['client'],

    created() {
        this.client.addListener('names',this.onNames);
        //this.client.addLisstener('names', this.onNames);
    },

    methods: {
        onNames(channel, nicks) {
            Object.keys(nicks).forEach(this.addNick);
        },
        addNick(element) {
            this.nicks.push(element);
        }
    }
}
</script>

<style lang="scss">

</style>
