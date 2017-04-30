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
                        <div class="chat__message" @click="onMessageClick" v-html="line.message">

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
import parseMessage from '../helpers/parseMessage';
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

        onMessageClick(event) {
            event.preventDefault();

            // if link is clicked
            if (event.target.matches('.message__link')) {
                shell.openExternal(event.target.href);
            }

        },

        sendMessage(event) {
            // save message
            const message = event.target.value;

            // clean input
            event.target.value = '';

            if (/^\//.test(message)) { // there is a command

                // get command and value
                const [, command, value] = message.match(/^\/(\w*)(?: (\w*)){0,1}/);
                const valueExists = typeof value !== 'undefined';

                switch(command) {
                case 'quit':
                    this.client.disconnect();
                    // TODO close something?
                break;
                case 'msg':
                    if (valueExists) {
                        // where to send message
                        let chat = this.getChatByName(value);

                        // if there is a new private message
                        if (!chat) {
                            chat = this.addChat({ name: value });
                        }

                        console.log(this.chats)

                        this.activeChat = chat;
                    }
                break;
                default: // help
                    const kittyMessage = {
                        time: new Date(),
                        nick: 'kitty-irc',
                        message: `
                            <b>/quit</b> - rozłącz i zamknij <br>
                            <b>/msg &lt;nick&gt;</b> - rozpocznij konwersację prywatną <br>
                            <b>/join &lt;channel&gt;</b> - dołącz do kanału <br>
                        `
                    };

                    this.activeChat.history.push(kittyMessage);
                break;
                }


            } else { // there is a normal message

                // create message for kitty-irc
                const kittyMessage = {
                    time: new Date(),
                    nick: this.client.nick,
                    message: parseMessage(message)
                };

                // send message to irc network
                this.client.say(this.activeChat.name, message);

                // push message to the active chat
                this.activeChat.history.push(kittyMessage);
            }
        },

        onReceiveMessage(from, to, message) {
            // create message for kitty-irc
            const kittyMessage = {
                time: new Date(),
                nick: from,
                message: parseMessage(message)
            };

            // where to send message
            let chat = this.getChatByName(to);

            // if there is private message
            if (to === this.client.nick) {
                chat = this.getChatByName(from);

                // if there is new private message
                if (!chat) {
                    chat = this.addChat({ name: from });
                }
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

    .message {
        &__img {
            width: 200px;
            margin-top: 5px;
        }
    }
</style>
