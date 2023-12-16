let handler = m => m
handler.all = async function (m) {
	let setting = global.db.data.settings[this.user.jid]
	
let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
		let bio = `\n💝 𝘛𝘏𝘌 𝘘𝘜𝘌𝘌𝘕 𝘈𝘓𝘌𝘟𝘈 𝘞𝘏𝘈𝘛𝘚𝘈𝘗𝘗_𝘉𝘖𝘛 🔥 BOT_RUNTIME ${muptime} THE BEST SRI-LANKAN WHATSAPP BOT 🥰`
		await this.updateProfileStatus(bio).catch(_ => _)
		setting.status = new Date() * 1

}
export default handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, ' 📅𝘋 ', h, ' 🕗𝘏  ', m, ' ⏳𝘔 '].map(v => v.toString().padStart(2, 0)).join('')
}
