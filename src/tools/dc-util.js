module.exports = {
    pickUserId: pickUserId,
    getUserByTag: getUserByTag,
    getUserByID: getUserByID,
    getMemberByTag: getMemberByTag,
    getMemberByID: getMemberByID,
};

function pickUserId(str) {
    const mats = str.match(/^<@!?(\d+)>$/);
    if (mats) {
        return mats[1];
    }
    return null;
}

async function getUserByTag(guild, str) {
    let UserID = pickUserId(str);
    if (!UserID) return;
    console.log(UserID);
    let member = await getMemberByID(guild, UserID);
    return member.user
}

async function getUserByID(guild, UserID) {
    //const user = await guild.users.fetch(UserID).catch(console.error);
    //console.log(user);
    let member = await getMemberByID(guild, UserID);
    return member.user
}

async function getMemberByTag(guild, str) {
    let MemberID = pickUserId(str);
    if (!MemberID) return;
    console.log(MemberID);
    let member = await getMemberByID(guild, MemberID);
    return member
}
async function getMemberByID(guild, MemberID) {
    const member = await guild.members.fetch(MemberID).catch(console.error);
    console.log(member);
    return member;
}