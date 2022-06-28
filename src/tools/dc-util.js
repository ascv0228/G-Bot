module.exports = {
    pickUserId: pickUserId,
    pickRoleId: pickRoleId,
    getUserByTag: getUserByTag,
    getUserByID: getUserByID,
    getMemberByTag: getMemberByTag,
    getMemberByID: getMemberByID,
    getRoleByID: getRoleByID,
    getGuildByID: getGuildByID,
    pickAllRoleId: pickAllRoleId,
    msg_react: msg_react,
    createRole: createRole,
    createTextChannel: createTextChannel,
    createVoiceChannel: createVoiceChannel,
    createInvite: createInvite,
    catcat: catcat
};

function pickUserId(str) {
    if (!str) return null;
    const mats = str.match(/^<@!?(\d+)>$/);
    if (mats) {
        return mats[1];
    }
    return null;
}

function pickRoleId(str) {
    if (!str) return null;
    const mats = str.match(/<@&(\d{18})>/);
    if (mats) {
        return mats[1];
    }
    return null;
}

function pickAllRoleId(str) {
    if (!str) return null;
    const regexp = /<@&(\d{18})>/g;
    const array = [...str.matchAll(regexp)];
    if (array.length) {
        return array;
    }
    return null;
}


async function getUserByTag(guild, str) {
    let UserID = pickUserId(str);
    if (!UserID) return;
    let member = await getMemberByID(guild, UserID);
    if (member == null) {
        return null;
    }
    return member.user
}

async function getUserByID(guild, UserID) {
    //const user = await guild.users.fetch(UserID).catch(console.error);
    //console.log(user);
    let member = await getMemberByID(guild, UserID);
    if (member == null) {
        return null;
    }
    return member.user
}

async function getMemberByTag(guild, str) {
    let MemberID = pickUserId(str);
    console.log(MemberID)
    if (!MemberID) return null;
    let member = await getMemberByID(guild, MemberID);
    return member
}

async function getMemberByID(guild, MemberID) {
    try {
        const member = await guild.members.fetch(MemberID);
        return member;
    }
    catch {
        return null;
    }
}

async function msg_react(channel, msg_Id, reactions) {
    // const channel = client.channels.cache.get(channel_Id)
    const messageToReact = await channel.messages.fetch(msg_Id);
    for (let i of reactions) {
        await messageToReact.react(i);
    }
}

async function getRoleByID(guild, RoleID) {
    try {
        const role = await guild.roles.fetch(RoleID);
        return role;
    }
    catch {
        return null;
    }
}

async function getGuildByID(client, GuildID) {
    try {
        let guild = await client.guilds.cache.get(GuildID);
        return guild;
    }
    catch {
        return null;
    }
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
    return await guild.roles.create({
        name: name,
        color: "RANDOM",
    })
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

async function createInvite(guild, options = { maxAge: 60 * 60, maxUses: 0 }) {
    let channel = guild.systemChannel

    if (!channel) return;
    return await channel.createInvite(options)
}

async function catcat(client, msg) {
    // https://discord.com/channels/988795992667193395/991256310563733564/991257219356168242
    await msg.edit({ content: '`臭貓貓` 狀態: ' + (client.catOpen ? '開' : '關') });
}