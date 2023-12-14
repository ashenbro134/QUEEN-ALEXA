import { exec } from 'child_process'
import speed from 'performance-now'

let handler = async (m, { conn }) => {

  let pingMsg = await conn.sendMessage(m.chat, {text: 'Pinging...'})

  let timestamp = speed()

  await exec('neofetch --stdout', async (error, stdout) => {

    let latency = (speed() - timestamp).toFixed(4)

    await conn.relayMessage(m.chat, {
      protocolMessage: {
        key: pingMsg.key,
        type: 14,
        editedMessage: {
          conversation: `
┍━━━━━━━━━━━━━━━━━━ •
│*💝𝗤𝗨𝜩𝜩𝗡│𝜟𝗟𝗘𝗫𝗔│𝗠𝗗💝*
│ 𝗣𝗢𝗡𝗚 ${latency} 𝗠𝗦
┗━━━━━━━━━━━━━━━━━━ •
` 
        }
      }
    }, {})

  })

}

handler.help = ['ping']
handler.tags = ['main']
handler.command = ['ping', 'speed'] 

export default handler
