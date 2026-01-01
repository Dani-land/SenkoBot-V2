import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  const fkontak = {
    "key": {
      "participants": "0@s.whatsapp.net",
      "remoteJid": "status@broadcast",
      "fromMe": false,
      "id": "Halo"
    },
    "message": {
      "contactMessage": {
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    "participant": "0@s.whatsapp.net"
  }

  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image')
    .catch(_ => 'https://cdn.russellxz.click/d8dd8517.jpeg')
  let img = await (await fetch(pp)).buffer()
  let chat = global.db.data.chats[m.chat]
  let txt = '✿⋆｡˚  𝑵𝒆𝒘 𝑴𝒆𝒎𝒃𝒆𝒓 ˚｡⋆✿'
  let txt1 = '⋆｡˚ ✩ 𝑴𝒆𝒎𝒃𝒆𝒓 𝑶𝒖𝒕 ✩˚｡⋆'
  let groupSize = participants.length

  if (m.messageStubType == 27) groupSize++
  else if (m.messageStubType == 28 || m.messageStubType == 32) groupSize--

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `❀ Bienvenido al grupo *${groupMetadata.subject}* ⊹₊˚.\n` +
      `✨ @${m.messageStubParameters[0].split`@`[0]} llegó con todo el ánimo ~\n\n` +
      `${global.welcom1}\n\n` +
      `🍥 𝑨𝒉𝒐𝒓𝒂 𝒔𝒐𝒎𝒐𝒔 *${groupSize}* personitas en el grupo\n` +
      `usa *#help* 𝒑𝒂𝒓𝒂 𝒗𝒆𝒓 𝒍𝒐𝒔 𝒄𝒐𝒎𝒂𝒏𝒅𝒐𝒔 🚀.`
    await conn.sendMini(m.chat, txt, dev, bienvenida, img, img, redes, fkontak)
  }

  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = `✿ Alguien se tuvo que marchar *${groupMetadata.subject}*… (｡•́︿•̀｡)\n` +
      `🍂 @${m.messageStubParameters[0].split`@`[0]} Ojalá lo atropelle un caballo XD~\n\n` +
      `${global.welcom2}\n\n` +
      `☁️ 𝑨𝒉𝒐𝒓𝒂 𝒔𝒐𝒎𝒐𝒔 *${groupSize}* miembros...~\n` +
      `🍃 Recuerda el bot no olvida ฅ⁠^⁠•⁠ﻌ⁠•⁠^⁠ฅ⡱`
    await conn.sendMini(m.chat, txt1, dev, bye, img, img, redes, fkontak)
  }
}