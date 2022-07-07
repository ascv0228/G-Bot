const dcUtil = require('../tools/dc-util.js');
const imgUtil = require('../tools/img-util.js');
module.exports = {
    name: "getBigEmoji",
    aliases: ['gbe'],

    async execute(client, msg, args) {
        if (msg.type == 'REPLY')
            getEmojiByReply(msg);
        if (!args.length)
            return;
        let emoji_id = dcUtil.matchEmoji(args[0])
        if (!emoji_id) return;

        // console.log(await getBase64FromImageUrl(emoji_url_gif(emoji_id)))
        // console.log(await getBase64FromImageUrl(emoji_url_png(emoji_id)))
        // if (await IsValidImageUrl(emoji_url_gif(emoji_id))) {
        //     return msg.reply({ content: `${emoji_url_gif(emoji_id)}` });
        // }
        // console.log(await IsValidImageUrl(emoji_url_gif(emoji_id)))
        return msg.reply({ content: `${await getUrl(emoji_id)}` });

    }
}

async function getEmojiByReply(msg) {
    let msg1 = await msg.fetchReference();
    let [...args] = msg1.content.trimEnd().split(/\s+/);
    for (let arg of args) {
        const emoji_id = dcUtil.matchEmoji(arg);
        msg.reply({ content: `${await getUrl(emoji_id)}` });
    }
}

async function getUrl(emoji_id) {
    if (await IsValidImageUrl(emoji_url_gif(emoji_id))) {
        return `${emoji_url_gif(emoji_id)}`;
    }
    return `${emoji_url_png(emoji_id)}`;
}


function emoji_url_png(id) {
    return `https://cdn.discordapp.com/emojis/${id}.png?size=4096&quality=lossless`
}

function emoji_url_gif(id) {
    return `https://cdn.discordapp.com/emojis/${id}.gif?size=4096&quality=lossless`
}
var request = require('request').defaults({ encoding: null });

const zlib = require('zlib');
async function IsValidImageUrl(url) {
    return new Promise(function (resolve, reject) {
        const gzip = zlib.createGzip();

        request.get(url)
            .on('response', function (response) {
                console.log(response.statusCode) // 200
                if (response.statusCode != 200) resolve(null);
                resolve(response.headers['content-length']);
            })
            .on('error', (e) => {
                reject(e);
            })
            .on('end', (e) => {
                resolve(null);
            })
            .pipe(gzip);

    });
}

/*
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

}*/
