import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import { DiscordBanners } from 'discord-banners';

export = {
    name: "banner",
    aliases: [],
    description: '查詢使用者橫幅',
    permissions: ['Administrator'],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        "",
        "<mention someone>"
    ],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        const discordBanners = new DiscordBanners(client);
        let member = await dcUtil.getMemberByTag(msg.guild, args[0]) || msg.member;
        const banner = await discordBanners.getBanner(member.user.id, { size: 2048, format: "png", forceStatic: false })
        if (banner) return msg.channel.send(banner)
        else if (!banner) return msg.channel.send("User banner not found!")
    }
};