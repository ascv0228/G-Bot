module.exports = {
    pickUserId: pickUserId,
    pickRoleId: pickRoleId,
    getUserByTag: getUserByTag,
    getUserByID: getUserByID,
    getMemberByTag: getMemberByTag,
    getMemberByID: getMemberByID,
    getRoleByID: getRoleByID,
    msg_react: msg_react,
    createRole: createRole,
    createTextChannel: createTextChannel,
    createVoiceChannel: createVoiceChannel
};

function pickUserId(str) {
    const mats = str.match(/^<@!?(\d+)>$/);
    if (mats) {
        return mats[1];
    }
    return null;
}

function pickRoleId(str) {
    const mats = str.match(/<@&(\d{18})>/);
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

async function getRoleByID(guild, RoleID) {
    const role = await guild.roles.fetch(RoleID).catch(console.error);
    return role;
}
/* change channel roles Permission*/

async function changeChannelPermission(guild, channel_Id, role_id, changePermissions) {
    //changePermissions = { 'SEND_MESSAGES': false }
    let channel = await client.channels.cache.get(channel_Id);
    let changedRole = guild.roles.get(role_id);

    // find specific role - enter name of a role you create here
    // let testRole = roles.cache.find(r => r.id === 'role_id_here');

    // overwrites 'SEND_MESSAGES' role, only on this specific channel
    channel.overwritePermissions(
        changedRole,
        changePermissions
    ).then(console.log);
    // handle responses / errors
}

async function createRole(guild, name) {
    let role = await guild.roles.create({
        data: {
            name: name,
            color: 'BLUE',
        }
    })
    return role
}

async function createTextChannel(guild, name, categoryId, permissionOverwrites) {
    guild.channels.create(name, {
        type: 'GUILD_TEXT',
        parent: categoryId,
        permissionOverwrites: permissionOverwrites
    });
}

async function createVoiceChannel(guild, name, categoryId, permissionOverwrites) {
    guild.channels.create(name, {
        type: 'GUILD_Voice',
        parent: categoryId,
        permissionOverwrites: permissionOverwrites
    });
}