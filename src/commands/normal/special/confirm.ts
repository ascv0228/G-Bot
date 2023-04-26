import Discord from "discord.js";
import tools from "../../../utils/tools";
import { ZClient } from "../../../structure/client";
import { CmdType } from "../../../utils/types";
import auth from "../../../utils/auth";
import dcUtil from "../../../utils/discord-util";
import { Executor } from "../../../structure/executor";
import dataJson from "../../../data";

export = {
    name: "confirm",
    aliases: ["cf"],
    users: [dataJson['user']['me']],
    description: '賦予 團員 或 非團員 身分組',
    permissions: [],
    roles: ['1064189066528182322', '1042340948941754409'],
    guilds: [dataJson['guild']['ฅ(•ㅅ•^✿)ฅ']],
    type: [CmdType.Universal],
    usage: [
        "<user>",
    ],
    // 1045343646473523267 LOG
    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        // if (!this.member.includes(msg.author.id)) return;
        if (!args.length)
            return msg.reply({ content: tools.usageString(client, this) });

        let mention = await dcUtil.getMemberByTag(msg.guild, args[0]);

        let roles = [
            ['1042368200937066587', '團員'],
            ['1042371082637807627', '非團員'],
            ['1049551551234060349', '聊天']
        ]
        let confirmContent = `${msg.author.tag} 設定 ${mention.user.tag} 身分組\n**請在15秒內完成**`
        let rows = [];
        rows.push(new Discord.ActionRowBuilder<Discord.ButtonBuilder>()
            .addComponents(
                roles.map((i) => new Discord.ButtonBuilder()
                    .setCustomId(`confirm role#${i[0]}###ignore`)
                    .setLabel(i[1])
                    .setStyle(Discord.ButtonStyle.Primary))

            ));
        let defaultCustomId = `confirm cancel###ignore`
        rows.push(new Discord.ActionRowBuilder<Discord.ButtonBuilder>()
            .addComponents(
                [
                    new Discord.ButtonBuilder()
                        .setCustomId(defaultCustomId)
                        .setLabel('取消')
                        .setStyle(Discord.ButtonStyle.Danger)
                ]
            ));
        let commandMessage = await msg.reply({ content: confirmContent, components: rows });

        let num = 1;
        let collectKey: string = await new Promise<string>((resolve, reject) => {
            let collector = commandMessage.createMessageComponentCollector({
                max: 1,
                time: 30 * 1000,
                componentType: Discord.ComponentType.Button,
                filter(m: Discord.Interaction): boolean {
                    return m.user.id == msg.author.id && m.isButton();
                }
            });

            collector.on("collect", (inter: Discord.ButtonInteraction) => {
                inter.deferUpdate();
            });

            collector.on("end", (collected: Discord.Collection<string, Discord.ButtonInteraction>, reason: string) => {
                if (collected.size >= num) {
                    const m = collected.first();
                    resolve(m.customId);
                } else {
                    resolve(defaultCustomId);
                }
            });
        });
        let addRole = [];
        let removeRole = [];
        for (let i = 0; i < roles.length; ++i) {
            if (collectKey == `confirm role#${roles[i][0]}###ignore`) {
                addRole = [roles[i][0], roles[i][1]];
                removeRole = [roles[(i + 1) % 3][0], roles[(i + 2) % 3][0]];
                break;
            }
        }
        if (addRole.length != 0) {
            mention.roles.add(addRole[0]).catch(() => false)
            removeRole.forEach((elem) => mention.roles.remove(elem).catch(() => false));
            confirmContent = `${msg.author.tag} 給予 ${mention.user.tag}\n身分組: <@&${addRole[0]}>`
            commandMessage.edit({ content: confirmContent, components: [] })
            let chl = (await msg.guild.channels.fetch('1045343646473523267')) as Discord.TextChannel
            chl.send({ content: confirmContent });
        } else {
            commandMessage.edit({ content: `${msg.author.tag} 未變更 ${mention.user.tag} 的身分組`, components: [] })
        }

    }



};

