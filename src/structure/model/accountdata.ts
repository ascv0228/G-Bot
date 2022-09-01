import { WithId, Document } from "mongodb";

export interface AccountData extends WithId<Document> {
    userId?: string;
    score?: number;
    weekScore?: number;
    rank?: number;
    status?: number;
    adminPerm?: boolean;
}