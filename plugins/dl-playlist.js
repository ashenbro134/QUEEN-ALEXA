
import { youtubeSearch } from '@bochilteam/scraper'
import yts from 'yt-search'
let handler = async(m, { conn, usedPrefix, text, args, command }) => {

    if (!text) throw `🌀 please Enter The Text \n\n*📌 Example*\n*${usedPrefix + command}* Chilhood `
    m.react('📀')
    let result = await yts(text)
    let ytres = result.videos
    let listSections = []
	Object.values(ytres).map((v, index) => {
	listSections.push([`${index}┃ ${v.title}`, [
          ['🎶 MP3', `${usedPrefix}fgmp3 ${v.url}`, `⦁ ⏰ *Duration:* ${v.timestamp}\n⦁ 👀 *Views:* ${v.views}\n⦁ 📝 *Title* : ${v.title}\n⦁ 📆 *published day:* ${v.ago}\n`],
          ['🎥 MP4', `${usedPrefix}fgmp4 ${v.url}`, `⦁ ⏰ *Duration:* ${v.timestamp}\n⦁ 👀 *Views:* ${v.views}\n⦁ 📝 *Title* : ${v.title}\n⦁ 📆 *published day:* ${v.ago}\n`]
        ]])
	})
	return conn.sendList(m.chat, '✘『𝗦𝗔𝗞𝗨𝗥𝗔-𝗣𝗟𝗔𝗬_𝗟𝗜𝗦𝗧』✘', `\n 📀 PLAYLIST DESCRIPTION  :\n *${text}*`, fgig, `Click Aquí `, listSections, m)
}
handler.help = ['play2']
handler.tags = ['dl']
handler.command = ['play2', 'playvid2', 'playlist', 'playlista'] 
handler.disabled = false

export default handler
