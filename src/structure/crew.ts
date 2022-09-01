import { CrewMember, CrewMemberHistory, CrewMembers } from "./model/crewinfo";
import { MemberInfo, MembersInfo } from "./model/teaminfo";

export interface CrewEvent {
    cwid: string;
    cmid: string;
    dcid: string;
    members: MembersInfo;
    db_members: CrewMembers;
    member?: MemberInfo;
    db_member?: CrewMember;
    memberRecord?: CrewMemberHistory
}