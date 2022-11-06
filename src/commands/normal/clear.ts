import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";

export = {
    name: 'clear',
    aliases: ["clr"],
    description: '清除頻道聊天紀錄',
    permissions: ["ManageMessages"],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        "<number (1~100)>"
    ],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        let amount = 100;

        if (args.length > 0) {
            if (args[0].match(/^\d+$/)) {
                amount = parseInt(args[0]);
            } else {
                msg.channel.send({ content: tools.usageString(client, this) });
                return;
            }
        }

        const MAX_DELETE_AMOUNT = 100;
        const INTERVAL = 2000;

        const count = Math.floor(amount / MAX_DELETE_AMOUNT);
        const remain = amount % MAX_DELETE_AMOUNT;

        await msg.delete();
        await tools.sleep(INTERVAL);

        const messageDeletor = async (num: number): Promise<void> => {
            const channel = msg.channel as Discord.TextChannel;
            const messages = await msg.channel.messages.fetch({ limit: num });
            const deletedMsgs = await channel.bulkDelete(messages, true);
            const surplusMsgs = deletedMsgs.size ? (messages as Discord.Collection<string, Discord.Message<true>>).filter((_, key) => !deletedMsgs.has(key)) : messages;

            for (const [_, m] of surplusMsgs) {
                await m.delete();
                await tools.sleep(INTERVAL);
            }
        };

        for (let i = 0; i < count; ++i) {
            await messageDeletor(MAX_DELETE_AMOUNT);
        }

        if (remain > 0) {
            await messageDeletor(remain);
        }
    },
};