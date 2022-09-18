import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import db from "../../database/db"
import tools from "../../utils/tools";
import hashDataDao from "../../database/hashDataDao"

export = {
    name: "test",
    aliases: [],
    guilds: [],
    permissions: [],
    users: ['411895879935590411'],
    description: 'test',
    roles: [],
    type: [CmdType.Owner],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        let categoryId = '834103866772946944'
        let category = await client.channels.fetch(categoryId) as Discord.CategoryChannel
        let chl = category.children.cache
        for (let [id, channel] of chl) {
            console.log(channel)

        }

    }
};

function matchMsgUrl(str: string): any {
    if (!str) return null;
    const mats = str.match(/https:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)/);
    if (mats) {
        return { guild: mats[1], channel: mats[2], msg: mats[3] };
    }
    return null;
}