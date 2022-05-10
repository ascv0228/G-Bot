const { imageHash } = require('image-hash');

module.exports = { getNotDupeCountFromMsg: getNotDupeCountFromMsg };

const img_subFiles = [".png", ".jpg", ".jpeg", ".webp", ".PNG", ".JPG", ".JPEG", ".WEBP"]
function IsImage(url) {
    for (let i = 0; i < img_subFiles.length; ++i) {
        let index = url.indexOf(img_subFiles[i], 40);
        if (index == -1) continue;
        return true
    }
    return false;
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

async function getImageUrlArray(msg) {
    let ImageUrlArray = new Array();
    await msg.attachments.forEach(attachment => {
        const ImageUrl = attachment.proxyURL;
        if (IsImage(ImageUrl)) {
            ImageUrlArray.push(ImageUrl);
        }
    });
    //console.log(ImageUrlArray);
    // if (ImageUrlArray == undefined || ImageUrlArray.length == 0)
    //     console.log(`ImageUrlArray: ${ImageUrlArray}`);
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

/*
!function () {
    var xhr = new XMLHttpRequest();
    // 也可以使用POST方式，根据接口，测试的图片是百度搜索首页的logo（2019-11-28 17:35）
    xhr.open('GET', 'http://127.0.0.1:8080/bd_logo1.png', true);
    // 返回类型blob
    xhr.onload = function () {
        if (this.status === 200) {
            // 获得二进制
            var blob = this.response;
            var reader = new FileReader();
            reader.onload = function (e) {
                var spark = new SparkMD5.ArrayBuffer()
                spark.append(e.target.result)
                console.log("md5:", spark.end())
            }
            //转换成FileReader对象
            reader.readAsArrayBuffer(blob);
        }
    }
    xhr.send();
}();
*/



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