import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import auth from "../../utils/auth";

export = {
    name: "addreaction",
    aliases: ["ar"],
    users: ["411895879935590411", "976785151126282250"],
    description: '增加表情符號 (表情限制使用機器人所在的伺服器)',
    permissions: ['Administrator'],
    roles: [],
    type: [CmdType.Universal],
    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        // if (!this.member.includes(msg.author.id)) return;
        try {
            if (auth.isOwnerUser(msg.member))
                return myAddReaction(client, msg, args);

            return OtherAddReaction(client, msg, args);
        }
        catch {
            msg.reply('cannot use other server emoji')
        }

    }
};

async function myAddReaction(client: ZClient, msg: Discord.Message, args: string[]) {
    let name = "addreaction";
    return (await replyMsgAddEmoji(client, msg, args)
        || await useMsgUrl(client, msg, args)
        || await useChannelAndMsgId(client, msg, args)
        || await msg.reply('`1.(using reply)` ' + `${client.prefix}${name}  <reaction>\n`
            + '`2.             ` ' + `${client.prefix}${name} <msg_url> <reaction>\n`
            + '`3.             ` ' + `${client.prefix}${name} <channel_Id> <msg_Id> <reaction>`))


}

async function OtherAddReaction(client: ZClient, msg: Discord.Message, args: string[]) {
    let name = "addreaction";
    return (await replyMsgAddEmoji(client, msg, args)
        || await useMsgUrl(client, msg, args)
        || await msg.reply('`1.(using reply)` ' + `${client.prefix}${name}  <reaction>\n`
            + '`2.             ` ' + `${client.prefix}${name} <msg_url> <reaction>`))
}

async function replyMsgAddEmoji(client: ZClient, msg: Discord.Message, args: string[]) {
    if (!msg || !args || args.length < 1 || msg.type != Discord.MessageType.Reply) return null;
    let msg1 = await msg.fetchReference();
    let reaction = matchEmoji(args[0]);
    msg1.react(reaction).catch(() => { msg.reply('error reaction') });
    msg.delete().catch(e => { });
    return true
}

async function useChannelAndMsgId(client: ZClient, msg: Discord.Message, args: string[]) {
    if (!msg || !args || args.length < 3) return null;
    let channelID = args[0];
    let msg_id = args[1];
    let reaction = matchEmoji(args[2]);
    let channel = await client.channels.fetch(channelID) as Discord.TextChannel;
    let message = await channel.messages.fetch(msg_id);
    message.react(reaction).catch(() => { msg.reply('error reaction') });
    msg.delete().catch(e => { });
    return true
}

async function useMsgUrl(client: ZClient, msg: Discord.Message, args: string[]) {
    if (!msg || !args || args.length < 2) return null;
    let mat = matchMsgUrl(args[0]);
    if (!mat) return null;
    let reaction = matchEmoji(args[1]);
    let channel = await client.channels.fetch(mat.channel) as Discord.TextChannel;
    let message = await channel.messages.fetch(mat.msg);
    message.react(reaction).catch(() => { msg.reply('error reaction') });
    msg.delete().catch(e => { });
    return true
}

function matchEmoji(str: string): null | string {
    if (!str) return null;
    const mats = str.match(/https:\/\/cdn\.discordapp\.com\/emojis\/(\d+)\.(?:png|gif|webp)(?:\?size\=\d+&quality=\w*)?/);
    if (mats) {
        return mats[1];
    }
    return str;
}

function matchMsgUrl(str: string): any {
    if (!str) return null;
    const mats = str.match(/https:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)/);
    if (mats) {
        return { guild: mats[1], channel: mats[2], msg: mats[3] };
    }
    return null;
}