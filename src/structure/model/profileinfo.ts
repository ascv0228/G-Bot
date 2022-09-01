import { WithId, Document } from "mongodb";

export interface ProfileInfo extends WithId<Document> {
    uniqueID?: string;
    serverID?: string;
    userID?: string;
    bank?: number;
    coins?: number;
    guards?: number;
    XP?: number;
    totalXP?: number;
    Level?: number;
}