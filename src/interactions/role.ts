import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import guild from "./guild";

export = {
    name: "role",

    async execute(client: ZClient, interaction: Discord.RoleSelectMenuInteraction) {
        let member = interaction.member as Discord.GuildMember;

        let cmds = getCmds(interaction);
        if (!cmds || !cmds.length)
            return
        let cmd = cmds[1];

        // let guild = ((guildId) ? (client.guilds.cache.get(guildId) || interaction.guild)
        //     : interaction.guild) as Discord.Guild;

        switch (cmd) {
            case 'select':
                if (interaction.roles.size == 0) {
                    let embeds = interaction.message.embeds;
                    interaction.update({ content: "空的選擇身分組", embeds: embeds });
                }
                // console.log(JSON.stringify(interaction.values))
                // console.log(JSON.stringify(interaction.roles))
                let roles = interaction.roles.filter((role, roleId) => {
                    if (role.managed)
                        return false;
                    if (interaction.message.member.roles.highest.position <= role.position)
                        return false;
                    if (interaction.guild.roles.premiumSubscriberRole && interaction.guild.roles.premiumSubscriberRole.id == roleId)
                        return false;
                    return true;
                }).reverse() as Discord.Collection<string, Discord.Role>;
                // console.log(JSON.stringify( roles))
                if (roles.size == 0) {
                    return interaction.update({ content: "Error roles to set: " + interaction.roles.map(r => r.name).join(', ') })
                }
                return interaction.update(getSelectOpt(interaction, [...roles.values()]));
                break;
            case 'cancel':
                await interaction.update({ content: "deleting ..." }).catch(() => { });
                await interaction.message.delete().catch(() => { });
                return
                break;
            case 'add':
                let roleId = cmds[2];
                let hasRole = member.roles.cache.has(roleId);
                let temp = (hasRole) ? member.roles.remove(roleId).catch(() => false) :
                    member.roles.add(roleId).catch(() => false);
                if (!temp) {
                    return interaction.reply({
                        content: '變更身分組: `' + (await dcUtil.getRoleByID(interaction.guild, roleId)).name + '`失敗',
                        ephemeral: true
                    })
                }
                return interaction.reply({
                    content: `你${hasRole ? "移除" : "獲取"}身分組: ` + '`' + (await dcUtil.getRoleByID(interaction.guild, roleId)).name + '`',
                    ephemeral: true
                })
                break;
        }


        // interaction.update({ embeds: [avatarEmbed] });

        return;
    }
};

function getCmds(interaction: Discord.RoleSelectMenuInteraction | Discord.ButtonInteraction): string[] {

    // if (interaction.isRoleSelectMenu()) {
    try {
        return interaction.customId.trimEnd().split(/###/)[0].split(/\s+/)
    }
    catch {
        interaction.message.reply({ content: 'catch some error.' });
        return null;
    }
    // }
}



function getSelectOpt(interaction: Discord.RoleSelectMenuInteraction,
    roles: Discord.Role[] | Discord.APIRole[]) {
    let description = ["點下面的按鈕來獲取/移除身分組！"]
    let roleEmbed = new Discord.EmbedBuilder()
        .setTitle("<:cat_red_face:1052940563655184475> | 自動身分組");

    let rows: Discord.ActionRowBuilder<Discord.ButtonBuilder>[] = []

    for (let i in roles) {
        let index = parseInt(i);
        if (parseInt(i) % 5 == 0) {
            rows.push(
                new Discord.ActionRowBuilder<Discord.ButtonBuilder>()

            )
        }
        // console.log(index/5)
        rows[index / 5 | 0].addComponents(
            new Discord.ButtonBuilder()
                .setCustomId(`role add ${roles[i].id}`)
                .setLabel(`${roles[i].name}`)
                .setStyle(Discord.ButtonStyle.Primary)
        )
        description.push(`${index + 1}. <@&${roles[i].id}> **(${roles[i].name})**`)

    }

    return {
        content: null,
        embeds: [roleEmbed.setDescription(description.join('\n'))],
        components: rows
    }

}