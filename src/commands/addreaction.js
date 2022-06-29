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
    return replyMsgAddEmoji(client, msg, args) || useMsgUrl(client, msg, args) || useChannelAndMsgId(client, msg, args)
    // if (msg.type === 'REPLY') {
    //     if (!args || args.length < 1) {
    //         return msg.reply('`1.(using reply)` ' + `${prefix}${this.name}  <reaction>\n`
    //             + '`2.` ' + `${prefix}${this.name} <channel_Id> <msg_Id> <reaction>`)
    //     }
    //     let msg1 = await msg.fetchReference();
    //     let reaction = matchEmoji(args[0]);
    //     if (!reaction) {
    //         return msg.reply('no reaction');
    //     }
    //     msg1.react(reaction).catch(() => { });
    //     msg.delete();
    //     return;
    // }
    // if (!args || args.length < 3) {
    //     return msg.reply(`${prefix}${this.name} <channel_Id> <msg_Id> <reaction>`)
    // }
    // let channelID = args[0];
    // let msg_id = args[1];
    // let reaction = matchEmoji(args[2]);
    // if (!reaction) {
    //     return msg.reply('no reaction');
    // }
    // let channel = await client.channels.fetch(channelID);
    // let message = await channel.messages.fetch(msg_id);
    // message.react(reaction).catch(() => { });

}

async function catAddReaction(client, msg, args) {
    if (msg.type !== 'REPLY') {
        return msg.reply('need reply one message')
        // return msg.reply('`(using reply)`  ' + `${prefix}${this.name}  <reaction>`)
    }
    replyMsgAddEmoji(client, msg, args)
}

async function replyMsgAddEmoji(client, msg, args) {
    if (!args || args.length < 1 || msg.type != 'REPLY') {
        return null;
    }
    let msg1 = await msg.fetchReference();
    let reaction = matchEmoji(args[0]);
    msg1.react(reaction).catch(() => { msg.reply('error reaction') });
    msg.delete();
    return true
}

async function useChannelAndMsgId(client, msg, args) {
    if (!args || args.length < 3) return null;
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
    if (!args || args.length < 2) return null;
    let mat = matchMsgUrl(args[0]);
    if (!mat) return null;
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