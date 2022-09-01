import { WithId, Document } from "mongodb";

export interface CrystalData {
    min: number;
    max: number;
}

export type CrewCrystal = { [key: string]: CrystalData };

export interface DataInfo extends WithId<Document> {
    lastRewardTime?: number;
    drugDays?: number;
    drugTime?: number;
    drugFlag?: boolean;
    crewCrystal: CrewCrystal
}