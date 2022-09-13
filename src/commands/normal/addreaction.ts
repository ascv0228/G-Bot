import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import auth from "../../utils/auth";
import dcUtil from "../../utils/discord-util";
import { Executor } from "../../structure/executor";

export = {
    name: "addreaction",
    aliases: ["ar"],
    users: ["411895879935590411", "976785151126282250"],
    description: '增加表情符號 (表情限制使用機器人所在的伺服器)',
    permissions: ['Administrator'],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        ["(using reply)", "<reaction>"],
        ["             ", "<channel_Id> <msg_Id> <reaction>"]
    ],
    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        // if (!this.member.includes(msg.author.id)) return;
        if (auth.isOwnerUser(msg.member))
            return (await replyMsgAddEmoji(client, msg, args)
                || await useMsgUrl(client, msg, args)
                || await useChannelAndMsgId(client, msg, args)
                || await msg.reply(tools.usageString(client, this)));

        return (await replyMsgAddEmoji(client, msg, args)
            || await useMsgUrl(client, msg, args)
            || await msg.reply(tools.usageString(client, this)));


    }
};




async function replyMsgAddEmoji(client: ZClient, msg: Discord.Message, args: string[]) {
    if (!msg || !args || args.length < 1 || msg.type != Discord.MessageType.Reply) return null;
    let msg1 = await msg.fetchReference();
    let reaction = matchEmoji(args[0]);
    MessageReact(client, msg1, reaction, msg);
    return true
}

async function useChannelAndMsgId(client: ZClient, msg: Discord.Message, args: string[]) {
    if (!msg || !args || args.length < 3) return null;
    let channelID = args[0];
    let msg_id = args[1];
    let reaction = matchEmoji(args[2]);
    let channel = await client.channels.fetch(channelID) as Discord.TextChannel;
    let message = await channel.messages.fetch(msg_id);
    MessageReact(client, message, reaction, msg);

    return true
}

async function useMsgUrl(client: ZClient, msg: Discord.Message, args: string[]) {
    if (!msg || !args || args.length < 2) return null;
    let mat = matchMsgUrl(args[0]);
    if (!mat) return null;
    let reaction = matchEmoji(args[1]);
    let channel = await client.channels.fetch(mat.channel) as Discord.TextChannel;
    let message = await channel.messages.fetch(mat.msg);
    MessageReact(client, message, reaction, msg);
    return true
}

async function MessageReact(client: ZClient, targetMessage: Discord.Message, reaction_id: string, del_Message: Discord.Message) {
    targetMessage.react(reaction_id).catch(async () => {
        let new_emoji_id = await createEmoji(client, reaction_id);
        await targetMessage.react(new_emoji_id).catch(() => { });
        deleteEmoji(client, new_emoji_id).catch(() => { })
    });
    del_Message.delete().catch(e => { });
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

async function createEmoji(client: ZClient, emoji_id: string) {
    let guild_id = "901498054077714462"; // CHEGG
    let guild = client.guilds.cache.get(guild_id);
    return (await guild.emojis.create({ attachment: await dcUtil.getUrl(emoji_id), name: 'temp' })).id;
}

async function deleteEmoji(client: ZClient, emoji_id: string) {
    let guild_id = "901498054077714462"; // CHEGG
    let guild = client.guilds.cache.get(guild_id);
    return (await guild.emojis.delete(emoji_id));
}

