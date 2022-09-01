import { WithId, Document } from "mongodb";

export type BindDataCollection = { [key: string]: BindData };
export interface BindData extends WithId<Document> {
    userId?: string;
    accounts?: string[];
}