import Discord from "discord.js";
import moment from "../utils/moment";
import tools from "../utils/tools";
import { ZClient } from "../structure/client";
import { BotMessage } from "../structure/botinfo";
import { Executor } from "../structure/executor";

function coolDownExpired(this: ZClient, message: Discord.Message, exec: Executor) {
    const cooldownTag = `${message.member.id}_${exec.name}`;
    const currTime = moment().valueOf();
    const cmdTime = this.cooldown.get(cooldownTag);
    const diffTime = currTime - cmdTime;

    const cd = tools.getCoolDownConfig(message, exec);
    if (cd && cmdTime && diffTime < cd) {
        message.channel.send({ content: `冷卻尚餘 \`${(cd - diffTime) / 1000}\` 秒` });
        return false;
    }

    return true;
}

function updateCoolDown(this: ZClient, message: Discord.Message, exec: Executor) {
    const cooldownTag = `${message.member.id}_${exec.name}`;

    const cd = tools.getCoolDownConfig(message, exec);
    if (cd && cd > 0) {
        this.cooldown.set(cooldownTag, moment().valueOf());
    }
}

function getChannelInfo(this: ZClient, gid: string, cid: string, author?: Discord.User): BotMessage {
    const guild = this.guilds.cache.get(gid);
    const usr = author || this.user as Discord.User;

    return {
        guild: guild,
        channel: this.channels.cache.get(cid) as Discord.TextBasedChannel,
        author: usr,
        member: guild.members.cache.get(usr.id)
    } as BotMessage;
}

function DiscordLog(this: ZClient, message?: any, ...optionalParams: any[]): void {
    if (!message) return;
    if (!this.botStatus["Error_Log_Channel"])
        tools.setErrorLogChannel(this);

    (this.botStatus["Error_Log_Channel"] as Discord.TextChannel).send({ content: `𝔾:${message}` });
}


export function install(client: ZClient) {
    client.prefix = process.env.BOT_PREFIX;
    client.mainGuild = process.env.MAIN_GUILD;
    client.cooldown = new Discord.Collection();
    client.botStatus = new Discord.Collection();
    client.updateCoolDown = updateCoolDown;
    client.coolDownExpired = coolDownExpired;
    client.getChannelInfo = getChannelInfo;
    client.DiscordLog = DiscordLog
}