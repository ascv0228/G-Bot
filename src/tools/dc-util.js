module.exports = {
    pickUserId: pickUserId,
    getUserByTag: getUserByTag,
    getUserByID: getUserByID,
    getMemberByTag: getMemberByTag,
    getMemberByID: getMemberByID,
    msg_react: msg_react
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
    let member = await getMemberByID(guild, MemberID);
    return member
}
async function getMemberByID(guild, MemberID) {
    const member = await guild.members.fetch(MemberID).catch(console.error);
    return member;
}

async function msg_react(channel, msg_Id, reactions) {
    // const channel = client.channels.cache.get(channel_Id)
    const messageToReact = await channel.messages.fetch(msg_Id);
    for (let i of reactions) {
        await messageToReact.react(i);
    }
}