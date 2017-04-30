function parseMessage(message = '') {
    message = escapeHtml(message);
    message = linkify(message);

    return message;
}

function linkify(string = '') {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return string.replace(urlRegex, url => {
        let parseUrl = `<a class="message__link" href="${ url }">${ url }</a>`;

        // if link is an image
        if (/\.(jpg|png|gif|svg)$/.test(url)) {
            parseUrl += `<div>
                <img class="message__img" src="${ url }">
            </div>`;
        }

        return parseUrl;
    });
}



function escapeHtml(string = '') {
    const entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    return string.replace(/[&<>"'`=]/g, s => entityMap[s]);
}

export default parseMessage
