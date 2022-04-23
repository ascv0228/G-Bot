const { imageHash } = require('image-hash');

module.exports.IsImage = function (url) {
    IsImage(url);
};

module.exports.getNotDupeCount = async function (client, ImageUrlArray) {
    getNotDupeCount(client, ImageUrlArray);
};

module.exports.getImageUrlArray = function (msg) {
    getImageUrlArray(msg);
};



const img_subFiles = [".png", ".jpg", ".jpeg", ".webp"]
function IsImage(url) {
    for (let i = 0; i < img_subFiles.length; ++i) {
        let index = url.indexOf(img_subFiles[i], 40);
        if (index == -1) continue;
        return true
    }
    return false;
}

async function getNotDupeCount(client, ImageUrlArray) {
    let count = 0
    for (let i = 0; i < ImageUrlArray.length; ++i) {
        const hash = await getHashDataFromUrl(ImageUrlArray[i]);
        if (hash == '0') continue;
        if (hash == 'error') {
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


function getImageUrlArray(msg) {
    let ImageUrlArray = new Array();
    msg.attachments.forEach(attachment => {
        const ImageUrl = attachment.proxyURL;
        if (IsImage(ImageUrl)) {
            ImageUrlArray.push(ImageUrl)
        }
    });
    console.log(ImageUrlArray);
    if (ImageUrlArray == undefined || ImageUrlArray.length == 0)
        return;
    return ImageUrlArray;
}

function getHashDataFromUrl(url) {
    if (!IsImage(url)) return '0';
    return new Promise((resolve, reject) => {
        //url = cutImageUrl(url);
        imageHash(url, 16, true, (error, data) => {
            if (error) {
                resolve('error');
            }
            resolve(data);
        })
    });
}


async function insertHashToDatabase(client, msg, hashData) {
    let channelId = msg.channel.id
    let guildId = msg.guild.id
    let flag = await checkNotInDatabase(client, channelId, hashData)
    if (flag == undefined) {
        client.Mdbcollection.updateOne({ type: 'hashData', channelId: channelId }, { "$set": { [`hash.${hashData}`]: urlEncode(msg.url) } });
        return true;
    } else {
        client.channels.cache.get('964516826811858984').send('<@' + msg.member + '>' + ' use same image! in <#' + channelId + '> , ' + msg.url + '\n'
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