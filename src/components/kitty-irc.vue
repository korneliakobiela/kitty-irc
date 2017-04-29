<template lang="html">
    <div>
        <ul class="chatlist">
            <li v-for="chat in chats" @click="onChatListClick" class="chatlist__item">
                {{ chat.name }}
            </li>
        </ul>
        <div class="chat">
            <div class="chat__lines">
                <div v-for="line in activeChat.history">
                    <div class="chat__line">
                        <div class="chat__time">
                            [{{ line.time.toLocaleTimeString('pl') }}]
                        </div>
                        <div class="chat__nick">
                            {{ line.nick }}
                        </div>
                        <div class="chat__message">
                            {{ line.message }}
                        </div>
                    </div>
                </div>

            </div>
            {{ this.client.nick }}:
            <input type="text" @keydown.enter="sendMessage">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            chats: [],
            activeChat: null
        }
    },

    props: ['client'],

    created() {
        // add irc client listeners
        this.client.addListener('message', this.onReceiveMessage);

        // create chat if channel exists
        const chans = Object.keys(this.client.chans);
        if (chans.length > 0) {
            this.activeChat = this.addChat({ name: chans[0] });
        }
    },

    methods: {
        addChat(chat) {
            // add empty history to chat
            chat.history = [];

            // add chat to chat list
            this.chats.push(chat);

            return chat
        },

        removeChat() {
            //TODO
        },

        getChatByName(chatName = '') {
            const chats = this.chats.filter(chat => chat.name === chatName);

            if (chats.length === 0) {
                return null;
            }

            return chats[0];
        },

        onChatListClick(event) {
            const clickedChat = event.currentTarget.textContent.trim();
            const chat = this.getChatByName(clickedChat);

            if (chat && chat !== this.activeChat) {
                this.activeChat = chat;
            }
        },

        sendMessage(event) {
            // save message
            const message = event.target.value;

            // clean input
            event.target.value = '';

            // send message to irc network
            this.client.say(this.activeChat.name, message);

            // create message for kitty-irc
            const kittyMessage = {
                time: new Date(),
                nick: this.client.nick,
                message
            };

            // push message to the active chat
            this.activeChat.history.push(kittyMessage);

            // regex ftw! /me <msg>, /join <channel> /msg <nick> ...
            if (message === '/quit') {
                this.client.disconnect()
            }
        },

        onReceiveMessage(from, to, message) {
            // create message for kitty-irc
            const kittyMessage = {
                time: new Date(),
                nick: from,
                message
            };

            // where to send message
            let chat = this.getChatByName(from);

            // if there is a new private message
            if (!chat) {
                chat = this.addChat({ name: from });
            }

            // push message to proper chat
            chat.history.push(kittyMessage);
        }
    }
}
</script>

<style lang="scss">
    .chat {
        font-size: 12px;

        &__lines {
            padding: 15px 0;
            margin: 10px 0;
            border-bottom: 1px solid #aaa;
            border-top: 1px solid #aaa;
        }

        &__line {
            display: flex;
        }

        &__time {
            width: 60px;
            color: #333;
        }

        &__nick {
            width: 90px;

            text-align: right;
            color: tomato;

            border-right: 1px solid #aaa;
        }

        &__message, &__nick, &__time {
            padding: 0 5px;
        }

    }

    .chatlist {
        display: flex;
        list-style-type: none;
        padding: 0;

        &__item {
            padding: 0 10px;
            border-right: 1px solid #aaa;
            cursor: pointer;

            &--active {
                text-decoration: underline;
            }
        }
    }
</style>
