import Discord from "discord.js";
import schedule from 'node-schedule';
import { ZClient } from "../structure/client";
import dbUtil from '../utils/database-util';
import rewardUtil from '../utils/reward-util';


export = {
    name: "RemoveNewMemberRole",

    async execute(client: ZClient) {
        schedule.scheduleJob('50 59 15 * * *', async function () {
            let d = new Date().getTime()
            const guildid = '829673608791851038';
            const roleId = '986888997538246748';
            let guild = client.guilds.cache.get(guildid)

            let members = (await guild.members.fetch({ force: true }))
                .filter(member => !!member.roles.cache.get(roleId))

            // let output = new Array();
            for (const [id, member] of members) {
                if (d - member.joinedAt.getTime() > (7 * 1000 * 3600 * 24))
                    member.roles.remove(roleId);
            }
            // console.log(output)

        });
    }
}