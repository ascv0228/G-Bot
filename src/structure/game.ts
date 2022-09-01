export interface DiceInfo {
    Id: number;
    Special: number;
    Upgrade: number;
    UpgradeMat: number;
}

export interface GameData {
    CriticalDamage: number;
    DiceInfoList: DiceInfo[];
    Lose: number;
    Name: string;
    Profile: number;
    SkinIndex: number;
    SkinLevel: number;
    ThemeIndex: number;
    Trophy: number;
    Win: number;
}