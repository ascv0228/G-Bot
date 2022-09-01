import { Track } from "erela.js";
import { WithId, Document } from "mongodb";

export interface MusicCache extends WithId<Document> {
    guildId?: string;
    voiceChannel?: string;
    textChannel?: string;
    musics?: Track[];
    trackRepeat?: boolean;
    queueRepeat?: boolean;
}