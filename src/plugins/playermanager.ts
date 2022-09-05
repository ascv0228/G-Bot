import * as erela from "erela.js";
import Discord from "discord.js";
import musicDao from "../database/musicDao";
import { ZClient } from "../structure/client";

async function restoreMusicStatus(this: ZClient) {
    const musicCaches = await musicDao.loadCacheMusics();

    musicCaches.forEach((cache) => {
        let player = this.manager.players.get(cache.guildId);
        if (!player) {
            player = this.manager.create({
                guild: cache.guildId,
                voiceChannel: cache.voiceChannel,
                textChannel: cache.textChannel,
            });
            player.connect();
        } else {
            if (player.voiceChannel != cache.voiceChannel) {
                player.setVoiceChannel(cache.voiceChannel);
            }
        }

        const state = player.state;
        if (state != "CONNECTED") {
            player.connect();
            player.stop();
        }

        cache.musics.forEach((track) => {
            const newTrack = track as (erela.Track & erela.TrackData);
            newTrack.info = track as (erela.Track & erela.TrackDataInfo);
            newTrack.info.length = track.duration;

            const guild = this.guilds.cache.get(cache.guildId);
            const member = guild.members.cache.get((track.requester as Discord.User).id);

            player.queue.add(erela.TrackUtils.build(newTrack, member.user));
        });

        if (cache.trackRepeat) {
            player.setTrackRepeat(cache.trackRepeat);
        }

        if (cache.queueRepeat) {
            player.setQueueRepeat(cache.queueRepeat);
        }

        if (!player.playing && !player.paused && player.queue.current) {
            player.play();
        }
    });
}

export function install(client: ZClient) {
    client.restoreMusicStatus = restoreMusicStatus;
    console.log('restoreMusicStatus')
    console.log(restoreMusicStatus)
    client.manager = new erela.Manager({
        nodes: [{
            host: "localhost", // Optional if Lavalink is local
            port: 1122, // Optional if Lavalink is set to default
            password: "", // Optional if Lavalink is set to default
        }],

        send(id, payload) {
            const guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        },
    })
        .on("nodeCreate", (node) => {
            console.log(`Node ${node.options.identifier} created`);
        })
        .on("nodeDestroy", (node) => {
            console.log(`Node ${node.options.identifier} destroy`);
        })
        .on("nodeConnect", (node) => {
            console.log(`Node ${node.options.identifier} connected`);

            client.restoreMusicStatus();
        })
        .on("nodeReconnect", (node) => {
            console.log(`Node ${node.options.identifier} reconnected`);
        })
        .on("nodeDisconnect", (node, reason) => {
            console.log(`Node ${node.options.identifier} disconnected, reason: ${JSON.stringify(reason)}`);
        })
        .on("nodeError", (node, error) => {
            console.log(`Node ${node.options.identifier} had an error: ${error.message}`);
        })
        .on("nodeRaw", (payload) => {
            //console.log(payload);
        })
        .on("playerCreate", (player) => {
            musicDao.updateMusicChannel(player.guild, player.voiceChannel, player.textChannel);
        })
        .on("playerDestroy", (player) => {
            musicDao.destroyGuildMusics(player.guild);
        })
        .on("trackStart", (player, track) => {
            /*client.channels.cache
                .get(player.textChannel)
                .send(`🎶 正在播放: \`${track.title}\``);*/
        })
        .on("trackEnd", (player, track) => {
            if (!player.trackRepeat) {
                musicDao.removeMusicByIndex(player.guild, 0);
            }

            if (player.queueRepeat) {
                musicDao.addMusicsToQueue(player.guild, [track]);
            }
        })
        .on("trackStuck", (player, track) => {
            (client.channels.cache
                .get(player.textChannel) as Discord.TextBasedChannel)
                .send(`播放 \`${player.queue.current.title}\` 時發生問題!`);
            player.stop();

            console.log(`trackStuck -> ${track.title}`);
        })
        .on("trackError", (player, track, payload) => {
            console.log(`trackError -> ${track.title}: ${payload}`);
        })
        .on("queueEnd", (player) => {
            (client.channels.cache
                .get(player.textChannel) as Discord.TextBasedChannel)
                .send("所有曲目已播放完畢...");

            player.destroy();
        })
        .on("playerMove", (player, initChannel, newChannel) => {
            if (!newChannel && player) {
                player.destroy();
            } else {
                musicDao.updateMusicChannel(player.guild, newChannel, player.textChannel);
            }
            console.log(`playerMove ${initChannel} -> ${newChannel}`);
        })
        .on("socketClosed", (player, payload) => {
            player.pause(true);

            let counter = 0;
            const reconnector = () => {
                if (player.state == "CONNECTED") {
                    player.pause(false);
                } else {
                    if (++counter >= 5) {
                        if (player.queue.current) {
                            (client.channels.cache
                                .get(player.textChannel) as Discord.TextBasedChannel)
                                .send(`播放 \`${player.queue.current.title}\` 時發生問題!`);
                            player.stop();
                        }
                        return;
                    }
                    setTimeout(reconnector, 5000);
                }
            };

            setTimeout(reconnector, 5000);

            console.log(`socketClosed!!`);
        });
}