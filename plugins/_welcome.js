import { WAMessageStubType } from '@whiskeysockets/baileys'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  const chat = global.db.data.chats[m.chat]
  if (!chat?.welcome) return true

  const user = m.messageStubParameters?.[0]
  if (!user) return true

  const members = participants.length
  const pp = await conn.profilePictureUrl(user, 'image')
    .catch(() => 'https://files.catbox.moe/thv0ck.png')

  const context = {
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: global.my?.ch,
        newsletterName: global.my?.name
      },
      externalAdReply: {
        title: '𝑺𝒆𝒏𝒌𝒐 𝑨𝑰',
        body: 'Powered by 𝕯𝖆𝖓𝖎𝖊𝖑𝕣𝕩𝕫',
        thumbnailUrl: global.icon,
        sourceUrl: global.channel || '',
        mediaType: 1,
        renderLargerThumbnail: false
      },
      mentionedJid: [user]
    }
  }

  /* ───────────── BIENVENIDA ───────────── */
  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    const text = `
╭─〔 ★ Bɪᴇɴᴠᴇɴɪᴅᴏ ★ 〕─╮
│ ✦ ᴜsᴜᴀʀɪᴏ: @${user.split('@')[0]}
│ ✦ ɢʀᴜᴘᴏ: ${groupMetadata.subject}
│ ✦ ᴍɪᴇᴍʙʀᴏs: ${members + 1}
│
│ (⁠≧⁠▽⁠≦⁠) Hᴏʟᴀ, sᴏʏ Sᴇɴᴋᴏ Aɪ!
│ ₊˚ෆ Dɪsғʀᴜᴛᴀ ᴛᴜ ᴇsᴛᴀɴᴄɪᴀ ♡
╰─〔 ☆ Sᴛᴀғғ Sᴇɴᴋᴏ Aɪ ☆ 〕─
`

    await conn.sendMessage(m.chat, {
      image: { url: pp },
      caption: text,
      ...context
    })

    await conn.sendMessage(m.chat, {
      audio: { url: 'https://files.catbox.moe/9ucrk5.mp3' },
      mimetype: 'audio/mpeg',
    })
  }

  /* ───────────── DESPEDIDA ───────────── */
  if (
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE ||
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE
  ) {
    const text = `
╭─〔 ★ Hᴀsᴛᴀ ᴘʀᴏɴᴛᴏ ★ 〕─╮
│ ✦ ᴜsᴜᴀʀɪᴏ: @${user.split('@')[0]}
│ ✦ ɢʀᴜᴘᴏ: ${groupMetadata.subject}
│
│ ʕっ•́ᴥ•̀ʔっ Gʀᴀᴄɪᴀs ᴘᴏʀ ᴘᴀʀᴛɪᴄɪᴘᴀʀ
│ ₊˚ෆ Tᴇ ᴅᴇsᴇᴀᴍᴏs ʟᴏ ᴍᴇᴊᴏʀ ♡
╰─〔 ☆ Sᴇɴᴋᴏ Aɪ Tᴇᴀᴍ ☆ 〕─╯
`

    await conn.sendMessage(m.chat, {
      image: { url: pp },
      caption: text,
      ...context
    })

    await conn.sendMessage(m.chat, {
      audio: { url: 'https://files.catbox.moe/ofh5s0.mp3' },
      mimetype: 'audio/mpeg',
    })
  }

  return true
}