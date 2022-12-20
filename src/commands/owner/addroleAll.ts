
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


        let members = (await msg.guild.members.fetch({ force: true }))

        let roleIds = args.map(a => dcUtil.pickRoleId(a)).filter(r => !!r);

        for (const [id, member] of members) {
            for (let roleId of roleIds) {
                member.roles.add(roleId).catch(() => { });

            }
        }

    }
};

