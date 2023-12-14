import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.owner = [
  ['94726962984', 'Ashen', true],
  ['94726962984'], 
  ['94726962984'] 
] //Numeros de owner 

global.mods = ['94726962984'] 
global.prems = ['94726962984', '94726962984', '94726962984']
global.APIs = { // API Prefix
  // name: 'https://website'
  xteam: 'https://api.xteam.xyz', 
  nrtm: 'https://fg-nrtm.ddns.net',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api.fgmods.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://zenzapis.xyz': '675e34de8a', 
  'https://api.fgmods.xyz': 'dEBWvxCY' //--- 100 de límite diario --- Regístrese en https://api.fgmods.xyz/
}

// Sticker WM
global.packname = '𝗤𝗨𝜩𝜩𝗡│𝜟𝗟𝗘𝗫𝗔│𝗠𝗗' 
global.author = '@ashenbro134' 
global.fgig = '▢ Sígueme en Instagram\nhttps://www.instagram.com/alexa_ff\n' 
global.dygp = 'https://chat.whatsapp.com/C4mcek6i7aE2P1iDcJpmoo'
global.fgsc = 'https://github.com/ashenbro134/QUEEN-ALEXA' 
global.fgyt = 'https://youtube.com/fg98f'
global.fgpyp = 'https://paypal.me/'
global.fglog = 'https://i.imgur.com/Owmb93c.png' 

global.wait = '*⌛ _Waiting..._*\n*▰▰▰▱▱▱▱▱*'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🔥' 

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
