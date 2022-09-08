import Discord from "discord.js";
import tools from "../../../utils/tools";
import dcUtil from "../../../utils/discord-util";
import { ZClient } from "../../../structure/client";
import { CmdType } from "../../../utils/types";
let roleMap = {
    '829673608791851038': '988641623384662066',
    '988795992667193395': '988804577509904414'
}

export = {
    name: 'setcolor',
    aliases: ["sc"],
    guilds: ['829673608791851038', '988795992667193395', /*'1002583252923596820'*/],

    description: '設定私人身分組顏色',
    roles: [],
    type: [CmdType.Universal],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (args.length == 0)
            return msg.reply('Need Color Hex');
        if (getColor(args[0]) == null)
            return msg.reply('Error Color Hex :  #FFFFFF、FFFFFF、Random');

        let role: Discord.Role

        switch (msg.guild.id) {
            case '1002583252923596820':
                role = msg.guild.roles.cache.find(role => role.name === `${msg.author.id}`);
                if (!!role)
                    break;
                let pos = msg.guild.roles.cache.get('1004332619971956777').position
                role = await msg.guild.roles.create({
                    name: `${msg.author.id}`,
                    position: pos
                })
                break;

            case '829673608791851038':
                if (!msg.member.roles.cache.has('988641623384662066'))
                    return msg.reply({ content: '無可用私人的身分組' })
                role = await msg.guild.roles.fetch('988641623384662066');
                break;

            case '988795992667193395':
                role = await msg.guild.roles.fetch('988804577509904414');
                break;

            default:
                return msg.reply({ content: '無可用私人的身分組' })


        }


        if (!msg.member.roles.cache.has(role.id)) {
            msg.member.roles.add(role.id)
        }

        let org_color = role.hexColor;
        role.setColor(getColor(args[0]) as Discord.ColorResolvable)
            .then(updated => msg.reply(`Color: ${org_color} -> ${updated.hexColor}`))
            .catch(console.error);

    }
}


function getColor(str: string): string {
    if (!str) return null;
    if (str.toLowerCase() == 'random')
        return 'Random'
    const mats = str.match(/^#?([0-9a-fA-F]{1,6})$/);
    if (mats) {
        return '#' + mats[1];
    }
    return null;
}