import Discord from "discord.js";
import schedule from 'node-schedule';
import { ZClient } from "../structure/client";
import dbUtil from '../utils/database-util';
import rewardUtil from '../utils/reward-util';

export = {
    name: "everydayClearFish",

    async execute(client: ZClient) {
        let time_str = `50 59 ${(15 + client.botStatus['timezone']) % 24} * * *`;
        schedule.scheduleJob(time_str, async function () {
            let categoryId = '1005021325519233106'
            let category = await client.channels.fetch(categoryId) as Discord.CategoryChannel
            let clearChannelTopics = ['遇到verify就清空頻道', 'Clear the channel when meeting verify message'];
            let chl = category.children.cache
            for (let [id, channel] of chl) {
                if (channel.type == Discord.ChannelType.GuildText &&
                    clearChannelTopics.includes((channel as Discord.TextChannel).topic))
                    continue;
                let testchl = await channel.clone()
                testchl.setParent(categoryId, { lockPermissions: false })
                channel.delete()
                if (testchl.type == Discord.ChannelType.GuildText)
                    testchl.send({ content: '這就是 #' + testchl.name + ' 頻道的起點' })
            }

        });
    }
}