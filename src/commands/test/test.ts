import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import db from "../../database/db"
import tools from "../../utils/tools";
import hashDataDao from "../../database/hashDataDao"
const fetch = require("node-fetch");

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
            console.log(id, channel.name)
        }
        // dcApi(client, args[0])

    }
};
// `https://discord.com/api/v10/users/@me/guilds/${guildId}/member`
async function dcApi(client, api) {

    try {
        await fetch(api, {
            method: 'GET', headers: { 'Authorization': `Bot ${process.env.BOT_TOKEN}` }
        }).then(res => res.json()).then(d => {
            let data = JSON.stringify(d);
            const attachment = new Discord.AttachmentBuilder(Buffer.from(data, 'utf-8'), { name: 'test-api.json' });
            (client.botStatus["Error_Log_Channel"] as Discord.TextChannel).send({ files: [attachment] });
        })


    } catch (err) {
        console.log(err)
    }

}