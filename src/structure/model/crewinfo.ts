import { WithId, Document } from "mongodb";

export interface CrewMember {
    name: string;
}

export interface CrewMemberHistory {
    names: string[];
    nameHistory: string[];
    joinHistory: number[];
}

export type CrewMembers = { [key: string]: CrewMember };

export type CrewMembersRecord = { [key: string]: CrewMemberHistory };

export interface CrewInfo extends WithId<Document> {
    members?: CrewMembers;
    membersRecord?: CrewMembersRecord;
}

export interface RaidScore {
    Score: number;
    Stage: number;
    Time: string;
}

export type RaidScores = { [key: string]: RaidScore };

export interface PersonalRaidInfo {
    Critical: number;
    Name: string;
    Profile: number;
    Score?: RaidScores;
    Trophy: number;
}

export type CrewRaidInfo = { [key: string]: PersonalRaidInfo };