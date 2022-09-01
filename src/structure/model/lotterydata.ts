import { WithId, Document } from "mongodb";

export interface LotteryData extends WithId<Document> {
    userID?: string;
    serverID?: string;
    uniqueID?: string;
    lottery?: [];
    state?: number;
}