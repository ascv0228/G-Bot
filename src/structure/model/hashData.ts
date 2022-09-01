import { WithId, Document } from "mongodb";

export interface HashData extends WithId<Document> {
    channelId?: string;
    hash?: Map<string, string>
}