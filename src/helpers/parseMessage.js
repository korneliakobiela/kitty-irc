class Parser {
    constructor(message = '') {
        this.message = message;
    }

    linkify() {
        const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

        this.message = this.message.replace(urlRegex, url => {
            let parseUrl = `<a class="message__link" href="${ url }">${ url }</a>`;

            // if link is an image
            if (/\.(jpg|png|gif|svg)$/.test(url)) {
                parseUrl += `<div>
                    <img class="message__img" src="${ url }">
                </div>`;
            }

            // if link is a youtube video
            if (/youtube/.test(url)) {
                const videoMatch = url.match(/\?v=(.*)/);
                const videoId = videoMatch[1];

                if (videoId) {
                    parseUrl += `<div>
                        <iframe
                            class="message__youtube-video"
                            src="https://www.youtube.com/embed/${ videoId }"
                            frameborder="0" allowfullscreen>
                        </iframe>
                    </div>`;
                }
            }

            return parseUrl;
        });

        return this;
    }

    escapeHtml() {
        const entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '`': '&#x60;'
        };

        this.message = this.message.replace(/[&<>"'`]/g, s => entityMap[s]);

        return this;
    }

    parse() {
        return this.message;
    }
}

function parseMessage(message = '') {
    return new Parser(message)
        .escapeHtml()
        .linkify()
        .parse();
}

export default parseMessage
