import Discord from "discord.js";
import { ZClient } from "../structure/client";

import auth from "../utils/auth";

const PAUSE_INTERVAL = 5000;

export = {
    name: 'voiceStateUpdate',

    async execute(client: ZClient, oldState: Discord.VoiceState, newState: Discord.VoiceState) {
        if (!auth.isAuthGuild(oldState.guild.id)) return;
        if (!auth.isAuthGuild(newState.guild.id)) return;
        if (!(oldState.channelId && oldState.channel.members.get(client.user.id))
            && !(newState.channelId && newState.channel.members.get(client.user.id)))
            return;

        if (oldState.channelId === newState.channelId) {
            // return console.log('Mute/Deafen Update');
        }
        if (!oldState.channelId && newState.channelId) {
            // return console.log('Connection Update');
        }
        if (oldState.channelId && !newState.channelId) {
            // return console.log('Disconnection Update');
            if (!client.botStatus['musicPlay'] && oldState.channel.members.size == 1 && oldState.channel.members.get(client.user.id)) {

                setTimeout(() => {
                    if (!(oldState.channel.members.size == 1 && oldState.channel.members.get(client.user.id)))
                        return
                    let player = client.manager.players.get(newState.guild.id);
                    if (player) {
                        player.destroy();
                        (oldState.channel as Discord.VoiceChannel).send({ content: `<@${client.user.id}>, 已經離開 <#${oldState.channelId}>` })
                    }
                }, 15000);
            }
        }


        if (newState.member.id != client.user.id) return;

        console.log("VoiceStateUpdate: " + `{deaf: ${oldState.deaf}, mute: ${oldState.mute}} => {deaf: ${newState.deaf}, mute: ${newState.mute}}`);
        console.log(`channel: ${oldState.channelId} => ${newState.channelId}`);

        let player = client.manager.players.get(newState.guild.id);

        if (!newState.channelId) {
            if (player) {
                player.destroy();
            }
        } else {
            if (oldState.deaf != newState.deaf || oldState.mute != newState.mute) {
                if (!newState.deaf || !newState.mute) {
                    setTimeout(function () {
                        player = client.manager.players.get(newState.guild.id);
                        if (player) {
                            player.pause(false);
                        }
                    }, PAUSE_INTERVAL);
                } else {
                    player.pause(true);
                }
            }
        }
    },
};