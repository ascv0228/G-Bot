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

        let cmd = client.commands.get(args[0]) || client.aliases.get(args[0]);
        if (!cmd || !auth.hasCommmandAuth(msg.member, cmd))
            return msg.reply({ content: tools.usageString(client, this) });

        let HowToUse = (!cmd.usage || !cmd.usage.length) ? `暫無說明` : tools.usageString(client, cmd)
        let aliases = (!cmd.aliases || !cmd.aliases.length) ? `暫無別名` : (Array.isArray(cmd.aliases)) ? cmd.aliases.join(', ') : cmd.aliases


        const cmdHelpEmbed = new Discord.EmbedBuilder()
            .setColor(msg.member.displayHexColor)
            .setTitle(`${cmd.name} 使用說明`)
            .addFields(
                { name: `別名`, value: aliases },
                { name: `使用方法`, value: HowToUse, inline: true },

            ).setFooter({
                text: msg.member.user.tag,
                iconURL: msg.member.displayAvatarURL({ forceStatic: false })
            });

        msg.reply({ embeds: [cmdHelpEmbed] });

    }
};

