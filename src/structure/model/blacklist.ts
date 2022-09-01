import { WithId, Document } from "mongodb";

export interface BlackList extends WithId<Document> {
    blackList?: { [key: string]: boolean };
}