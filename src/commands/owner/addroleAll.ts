
import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import dataJson from "../../data"

export = {
    name: "addroleAll",
    guilds: [],
    permissions: [],
    users: [dataJson.user['me']],
    roles: [],
    type: [CmdType.Owner],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {


        let members = (await msg.guild.members.fetch())

        let roleIds = args.map(a => dcUtil.pickRoleId(a)).filter(r => !!r) as string[];

        for (const [id, member] of members) {
            member.roles.add(roleIds).catch(() => { });
        }

    }
};

