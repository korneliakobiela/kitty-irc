<template lang="html">
    <div>
        <ul class="chatlist">
            <li v-for="chatName in chatList" class="chatlist__item">
                {{chatName}}
            </li>
        </ul>
        <div class="chat">
            <div class="chat__lines">
                <div v-for="line in lines">
                    <div class="chat__line">
                        <div class="chat__nick">
                            {{ line.nick }}
                        </div>
                        <div class="chat__msg">
                            {{ line.msg }}
                        </div>
                    </div>
                </div>
            </div>
            {{ this.client.nick }}: <input type="text" @keydown.enter="sendMsg">
        </div>
    </div>
</template>

<style lang="scss">
    .chat {
        &__lines {
            padding: 15px 0;
            margin: 10px 0;
            border-bottom: 1px solid black;
            border-top: 1px solid black;
        }

        &__line {
            display: flex;
        }

        &__nick {
            width: 110px;

            text-align: right;
            color: tomato;

            border-right: 1px solid black;
        }

        &__msg, &__nick {
            padding: 2px 10px;
        }
    }
</style>

<script>
export default {
    data () {
        return {
            chatList: Object.keys(this.client.chans),
            // temp
            lines: []
        }
    },

    props: [
        'client'
    ],

    created() {
        this.client.addListener('message', this.receivedMsg);
    },

    methods: {
        addChannel(){
            //TODO
        },

        removeChannel(){
            //TODO
        },

        sendMsg(e) {
            const msg = e.target.value // save msg
            e.target.value = '' // clean input

            this.client.say(this.chatList[0], msg); // send

            this.lines.push({
                nick: this.client.nick,
                msg
            }); // updated chat


            // regex ftw! /me <msg>, /join <channel> /msg <nick> ...
            if (msg === '/quit') {
                this.client.disconnect()
            }
        },

        receivedMsg(from, to, msg) {
            this.lines.push({
                nick: from,
                msg
            }); // update chat
        }
    }
}
</script>
