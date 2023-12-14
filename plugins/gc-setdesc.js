let handler = async (m, { conn, args }) => {
    await conn.groupUpdateDescription(m.chat, `${args.join(" ")}`);
    m.reply('
┍━━━━━━━━━━━━━━━━━━ •
│*💝𝗤𝗨𝜩𝜩𝗡│𝜟𝗟𝗘𝗫𝗔│𝗠𝗗💝*
*✅Success changing The description of the group*
┗━━━━━━━━━━━━━━━━━━ •')
    }
    handler.help = ['Setdesc <text>']
    handler.tags = ['group']
    handler.command = /^setdesk|setdesc$/i
    handler.group = true
    handler.admin = true
    handler.botAdmin = true
    export default handler