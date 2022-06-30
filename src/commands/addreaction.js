const { prefix } = require('../../config/config.json');
module.exports = {
    name: "addreaction",
    aliases: ["ar"],
    member: ["411895879935590411", "832777502848974920"],
    async execute(client, msg, args) {
        if (!this.member.includes(msg.author.id)) return;
        switch (msg.author.id) {
            case this.member[0]:
                return myAddReaction(client, msg, args);
            case this.member[1]:
                return catAddReaction(client, msg, args);
        }

    }
};

async function myAddReaction(client, msg, args) {
    let name = "addreaction";
    return (await replyMsgAddEmoji(client, msg, args)
        || await useMsgUrl(client, msg, args)
        || await useChannelAndMsgId(client, msg, args)
        || await msg.reply('`1.(using reply)` ' + `${prefix}${name}  <reaction>\n`
            + '`2.             ` ' + `${prefix}${name} <msg_url> <reaction>`
            + '`3.             ` ' + `${prefix}${name} <channel_Id> <msg_Id> <reaction>`))


}

async function catAddReaction(client, msg, args) {
    let name = "addreaction";
    return (await replyMsgAddEmoji(client, msg, args)
        || await useMsgUrl(client, msg, args)
        || await msg.reply('`1.(using reply)` ' + `${prefix}${name}  <reaction>\n`
            + '`2.             ` ' + `${prefix}${name} <msg_url> <reaction>`))
}

async function replyMsgAddEmoji(client, msg, args) {
    console.log('replyMsgAddEmoji')
    if (!msg || !args || args.length < 1 || msg.type != 'REPLY') return null;

    console.log('replyMsgAddEmoji(client, msg, args)')
    let msg1 = await msg.fetchReference();
    let reaction = matchEmoji(args[0]);
    msg1.react(reaction).catch(() => { msg.reply('error reaction') });
    msg.delete();
    return true
}

async function useChannelAndMsgId(client, msg, args) {
    console.log('useChannelAndMsgId')
    if (!msg || !args || args.length < 3) return null;
    console.log('useChannelAndMsgId(client, msg, args)')
    let channelID = args[0];
    let msg_id = args[1];
    let reaction = matchEmoji(args[2]);
    let channel = await client.channels.fetch(channelID);
    let message = await channel.messages.fetch(msg_id);
    message.react(reaction).catch(() => { msg.reply('error reaction') });
    msg.delete();
    return true
}

async function useMsgUrl(client, msg, args) {
    console.log('useMsgUrl')
    if (!msg || !args || args.length < 2) return null;
    let mat = matchMsgUrl(args[0]);
    if (!mat) return null;
    console.log('useMsgUrl(client, msg, args)')
    let reaction = matchEmoji(args[1]);
    let channel = await client.channels.fetch(mat.channel);
    let message = await channel.messages.fetch(mat.msg);
    message.react(reaction).catch(() => { msg.reply('error reaction') });
    msg.delete();
    return true
}

function matchEmoji(str) {
    if (!str) return null;
    const mats = str.match(/https:\/\/cdn\.discordapp\.com\/emojis\/(\d+)\.(?:png|gif|webp)(?:\?size\=\d+&quality=\w*)?/);
    if (mats) {
        return mats[1];
    }
    return str;
}

function matchMsgUrl(str) {
    if (!str) return null;
    const mats = str.match(/https:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)/);
    if (mats) {
        return { guild: mats[1], channel: mats[2], msg: mats[3] };
    }
    return null;
}