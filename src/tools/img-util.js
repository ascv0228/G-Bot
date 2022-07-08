const { imageHash } = require('image-hash');

module.exports = {
    getNotDupeCountFromMsg: getNotDupeCountFromMsg,
    getImageUrlArray: getImageUrlArray
};

async function getImageUrlArray(msg) {
    let ImageUrlArray = new Array();
    for (const [_, att] of msg.attachments) {
        if (att.url.endsWith('.gif') || att.url.endsWith('.GIF'))
            continue;
        ImageUrlArray.push(att.url);
    }
    return ImageUrlArray;
}

async function getNotDupeCountFromMsg(client, msg) {
    let ImageUrlArray = await getImageUrlArray(msg);
    if (ImageUrlArray == undefined || ImageUrlArray.length == 0)
        return 0;
    let count = await getNotDupeCount(client, msg, ImageUrlArray);
    return count;
}

async function getNotDupeCount(client, msg, ImageUrlArray) {
    let count = 0
    for (let i = 0; i < ImageUrlArray.length; ++i) {
        const hash = await getHashDataFromUrl(ImageUrlArray[i]);
        if (hash == 'error') {
            console.log(ImageUrlArray[i] + "has error.")
            count++;
            continue;
        }
        let flag = await insertHashToDatabase(client, msg, hash)
        if (flag) {
            count++;
        }
    }
    return count;
}


var request = require('request').defaults({ encoding: null });
const crypto = require('crypto');
const sha256 = x => crypto.createHash('sha256').update(x).digest('base64');

const zlib = require('zlib');
async function getBase64FromImageUrl(url) {
    return new Promise(function (resolve, reject) {
        const gzip = zlib.createGzip();

        const data = [];

        request.get(url)
            .pipe(gzip)
            .on('data', (d) => {
                data.push(d);
            })
            .on('error', (e) => {
                reject(e);
            })
            .on('end', () => {
                resolve(Buffer.concat(data).toString("base64"));
            });
    });
}

async function getHashDataFromUrl(url) {
    let base64 = await getBase64FromImageUrl(url);
    return sha256(base64);
}

async function insertHashToDatabase(client, msg, hashData) {
    let channelId = msg.channel.id
    let guildId = msg.guild.id
    let flag = await checkNotInDatabase(client, channelId, hashData)
    if (flag == undefined) {
        client.Mdbcollection.updateOne({ type: 'hashData', channelId: channelId }, { "$set": { [`hash.${hashData}`]: urlEncode(msg.url) } });
        return true;
    } else {
        let gbotlogchannel = await client.channels.fetch('964516826811858984')
        let gbotlogchannel2 = await client.channels.fetch('994873994597646468')
        gbotlogchannel.send('<@' + msg.member + '>' + ' use same image! in <#' + channelId + '> , ' + msg.url + '\n'
            + 'origin url in: ' + decodeUrl(flag, guildId, channelId));
        gbotlogchannel2.send('<@' + msg.member + '>' + ' use same image! in <#' + channelId + '> , ' + msg.url + '\n'
            + 'origin url in: ' + decodeUrl(flag, guildId, channelId));
        return false;
    }
}

function urlEncode(url) {
    return url.substring(85 - 18, 85);
}

function decodeUrl(encodeUrl, guildID, channelID) {
    return 'https://discord.com/channels/' + `${guildID}` + `/${channelID}/` + encodeUrl;
}

async function checkNotInDatabase(client, channelId, hashData) {
    temp = await client.Mdbcollection.find({ type: 'hashData', channelId: channelId }).toArray();
    return temp[0].hash[hashData]
}