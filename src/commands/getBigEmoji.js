const dcUtil = require('../tools/dc-util.js');
const imgUtil = require('../tools/img-util.js');
module.exports = {
    name: "getBigEmoji",
    aliases: ['gbe'],

    async execute(client, msg, args) {
        let emoji_id = dcUtil.matchEmoji(args[0])
        if (!emoji_id) return;
        msg.reply({ content: `${emoji_url_png(emoji_id)}` });
        msg.reply({ content: `${emoji_url_gif(emoji_id)}` });
        // console.log(await getBase64FromImageUrl(emoji_url_gif(emoji_id)))
        // console.log(await getBase64FromImageUrl(emoji_url_png(emoji_id)))
        let Url = 'https://cdn.discordapp.com/emojis/989663551385927712.png'

        var request = require('request')
        request.get(Url)
        console.log(JSON.stringify(request.headers));
    }
}


function emoji_url_png(id) {
    return `https://cdn.discordapp.com/emojis/${id}.png?size=4096&quality=lossless`
}

function emoji_url_gif(id) {
    return `https://cdn.discordapp.com/emojis/${id}.gif?size=4096&quality=lossless`
}

async function getUrlResopne(url) {
    let request = new XMLHttpRequest();
    request.open("HEAD", url, true);
    request.send();
    return request.onreadystatechange = async function () {
        if (this.readyState == this.HEADERS_RECEIVED) {

            // Get the raw header string
            var headers = request.getAllResponseHeaders();

            // Convert the header string into an array
            // of individual headers
            var arr = headers.trim().split(/[\r\n]+/);

            var headerMap = {};
            // Create a map of header names to values
            for (let line of arr) {
                var parts = line.split(': ');
                var header = parts.shift();
                var value = parts.join(': ');
                headerMap[header] = value;
            };
            console.log(headerMap)
            return headerMap
        }
    }

}
