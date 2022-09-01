import moment from "./moment";
import { EggRuleType, EggType } from "./types";

export default [{
    from: ["712143365206179880"],
    content: "早安",
    type: EggType.PartWithStartSame,
    echo: {
        index: 0,
        content: "早安~",
    },
    errEcho: {
        [1]: {
            index: -999,
            content: "現在太早了吧~",
        }, [2]: {
            index: -999,
            content: "現在不早了呦~",
        }
    },
    conditionFn: function (): number {
        const curr = moment().utcOffset(8);
        const hour = parseInt(curr.format('H'));
        if (hour >= 0 && hour <= 5) return 1;
        if (hour >= 12 && hour <= 23) return 2;
        return 0;
    }
}, {
    from: ["712143365206179880"],
    content: "晚安",
    type: EggType.PartWithStartSame,
    echo: {
        index: 0,
        content: "晚安~",
    },
    errEcho: {
        [1]: {
            index: -999,
            content: "今天這麼早睡呀~ 晚安:heart:",
        }, [2]: {
            index: -999,
            content: "時間不早了呢! 快去睡呦~ 晚安:heart:",
        }
    },
    conditionFn: function (): number {
        const curr = moment().utcOffset(8);
        const hour = parseInt(curr.format('H'));
        if (hour >= 23 || hour <= 1) return 0;
        if (hour >= 2 && hour <= 5) return 2;
        return 1;
    }
}, {
    from: ["712143365206179880"],
    content: "zz",
    type: EggType.PartSame,
    rules: [EggRuleType.IgnoreCase],
    echo: {
        index: 1,
        content: "Z哥哥最棒了~",
    }
}, {
    from: ["765629373084074064"],
    content: ["測試啦"],
    type: EggType.PartSame,
    rules: [EggRuleType.IgnoreCase, EggRuleType.Multiple],
    echo: {
        index: 1,
        content: "測試測試",
    }
}, {
    perm: "臭GG",
    content: "臭GG",
    type: EggType.PartSame,
    rules: [EggRuleType.IgnoreCase],
    echo: {
        index: 1,
        content: "<@411895879935590411>",
    }
}];