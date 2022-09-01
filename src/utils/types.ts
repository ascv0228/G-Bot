export enum CmdType {
    All = "all",
    Music = "music",
    Universal = "universal",
    Developer = "developer",
    Owner = "owner",
    Bot = "bot"
}

export enum RewardChannel {
    SupporterChannel = "963831403001307167",
    NormalChannel = "867811395474423838",
    EverydayRewardChannel = "886269472158138429", // 棄用
    DalaoChannel = "948120050458574878",
    TestChannel = "989138173953183744"
}

export enum RctType {
    Test = "test",
    Role = "role",
    BotStatus = "botStatus",
}

export enum EventType {
    CrewMemberNameChange = "crewMemberNameChange",
    CrewMemberJoin = "crewMemberJoin",
    CrewMemberLeave = "crewMemberLeave",
    CrewRoleChange = "crewRoleChange",
    eggsAppear = "eggsAppear",
}

export enum EggType {
    PartSame,
    PartWithStartSame,
    PartWithEndSame,
    FullSame,
    Delete,
    Mention,
}

export enum EggRuleType {
    IgnoreCase,
    Multiple,
}

const CmdTypeName = {
    [CmdType.All]: "全部指令",
    [CmdType.Music]: "音樂指令",
    [CmdType.Universal]: "通用指令",
    [CmdType.Developer]: "開發者指令",
    [CmdType.Owner]: "擁有者指令",
    [CmdType.Bot]: "Bot專用指令",
};

const RewardChannelName = {
    [RewardChannel.SupporterChannel]: "【📝】輔助紀錄區",
    [RewardChannel.NormalChannel]: "【✒】紀錄區",
    [RewardChannel.EverydayRewardChannel]: "【✏】日常獎勵紀錄",
    [RewardChannel.DalaoChannel]: "【📒】佬專用紀錄區",
    [RewardChannel.DalaoChannel]: "【💻】指令測試區",
};

const RewardType = {
    [RewardChannel.SupporterChannel]: "reward-ticket",
    [RewardChannel.NormalChannel]: "reward-4000-ticket",
    [RewardChannel.DalaoChannel]: "reward-big-ticket",
}

export {
    CmdTypeName,
    RewardChannelName,
    RewardType
};