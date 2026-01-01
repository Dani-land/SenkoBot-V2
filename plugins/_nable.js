import { createHash } from 'crypto' 
import fetch from 'node-fetch'

const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = command.toLowerCase()
  let isAll = false, isUser = false
  let isEnable = chat[type] || false

  if (args[0] === 'on' || args[0] === 'enable') {
    isEnable = true
  } else if (args[0] === 'off' || args[0] === 'disable') {
    isEnable = false
  } else {
    const estado = isEnable ? '𝑨ctivado' : '𝑫𝒆𝒔𝒂𝒄𝒕𝒊𝒗𝒂𝒅𝒂'
    return conn.reply(m.chat, `🍃・*Opciones para ${command}*・\n\n` +
    `🍃 Usa:\n` +
    `┊• *${usedPrefix}${command} on* para encenderlo\n` +
    `┊• *${usedPrefix}${command} off* para apagarlo~\n\n` +
    `=🌱 Estado actual: *${estado}*`, m)
  }

  switch (type) {
    case 'welcome':
    case 'bienvenida':
      if (!m.isGroup && !isOwner) return global.dfail('group', m, conn)
      else if (!isAdmin) return global.dfail('admin', m, conn)
      chat.welcome = isEnable
      break  

    case 'antiprivado':
    case 'antiprivate':
      isAll = true
      if (!isOwner) return global.dfail('rowner', m, conn)
      bot.antiPrivate = isEnable
      break

    case 'restrict':
    case 'restringir':
      isAll = true
      if (!isOwner) return global.dfail('rowner', m, conn)
      bot.restrict = isEnable
      break

    case 'antibot':
    case 'antibots':
      if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
      chat.antiBot = isEnable
      break

    case 'autoaceptar':
    case 'aceptarauto':
      if (!m.isGroup && !isOwner) return global.dfail('group', m, conn)
      else if (!isAdmin) return global.dfail('admin', m, conn)
      chat.autoAceptar = isEnable
      break

    case 'autorechazar':
    case 'rechazarauto':
      if (!m.isGroup && !isOwner) return global.dfail('group', m, conn)
      else if (!isAdmin) return global.dfail('admin', m, conn)
      chat.autoRechazar = isEnable
      break

    case 'autoresponder':
    case 'autorespond':
      if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
      chat.autoresponder = isEnable
      break

    case 'antisubbots':
    case 'antibot2':
      if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
      chat.antiBot2 = isEnable
      break

    case 'modoadmin':
    case 'soloadmin':
      if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
      chat.modoadmin = isEnable
      break

    case 'reaction':
    case 'reaccion':
      if (!m.isGroup && !isOwner) return global.dfail('group', m, conn)
      else if (!isAdmin) return global.dfail('admin', m, conn)
      chat.reaction = isEnable
      break

    case 'nsfw':
    case 'modohorny':
      if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
      chat.nsfw = isEnable
      break

    case 'jadibotmd':
    case 'modejadibot':
      isAll = true
      if (!isOwner) return global.dfail('rowner', m, conn)
      bot.jadibotmd = isEnable
      break

    case 'detect':
    case 'avisos':
      if (!m.isGroup && !isOwner) return global.dfail('group', m, conn)
      else if (!isAdmin) return global.dfail('admin', m, conn)
      chat.detect = isEnable
      break

    case 'antilink':
      if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
      chat.antiLink = isEnable
      break

    case 'antifake':
      if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
      chat.antifake = isEnable
      break
  }

  chat[type] = isEnable

  conn.reply(m.chat, `🌸 La opción *${type}* ha sido *${isEnable ? 'encendida' : 'apagada'}* ${isAll ? 'para el bot~' : 'en este grupo bonito~ 🍥'}`, m)
}

handler.help = ['welcome', 'bienvenida', 'antiprivado', 'antiprivate', 'restrict', 'restringir', 'autolevelup', 'autonivel', 'antibot', 'antibots', 'autoaceptar', 'aceptarauto', 'autorechazar', 'rechazarauto', 'autoresponder', 'autorespond', 'antisubbots', 'antibot2', 'modoadmin', 'soloadmin', 'reaction', 'reaccion', 'nsfw', 'modohorny', 'antispam', 'jadibotmd', 'modejadibot', 'subbots', 'detect', 'avisos', 'antilink', 'antifake']
handler.tags = ['nable']
handler.command = ['welcome', 'bienvenida', 'antiprivado', 'antiprivate', 'restrict', 'restringir', 'autolevelup', 'autonivel', 'antibot', 'antibots', 'autoaceptar', 'aceptarauto', 'autorechazar', 'rechazarauto', 'autoresponder', 'autorespond', 'antisubbots', 'antibot2', 'modoadmin', 'soloadmin', 'reaction', 'reaccion', 'nsfw', 'modohorny', 'antispam', 'jadibotmd', 'modejadibot', 'subbots', 'detect', 'avisos', 'antilink', 'antifake']

export default handler