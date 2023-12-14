import {
    promises,
    readFileSync
   } from "fs"
   import {
    join
   } from "path"
   import {
    xpRange
   } from "../lib/levelling.js"
   import moment from "moment-timezone"
   import os from "os"

  
   let groupmenu = `
 
 ❀° ┄──•••───╮
          𝙂𝙍𝙊𝙐𝙋 𝙈𝙀𝙉𝙐  
     ╰───•••──┄ °❀  
  ◈ .getbio <@tag/reply>  Ⓛ
  ◈ .Setdesc <text>
  ◈ .setname <text>
  ◈ .demote (@tag)
  ◈ .infogp
  ◈ .hidetag
  ◈ .invite <917xxx>
  ◈ .kick @user
  ◈ .link
  ◈ .poll question|option|option
  ◈ .promote
  ◈ .resetlink
  ◈ .setbye <text>
  ◈ .group *open/close*
  ◈ .setwelcome <text>
  ◈ .tagall
  ◈ .totag
  ╰──────────⳹`
  
  let ownermenu = `
  
  ❀° ┄──•••───╮
          𝙊𝙒𝙉𝙀𝙍 𝙈𝙀𝙉𝙐  
     ╰───•••──┄ °❀  
  ◈ .addprem <@tag>
  ◈ .addowner @user
  ◈ .allow <@tag>
  ◈ .HEROKU
  ◈ .ban @user
  ◈ .banchat
  ◈ .tx
  ◈ .broadcastgroup <text>
  ◈ .bcgc <text>
  ◈ .cleartmp
  ◈ .delexpired
  ◈ .delprem @user
  ◈ .removeowner @user
  ◈ .setppbotfull
  ◈ .getplugin <name file>
  ◈ .getfile <name file>
  ◈ .join <chat.whatsapp.com> <dias>
  ◈ .reset <54xxx>
  ◈ .resetprefix
  ◈ .restart
  ◈ ..setprefix
  ◈ ..setprefix [symbol]
  ◈ .unban @user
  ◈ .unbanchat
  ◈ .update
  ◈ .config
  ◈ .listban
  ◈ .deleteplugin <name>
  ╰──────────⳹`
  
  let dlmenu = `
  
  ❀° ┄──•••───╮
         𝘿𝙇 𝙈𝙀𝙉𝙐  
     ╰───•••──┄ °❀  
  
  ◈ .facebook <url>
  ◈ .gitclone <url>
  ◈ .instagram
  ◈ .mediafire <url>
  ◈ .modapk
  ◈ .play <query>
  ◈ .playvid <text>
  ◈ .spotify
  ◈ .tiktok <url>
  ◈ .tiktokstalk
  ◈ .twitter <url>
  ◈ .ytmp3 <url>
  ◈ .yts
  ◈ .ytmp4 <yt-link>
  ╰──────────⳹`
  
  let gamemenu = `
 
 ❀° ┄──•••───╮
          𝙂𝘼𝙈𝙀 𝙈𝙀𝙉𝙐  
     ╰───•••──┄ °❀  
     
     𝘾𝙊𝙈𝙈𝙄𝙉𝙂 𝙎𝙊𝙊𝙉
  ╰──────────⳹`
  let logomenu = `
 
 ❀° ┄──•••───╮
          𝙇𝙊𝙂𝙊 𝙈𝙀𝙉𝙐  
     ╰───•••──┄ °❀  
 💝𝘾𝙊𝙈𝙈𝙄𝙉𝙂 𝙎𝙊𝙊𝙉
  ◈ .gfx1
  ◈ .gfx2
  ◈ .gfx3
  ◈ .gfx4
  ◈ .gfx5
  ◈ .gfx6
  ◈ .gfx7
  ◈ .gfx8
  ◈ .gfx9
  ◈ .gfx10
  ◈ .gfx11
  ◈ .gfx12
  ╰──────────⳹`
  
  let stickermenu = `
 
 ❀° ┄──•••───╮
          𝙎𝙏𝙄𝘾𝙆𝙀𝙍 𝙈𝙀𝙉𝙐  
     ╰───•••──┄ °❀  
 
  ◈ .emojimix <emoji+emoji>
  ◈ .ttp
  ◈ .attp
 
  ╰──────────⳹`

  
  
  let toolsmenu = `
  
  ❀° ┄──•••───╮
          𝙏𝙊𝙊𝙇𝙎 𝙈𝙀𝙉𝙐  
     ╰───•••──┄ °❀  
  
  ◈ .weather *<place>*
  ◈ .tempmail
  ◈ .element
  ◈ .google
  ◈ .readmore <text1>|<text2>
  ◈ .ss <url>
  ◈ .tourl
  ◈ .translate <lang> <text>
  ◈ .tts <lang> <task>
  ◈ .wa
  ◈ .wikipedia
  ╰──────────⳹`
  
  let Aimenu = `
  ✦ ───『 *AI* 』─── ⚝
  ◈ .chatgpt
  ◈ .ai
  ◈ .bard
  ◈ .alexa
  ╰──────────⳹
  `
  
  const handler = async (m, {
    conn,
    command,
    text,
    args,
    usedPrefix
  }) => {
    
  
   let glb = global.db.data.users
   let usrs = glb[m.sender]
   let tag = `@${m.sender.split("@")[0]}`
   let mode = global.opts["self"] ? "Private" : "Public"
   
   let {
  age,
  exp,
  limit,
  level,
  role,
  registered,
  credit
   } = glb[m.sender]
   let {
  min,
  xp,
  max
   } = xpRange(level, global.multiplier)
   let name = await conn.getName(m.sender)
   let premium = glb[m.sender].premiumTime
   let prems = `${premium > 0 ? "Premium": "Free"}`
   let platform = os.platform()
  
  
   let ucpn = `${ucapan()}`
  
   let _uptime = process.uptime() * 1000
   let _muptime
   if (process.send) {
  process.send("uptime")
  _muptime = await new Promise(resolve => {
  process.once("message", resolve)
  setTimeout(resolve, 1000)
  }) * 1000
   }
   let muptime = clockString(_muptime)
   let uptime = clockString(_uptime)
  
   
   let totalfeatures = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
   let totalreg = Object.keys(glb).length
  
    conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};
    
   
    global.fcontact = { key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
    const infoText = `
    ${botname} 💝⁩ 」\n
    Hii ${name} USER
    
    *${ucpn}* 
   
         『 *U S E R*』
    💝 *Name:* ${name}
    💝 *Gold:* ${credit}
    💝 *Role:* ${role}
    💝 *Level:* ${level}
    💝 *Xp:* ${exp}
    ╰──────────⳹
   
         『 *I N F O*』
    💝 *Bot Name:* ${botname}
    💝 *Mode:* ${mode}
    💝 *Platform:* ${platform}
    💝 *Type:* NodeJs
    💝 *Baileys:* Multi Device
    💝 *Prefix:* [ *${usedPrefix}* ]
    💝 *Uptime:* ${muptime}
    💝 *Database:*  ${totalreg}
    ╰──────────⳹
    
       『 *I N F O  C M D*』 
    │ *${totalfeatures}* Commands
    ╰──────────⳹
     ${readMore}

    乂───『 *INFO*』───乂 
  │*Reply with the number*
  │ to get respected Menu*
  ╰───────⳹
  ╭───────⳹
  │ *1.* Bot Menu
  │ *2.* Owner Menu
  │ *3.* Group Men𝙪
  │ *6.* Downloader Menu
  │ *7.* Game Menu
  │ *8.* Logo Menu
  │ *9.* Sticker Menu
  │ *15.* Tools Menu
  │ *16.* AI Menu
  ╰───────⳹
 ${readMore}` 
;

  
  const { result, key, timeout } = await conn.sendMessage(m.chat, { video: { url: menuvid }, caption: infoText.trim(),  gifPlayback: true,
  gifAttribution: 0}, { quoted: fcontact })
  
  // Save the menu options to gurumenu
  conn.gurumenu[m.sender] = {
    result,
    key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
          delete: key
      });
      delete conn.gurumenu[m.sender];
  }, 60 * 1000),
  };
  };
  
 
  handler.before = async (m, { conn }) => {
    conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};
    if (m.isBaileys || !(m.sender in conn.gurumenu)) return;
    const { result, key, timeout } = conn.gurumenu[m.sender];
    if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
    const choice = m.text.trim();
    
    if (choice === "1") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: botmenu
      }, { quoted:fcontact });
      } else if (choice === "2") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: ownermenu
      }, { quoted:fcontact });
      } else if (choice === "3") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: groupmenu
      }, { quoted:fcontact });
      } else if (choice === "4") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: funmenu
      }, { quoted:fcontact });
      } else if (choice === "5") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: reactmenu
      }, { quoted:fcontact });
      } else if (choice === "6") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: dlmenu
      }, { quoted:fcontact });
      } else if (choice === "7") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: groupmenu
      }, { quoted:fcontact });
      } else if (choice === "8") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: logomenu
      }, { quoted:fcontact });
      } else if (choice === "9") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: stickermenu
      }, { quoted:fcontact });
      } else if (choice === "10") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: audiomenu
      }, { quoted:fcontact });
      } else if (choice === "11") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: newsmenu
      }, { quoted:fcontact });
      } else if (choice === "12") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: economy
      }, { quoted:fcontact });
      } else if (choice === "13") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: animemenu
      }, { quoted:fcontact });
      } else if (choice === "14") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: nsfwmenu
      }, { quoted:fcontact });
      } else if (choice === "15") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: toolsmenu
      }, { quoted:fcontact });
      } else if (choice === "16") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: Aimenu
      }, { quoted:fcontact });
      } else if (choice === "17") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: religionmenu
      }, { quoted:fcontact });
      } else if (choice === "18") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: pluginmenu
      }, { quoted:fcontact });
      } else {
        m.reply('Invalid choice. Please reply with a valid number.');
      }
  
  };
  
  
  handler.help = ["play"];
  handler.tags = ["downloader"];
  handler.command = /^(panel)$/i;
  handler.limit = true;
  export default handler;
  
  
  
  
  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
   }
   
   const more = String.fromCharCode(8206)
   const readMore = more.repeat(4001)
   
   function clockString(ms) {
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [h, " H ", m, " M ", s, " S "].map(v => v.toString().padStart(2, 0)).join("")
   }
   
   function clockStringP(ms) {
    let ye = isNaN(ms) ? "--" : Math.floor(ms / 31104000000) % 10
    let mo = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12
    let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000) % 30
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [ye, " *Years 🗓️*\n", mo, " *Month 🌙*\n", d, " *Days ☀️*\n", h, " *Hours 🕐*\n", m, " *Minute ⏰*\n", s, " *Second ⏱️*"].map(v => v.toString().padStart(2, 0)).join("")
   }
   
   function ucapan() {
    const time = moment.tz("Asia/Kolkata").format("HH")
    let res = "Good morning ☀️"
    if (time >= 4) {
     res = "Good Morning 🌄"
    }
    if (time >= 10) {
     res = "Good Afternoon ☀️"
    }
    if (time >= 15) {
     res = "Good Afternoon 🌇"
    }
    if (time >= 18) {
     res = "Good Night 🌙"
    }
    return res
   }
  
