
let handler = async (m, { conn, args, usedPrefix, command }) => {
	
	let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
   m.reply(`
        💝𝘼𝙇𝙀𝙓𝘼 𝙍𝙐𝙉 𝙏𝙄𝙈𝙀💝
   ❀° ┄────────•••───╮
          \n\n${muptime}
     ╰─────────•••──┄ °❀ `) 
}
handler.help = ['runtime']
handler.tags = ['main']
handler.command = ['runtime', 'uptime']
export default handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, '𝘿 ', h, '𝙃 ', m, '𝙈 ', s, '𝙎 '].map(v => v.toString().padStart(2, 0)).join('')
}
