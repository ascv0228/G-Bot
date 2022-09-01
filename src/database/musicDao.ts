import db from "./db";
import { MusicCache } from "../structure/model/musicdata";

export default {
    async loadCacheMusics(guildId: string = null): Promise<MusicCache[]> {
        const ret = [];

        try {
            const collection = db.svr.db('G-Bot').collection("MusicCache");
            const datas = collection.find(guildId ? { guildId: guildId } : {});

            await datas.forEach((item: MusicCache) => {
                const tmp = {} as MusicCache;

                tmp.guildId = item.guildId;
                tmp.voiceChannel = item.voiceChannel;
                tmp.textChannel = item.textChannel;
                tmp.musics = item.musics || [];
                tmp.trackRepeat = item.trackRepeat || false;
                tmp.queueRepeat = item.queueRepeat || false;

                ret.push(tmp);
            });

        } finally { }

        return ret;
    },

    async addMusicsToQueue(guildId, tracks): Promise<void> {
        try {
            const collection = db.svr.db('G-Bot').collection("MusicCache");
            await collection.updateOne({
                guildId: guildId,
            }, {
                $push: {
                    musics: { $each: tracks }
                },
            }, { upsert: true });
        } finally { }
    },

    async removeMusicByIndex(guildId, index): Promise<void> {
        try {
            const path = `musics.${index}`;
            const collection = db.svr.db('G-Bot').collection("MusicCache");

            await collection.updateOne({
                guildId: guildId,
            }, {
                $unset: {
                    [path]: 1
                }
            });

            await collection.updateOne({
                guildId: guildId,
            }, {
                $pull: {
                    "musics": null
                }
            });
        } finally { }
    },

    async destroyGuildMusics(guildId): Promise<void> {
        try {
            const collection = db.svr.db('G-Bot').collection("MusicCache");

            await collection.deleteOne({
                guildId: guildId,
            });
        } finally { }
    },

    async updateMusicChannel(guildId, voiceChannel, textChannel): Promise<void> {
        try {
            const collection = db.svr.db('G-Bot').collection("MusicCache");

            await collection.updateOne({
                guildId: guildId,
            }, {
                $set: {
                    voiceChannel: voiceChannel,
                    textChannel: textChannel,
                },
            }, { upsert: true });
        } finally { }
    },

    async clearMusicByRange(guildId, min, max): Promise<void> {
        try {
            const allPath = {};

            for (let i = min; i < max; ++i) {
                const path = `musics.${i}`;
                allPath[path] = 1;
            }

            const collection = db.svr.db('G-Bot').collection("MusicCache");

            await collection.updateOne({
                guildId: guildId,
            }, {
                $unset: allPath
            });

            await collection.updateOne({
                guildId: guildId,
            }, {
                $pull: {
                    "musics": null
                }
            });
        } finally { }
    },

    async updateLoopStatus(guildId: string, trackRepeat: boolean, queueRepeat: boolean): Promise<void> {
        try {
            const collection = db.svr.db('G-Bot').collection("MusicCache");

            await collection.updateOne({
                guildId: guildId,
            }, {
                $set: {
                    trackRepeat: trackRepeat,
                    queueRepeat: queueRepeat,
                },
            }, { upsert: true });
        } finally { }
    },
};