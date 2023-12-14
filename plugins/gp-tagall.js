let handler = async (m, { conn, text, participants, isAdmin, isOwner, groupMetadata }) => {
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    m.react('📍')
    m.reply(`🎀 *GROUP* : *${groupMetadata.subject}*\n🔱 *Members* : *${participants.length}*${text ? `\n🔖 Massage : ${text}\n` : ''}\n✘ ❬ *TAG-ALL* ❭ ✘\n` + users.map(v => '🍃 @' + v.replace(/@.+/, '')).join`\n` + '\n💝𝗤𝗨𝗘𝗘𝗡-𝗔𝗟𝗘𝗫𝗔*', null, {
        mentions: users
    })
}

handler.help = ['tagall']
handler.tags = ['group']
handler.command = ['tagall']
handler.admin = true
handler.group = true

export default handler
