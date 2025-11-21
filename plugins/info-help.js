import fetch from 'node-fetch'
import fs from 'fs'
import axios from 'axios'
import moment from 'moment-timezone'
import { commands } from '../lib/commands.js'

let handler = async (m, { conn, args, usedPrefix }) => { 
  try {

    const cmdsList = commands
    let now = new Date()
    let colombianTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Bogota' }))
    let tiempo = colombianTime.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric', 
    }).replace(/,/g, '')

    let tiempo2 = moment.tz('America/Bogota').format('hh:mm A')

    let sessionFolder = './plugins'
    let subSessions = fs.existsSync(sessionFolder) ? fs.readdirSync(sessionFolder) : []
    let plugins = subSessions.length

    let isOficialBot = conn.user.jid === globalThis.conn.user.jid

    let botType = isOficialBot ? 'Principal' : 'Sub-Bot'

const jam = moment.tz('America/Bogota').locale('id').format('HH:mm:ss')
const ucapan = jam < '05:00:00' ? 'Buen día' : jam < '11:00:00' ? 'Buen día' : jam < '15:00:00' ? 'Buenas tardes' : jam < '18:00:00' ? 'Buenas tardes' : jam < '19:00:00' ? 'Buenas tardes' : jam < '23:59:00' ? 'Buenas noches' : 'Buenas noches';

let menu = `\n\n`
menu += `> . ﹡ ﹟ ⛄ ׄ ⬭ ${ucapan}  *${m.pushName ? m.pushName : 'Sin nombre'}*\n\n`
menu += `ׅㅤꨶ〆⁾ *Menu navideño 🌲*ㅤᯭִ\n`
menu += `ׅㅤ𓏸𓈒ㅤׄ *Plugins ›* ${plugins}\n`
menu += `ׅㅤ𓏸𓈒ㅤׄ *Versión ›* ^0.0.9 ⋆. 𐙚 ˚\n\n`
menu += `ׅㅤ𓏸𓈒ㅤׄ *Fecha ›* ${tiempo}, ${tiempo2}\n`

    const categoryArg = args[0]?.toLowerCase();
    const categories = {};

    for (const command of cmdsList) {
      const category = command.category || 'otros';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(command);
    }

    if (categoryArg && !categories[categoryArg]) {
      return m.reply(`⭐ La categoría *${categoryArg}* no encontrada.`);
    }

    for (const [category, cmds] of Object.entries(categories)) {
      if (categoryArg && category.toLowerCase() !== categoryArg) {
        continue;
      }
      const catName = category.charAt(0).toUpperCase() + category.slice(1)
      menu += `\nㅤ☃️ᯭ⁾ ㅤׄ  ꤥㅤׄㅤꤪꤨ${catName}ㅤꤪꤨㅤ֢ㅤׄㅤׅ\n`
      cmds.forEach(cmd => {
      const match = usedPrefix.match(/[#\/+.!-]$/);
const separator = match ? match[0] : '';
      const cleanPrefix = separator ? separator : usedPrefix;
      const aliases = cmd.alias.map(a => {
  const aliasClean = a.split(/[\/#!+.\-]+/).pop().toLowerCase();
      return `${cleanPrefix}${aliasClean}`}).join(' › ');
        menu += `֯　ׅ🌱ֶ•ㅤ *${aliases}* ${cmd.uso ? `+ ${cmd.uso}` : ''}\n`;
        menu += `> _*${cmd.desc}*_\n`;
      });
    }

  const canales = Object.entries(global.my)
  .reduce((acc, [key, value]) => {
    if (key.startsWith('ch')) {
      const index = key.slice(2)
      const nombre = global.my[`name${index}`]
      if (nombre) {
        acc.push({ id: value, nombre })
      }
    }
    return acc
  }, [])

const channelRD = canales[Math.floor(Math.random() * canales.length)]

 await conn.sendMessage(m.chat, {
document: await (await fetch(banner)).buffer(),
fileName: '^0.0.10 | Yuuki ☀️',
mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
fileLength: '0',
pageCount: '1',
caption: menu.trim(),
contextInfo: {
forwardingScore: 0,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: channelRD.id,
serverMessageId: '0',
newsletterName: channelRD.nombre
},
externalAdReply: {
title: botname,
body: dev, 
showAdAttribution: false,
thumbnailUrl: banner,
mediaType: 1,
previewType: 0,
renderLargerThumbnail: true,
mediaUrl: null,
sourceUrl: null,
}
}}, { quoted: m })

  } catch (e) {
    await m.reply(`🕸 Error [${e}]`)
  }
}

handler.help = ['menu', 'help']
handler.tags = ['info']
handler.command = ['menu', 'help'] 
export default handler