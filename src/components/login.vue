<template>
    <div class="login">
        <h1>Hello on Kitty-IRC!</h1>

        <form v-on:submit.prevent="connect">

            <div class="input-row">
                <label for="nick">Nick</label>
                <input class="input" id="nick" type="text" :value="nick">
            </div>

            <div class="input-row">
                <label for="network">Network</label>
                <input class="input" id="network" type="text" :value="network">
            </div>

            <button class="btn btn--connect">Connect</button>

        </form>

    </div>
</template>

<style lang="scss" scoped>
    .login {
        font-family: 'Roboto';
        text-align: center;
    }
    .input {
        padding: 5px;
        margin-left: 5px;
    }
    .input-row {
        text-align: right;
        width: 260px;
        margin: 10px auto;
    }
    .btn--connect {
        margin-top: 5px;
    }
</style>

<script>
    export default {
        data () {
            return {
                nick: 'lorem',
                network: 'freenode'
            }
        },
        methods: {
            // IRC

            connect() {
                // TODO
                var client = new irc.Client('chat.freenode.net', 'kitty-irc-user', {
                    channels: ['#pasjainformatyki'],
                });

                client.join('#pasjainformatyki')

                client.addListener('message', function (from, to, message) {
                    console.log(from + ' => ' + to + ': ' + message);
                });
                // if connected to irc network
                this.$emit('connect', true) // tyutaj trzeba wystawic referencje do obiektu client, i zlapac ja w app component
            },

            // NETWORK
            editNetworks() {
                // TODO
            },

            // USER
            autosaveNick() {
                // TODO
            }
        }
    }
</script>
