import { imageHash } from 'image-hash';
import Discord from "discord.js";
import { ZClient } from "../structure/client";
import hashDataDao from "../database/hashDataDao"
import { RewardChannel } from "./types";


import crypto from "crypto";
var request = require('request').defaults({ encoding: null });

const sha256 = x => crypto.createHash('sha256').update(x).digest('base64');

import zlib from "zlib";




export default {
    async getNotDupeCountFromMsg(client: ZClient, msg: Discord.Message): Promise<number> {
        let ImageUrlArray = await getImageUrlArray(msg);
        if (ImageUrlArray == undefined || ImageUrlArray.length == 0)
            return 0;
        let count = await getNotDupeCount(client, msg, ImageUrlArray);
        return count;
    }
};


async function getImageUrlArray(msg: Discord.Message): Promise<string[]> {
    let ImageUrlArray = new Array();
    for (const [_, att] of msg.attachments) {
        if (att.url.endsWith('.gif') || att.url.endsWith('.GIF'))
            continue;
        ImageUrlArray.push(att.url);
    }
    return ImageUrlArray;
}

async function getNotDupeCount(client: ZClient, msg: Discord.Message, ImageUrlArray): Promise<number> {
    let count = 0
    for (let i = 0; i < ImageUrlArray.length; ++i) {
        const hash = await getHashDataFromUrl(ImageUrlArray[i]);
        if (hash == 'error' || undefined) {
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


// var request = require('request').defaults({ encoding: null });
// const crypto = require('crypto');
// const sha256 = x => crypto.createHash('sha256').update(x).digest('base64');

// const zlib = require('zlib');
async function getBase64FromImageUrl(url: string) {
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

async function getHashDataFromUrl(url: string) {
    let base64 = await getBase64FromImageUrl(url);
    return sha256(base64);
}

async function insertHashToDatabase(client: ZClient, msg: Discord.Message, hashData: string) {
    let channelId = !msg.channel.isThread() ? msg.channel.id : msg.channel.parentId
    let guildId = msg.guild.id
    let flag = await hashDataDao.checkNotInDatabase(channelId, hashData)
    if (flag == undefined) {
        hashDataDao.update(channelId, hashData, msg.url)
        return true;
    } else {


        if (msg.channel.isThread()) {
            channelId = msg.channel.id;

            let channel = await client.channels.fetch(channelId) as Discord.TextChannel;
            let message = await channel.messages.fetch(flag).catch(() => { return null });
            if (!message) {
                hashDataDao.update(channelId, hashData, msg.url);
                return true;
            }
            else {
                msg.react("❌");
                let temp = await client.channels.fetch('1020843902762242068') as Discord.TextChannel
                temp.send({
                    content: '<@' + msg.member + '>' + ' use same image! in <#' + channelId + '> , ' + msg.url + '\n'
                        + 'origin url in: ' + decodeUrl(flag, guildId, channelId)
                });
                return false;

            }
        }
        let gbotlogchannel = await client.channels.fetch('964516826811858984') as Discord.TextChannel
        let gbotlogchannel2 = await client.channels.fetch('994873994597646468') as Discord.TextChannel
        gbotlogchannel.send({
            content: '<@' + msg.member + '>' + ' use same image! in <#' + channelId + '> , ' + msg.url + '\n'
                + 'origin url in: ' + decodeUrl(flag, guildId, channelId)
        });
        gbotlogchannel2.send({
            content: '<@' + msg.member + '>' + ' use same image! in <#' + channelId + '> , ' + msg.url + '\n'
                + 'origin url in: ' + decodeUrl(flag, guildId, channelId)
        });
        return false;
    }
}

function decodeUrl(encodeUrl: string, guildID: string, channelID: string): string {
    return 'https://discord.com/channels/' + `${guildID}` + `/${channelID}/` + encodeUrl;
}

// async function checkNotInDatabase(client, channelId, hashData) {
//     temp = await client.Mdbcollection.find({ type: 'hashData', channelId: channelId }).toArray();
//     return temp[0].hash[hashData]
// }