import { WithId, Document } from "mongodb";

export interface LoginData extends WithId<Document> {
    userId?: string;
    image?: string;
    isLogin?: boolean;
}