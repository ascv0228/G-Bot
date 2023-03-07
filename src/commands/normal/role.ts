import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import auth from "../../utils/auth";
import tools from "../../utils/tools";


export = {
    name: "role",
    aliases: [],
    description: '點選訊息按鈕獲得身分組',
    permissions: ['Administrator', 'ManageGuild', 'ManageRoles'],
    roles: [],
    type: [CmdType.Universal, CmdType.Developer, CmdType.Owner],
    usage: [
        "",
        "<someone...> <role>",
        "<role...> <roleX> (let members of role get roleX)"
    ],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (args.length == 0) {
            AutoRole(msg);
        }
        else if (args.length < 2) {
            return msg.reply({ content: tools.usageString(client, this) });
        }
        else {
            try {
                let roleId = dcUtil.pickRoleId(args.pop());
                for (let m of args) {
                    let member = await dcUtil.getMemberByTag(msg.guild, m);
                    if (member)
                        member.roles.add(roleId)
                    else {
                        let role = await dcUtil.getRoleByID(msg.guild, dcUtil.pickRoleId(m))
                        for (let rm of role.members.values()) {
                            rm.roles.add(roleId)
                        }
                    }
                }
                msg.react("⭕")
            }
            catch (e) {
                msg.reply({ content: tools.usageString(client, this) });
            }

        }

    }
};

async function AutoRole(msg: Discord.Message) {
    let rows = [];
    rows.push(new Discord.ActionRowBuilder<Discord.RoleSelectMenuBuilder>()
        .addComponents(
            [
                new Discord.RoleSelectMenuBuilder()
                    .setCustomId(`role select###${msg.author.id}`)
                    .setPlaceholder("選擇身分組")
                    .setMinValues(1)
                    .setMaxValues(25)

            ]
        ))

    rows.push(new Discord.ActionRowBuilder<Discord.ButtonBuilder>()
        .addComponents(
            [
                new Discord.ButtonBuilder()
                    .setCustomId(`role cancel###${msg.author.id}`)
                    .setLabel('取消')
                    .setStyle(Discord.ButtonStyle.Danger)
            ]
        ));

    const roleEmbed = new Discord.EmbedBuilder()
        .setTitle("<:cat_red_face:1052940563655184475> | 自動身分組")
        .setDescription("設定自動領取身分組，成員只需要點擊按鈕就可以獲得身分組");


    await msg.channel.send({ embeds: [roleEmbed], components: rows });
    msg.delete().catch(() => { });
}

