export interface RewardInfo {
    crew?: boolean; // 是否為團隊獎勵
    ec?: boolean; // 是否過期
    f?: string;
    hide?: boolean;
    ra?: number; // 數量
    rc?: boolean; // 是否接收
    ri?: number; // 物品id
    rt?: number; // 類型 -> 金幣: 0, 寶石: 1, 
    t?: string;
    ten?: string;
    texp?: string;
    tkr?: string;
}

export interface Member {
    crewid: string;
    id: string;
    data: MemberInfo;
    ban?: string;
    report?: number;
}

export interface MemberInfo {
    Auth?: number;
    Critical?: number;
    Level?: number;
    LoginDate?: string;
    Name?: string;
    Profile?: number;
    Season?: number;
    SignUpDate?: string;
    Trophy?: number;
}

export type MembersInfo = { [key: string]: MemberInfo };

export interface TeamInfo {
    SubscribeList?: MembersInfo;
    SignUpList?: MembersInfo;
    BlackList?: MembersInfo;
}

export interface Team {
    Name?: string;
    Num?: number;
    Exp?: number;
    Tag?: string;
    IsOpen?: boolean;
}