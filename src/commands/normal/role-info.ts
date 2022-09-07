import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import auth from "../../utils/auth";


export = {
    name: "role-info",
    aliases: ['ri'],
    description: '查看身分組資訊 (限管理員)',
    permissions: [],
    roles: [],
    type: [CmdType.Universal, CmdType.Developer],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (msg.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator) || auth.isDeveloperUser(msg.member)) {
            if (args.length < 1 || !dcUtil.pickRoleId(args[0]))
                return msg.reply('需要標記身分組');

            let role = await dcUtil.getRoleByID(msg.guild, dcUtil.pickRoleId(args[0]))
            RoleInfo(msg, role);
        }

    }
};


function RoleInfo(msg: Discord.Message, role: Discord.Role) {
    /*
    * 身分組名稱
    * ID
    * 顏色
    * 可提及
    * 分開顯示
    * 成員數量
    * 創造時間
    * 圖像  
    */
    const infoEmbed = new Discord.EmbedBuilder()
        .setColor('#60D1F6')
        .setTitle(`${role.name} 身分組資訊`)
        .addFields(
            { name: '身分組名稱', value: `<@&${role.id}>`, inline: true },
            { name: 'ID', value: `${role.id}`, inline: true },
            { name: '顏色', value: `${role.hexColor}` },
        )
        .addFields(
            { name: `可提及`, value: `${role.mentionable}`, inline: true },
            { name: `分開顯示`, value: `${role.hoist}`, inline: true },
            { name: `成員數量`, value: `${role.members.size}`, inline: true },

        )
        .setFooter({
            text: role.createdAt.toUTCString(),
            iconURL: msg.member.displayAvatarURL({ forceStatic: false })
        });
    if (role.icon) infoEmbed.setThumbnail(role.iconURL({ extension: 'png', size: 4096 }))
    msg.channel.send({ embeds: [infoEmbed] });
}
