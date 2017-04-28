<template>
    <div class="login">
        <h1>Hello on Kitty-IRC!</h1>

        <form v-on:submit.prevent="connect">

            <div class="input-row">
                <label for="nick">Nick</label>
                <input class="input" id="nick" type="text" v-model="nick">
            </div>

            <div class="input-row">
                <label for="network">Network</label>
                <input class="input" id="network" type="text" v-model="network">
            </div>

            <div class="input-row">
                <label for="channel">Channel</label>
                <input class="input" id="channel" type="text" v-model="channel">
            </div>

            <div v-if="connecting" >
                Connecting to server...
            </div>
            <div v-else>
                <button class="btn btn--connect">Connect</button>
            </div>



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
                nick: 'kittyuser',
                network: 'irc.freenode.net',
                channel: '#kitty-irc',
                connecting: false
            }
        },
        methods: {
            // IRC

            connect() {
                this.connecting = true

                const client = new irc.Client(this.network, this.nick, {
                    autoConnect: false,
                    userName: 'kitty'
                });

                client.connect(1000, (serverReply) => {
                    if (this.channel) {
                        client.join(this.channel, () => {
                            this.$emit('connected', [client]);
                        })
                    } else {
                        this.$emit('connected', [client]);
                    }
                });

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
