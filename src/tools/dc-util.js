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
    return await getMemberByID(guild, UserID).user;
}

async function getUserByID(guild, UserID) {
    //const user = await guild.users.fetch(UserID).catch(console.error);
    //console.log(user);
    return await getMemberByID(guild, MemberID).user;
}

async function getMemberByTag(guild, str) {
    let MemberID = pickUserId(str);
    if (!MemberID) return;
    return await getMemberByID(guild, MemberID);
}
async function getMemberByID(guild, MemberID) {
    const member = await guild.members.fetch(MemberID).catch(console.error);
    console.log(member);
    return member;
}