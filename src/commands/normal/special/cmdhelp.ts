import Discord from "discord.js";
import tools from "../../../utils/tools";
import { ZClient } from "../../../structure/client";
import { CmdType } from "../../../utils/types";
import auth from "../../../utils/auth";
import dcUtil from "../../../utils/discord-util";
import { Executor } from "../../../structure/executor";

export = {
    name: "cmdhelp",
    aliases: [],
    users: [],
    description: '指令詳細使用方法',
    permissions: [],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        "<commandName>",
    ],
    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        // if (!this.member.includes(msg.author.id)) return;
        if (!args.length)
            return msg.reply({ content: tools.usageString(client, this) });

        let cmd = client.commands.get(args[0]);
        if (!cmd || !auth.hasCommmandAuth(msg.member, cmd))
            return msg.reply({ content: tools.usageString(client, this) });
        if (!cmd.usage || !cmd.usage.length)
            return msg.reply({ content: `暫無說明` });

        const cmdHelpEmbed = new Discord.EmbedBuilder()
            .setColor(msg.member.displayHexColor)
            .setTitle(`${cmd.name} 指令說明`)
            .setDescription(cmd.description ? cmd.description : `無描述`)
            .addFields(
                { name: `使用發法`, value: `${tools.usageString(client, cmd)}`, inline: true },

            ).setFooter({
                text: msg.member.user.tag,
                iconURL: msg.member.displayAvatarURL({ forceStatic: false })
            });

        msg.reply({ embeds: [cmdHelpEmbed] });

    }
};

