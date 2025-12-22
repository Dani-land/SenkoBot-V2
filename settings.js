import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"

global.botNumber = ""

global.owner = [
// <-- Número @s.whatsapp.net -->
  ['526242262017', 'Danielrxz', true],
// <-- Número @lid -->
  ['239041421299910', 'Danielrxz', true],
  ['', '', true], 
  ['', '', true]
];
global.collaborators = ["526442036556"];
global.Administrators = ["5959821399"];

global.botname = '☆ Sᴇɴᴋᴏ Aɪ'
global.namebot = '☆ SenkoBot'
global.bot = '𝑺𝒆𝒏𝒌𝒐𝑺𝒂𝒏 𝑨𝑰'
global.packname = '☆ 𝑺𝒆𝒏𝒌𝒐 𝑨𝑰'
global.wm = '☆ Sᴇɴᴋᴏ Aɪ'
global.author = '•˚ 𝘋𝘢𝘯𝘪𝘦𝘭ʳˣᶻ ˚•'
global.dev = '© P𝕠𝕨𝕖𝕣𝕖d B𝕪 𝕯𝖆𝖓𝖎𝖊𝖑𝕣𝕩𝕫.'
global.team = '☆ Sᴇɴᴋᴏ Aɪ Tᴇᴀᴍ ☆'

global.APIs = {
xyro: { url: "https://api.xyro.site", key: null },
yupra: { url: "https://api.yupra.my.id", key: null },
vreden: { url: "https://api.vreden.web.id", key: null },
delirius: { url: "https://api.delirius.store", key: null },
zenzxz: { url: "https://api.zenzxz.my.id", key: null },
siputzx: { url: "https://api.siputzx.my.id", key: null },
adonix: { url: "https://api-adonix.ultraplus.click", key: 'AdonixKey4vqkxt2009' }
}

global.banner = 'https://files.catbox.moe/u3hxp7.jpg'
global.icon = 'https://files.catbox.moe/so4qhl.jpg'
global.icons = 'https://files.catbox.moe/2mzjm9.jpg'
global.currency = 'Coins'
global.sessions = 'sessions'
global.jadi = 'jadi-sub'
global.namedb = 'datos.json'

global.my = {
  ch: '120363420575743790@newsletter',
  name: '✦ 𝑺𝒆𝒏𝒌𝒐𝑺𝒂𝒏 𝑨𝑰 𝑪𝒉𝒂𝒏𝒏𝒆𝒍 ﻿✦',

  ch2: '120363420575743790@newsletter', 
  name2: '𓆩 𝙼𝚊𝚍𝚎 𝚆𝚒𝚝𝚑 𝙱𝚢 𝙳𝚊𝚗𝚒𝚎𝚕𝚛𝚡𝚣 × 𝚈𝚞𝚕𝚒𝚎𝚝𝚑 𓆪',

  ch3: '120363420575743790@newsletter',
  name3:'───﻿✦ 𝑺𝒆𝒏𝒌𝒐𝑺𝒂𝒏 𝑨𝑰 𝑪𝒉𝒂𝒏𝒏𝒆𝒍 ✦'
}

global.emoji = '🌸'
global.emoji2 = '☀️'
global.emoji3 = '🌱'
global.emoji4 = '🍁'
global.emojis = '🕒'
global.rwait = '⏱️'
global.done = '✅'
global.error = '❌'
global.msm = '⚠️'
global.moneda = 'Coins'
global.textbot = '🌸 SenkoSan Bot - Tu asistente de WhatsApp'
global.channel = 'https://whatsapp.com/channel/0029VbBWlS73mFY7ovlF2a24'
global.fkontak = { key: { participants:"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${global.owner[0]}:${global.owner[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

const file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright(`Update "${file}"`))
  import(`${file}?update=${Date.now()}`)
})
