import yts from 'yt-search'
import fs from 'fs'

let handler = async (m, {conn, text }) => {
  if (!text) throw '💝What are you looking for?'
  await conn.reply(m.chat, global.wait, m)
  let results = await yts(text)
  let tes = results.all
  let teks = results.all.map(v => {
    switch (v.type) {
      case 'video': return `
° *_${v.title}_*
↳ 🫐 *_Link :_* ${v.url}
↳ 🕒 *_Duration :_* ${v.timestamp}
↳ 📥 *_Uploaded :_* ${v.ago}
↳ 👁 *_Views :_* ${v.views}`}}).filter(v => v).join('\n\n➚➚➚➚➚➚➚𝘈𝘓𝘌𝘟𝘈 𝘠𝘛 𝘚𝘌𝘈𝘙𝘊𝘏➚➚➚➚➚➚\n\n')
  conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, m)
}
handler.help = ['ytsearch'] 
handler.tags = ['dl']
handler.command = ['ytsearch', 'yts'] 

export default handler
