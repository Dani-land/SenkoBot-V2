import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = '' //Ejemplo: 573218138672

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
  ['526242255295', 'Danielrxz', true],
  ['5216242255295', 'Danielrxz', true],
  ['584242773183', 'shadow', true]
]

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['526242255295@s.whatsapp.net']
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.17' 
global.vs = '2.2.5'
global.nameqr = '𝑺𝒆𝒏𝒌𝒐𝑺𝒂𝒏 𝑨𝑰'
global.namebot = '☆ 𝑺𝒆𝒏𝒌𝒐 𝑨𝑰'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.team = '☆ Sᴇɴᴋᴏ Aɪ Tᴇᴀᴍ ☆'
global.senkoJadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = '⪛✰ SenkoBot ✰⪜'
global.botname = '❀ 𝑺𝒆𝒏𝒌𝒐𝑺𝒂𝒏 𝑨𝑰'
global.wm = '✿ 𝑺𝒆𝒏𝒌𝒐 𝑨𝑰'
global.author = '⁠㉨ Danielrxz'
global.dev = '© P𝕠𝕨𝕖𝕣𝕖d B𝕪 𝕯𝖆𝖓𝖎𝖊𝖑𝕣𝕩𝕫'
global.textbot = '© P𝕠𝕨𝕖𝕣𝕖d B𝕪 𝕯𝖆𝖓𝖎𝖊𝖑𝕣𝕩𝕫'
global.etiqueta = '✪ 𝕯𝖆𝖓𝖎𝖊𝖑𝕣𝕩𝕫'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.moneda = 'Coins'
global.welcom1 = '❍ Edita Con El Comando setwelcome'
global.welcom2 = '❍ Edita Con El Comando setbye'
global.banner = 'https://files.catbox.moe/u3hxp7.jpg'
global.avatar = 'https://files.catbox.moe/so4qhl.jpg'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.APIs = {
xyro: { url: "https://api.xyro.site", key: null },
yupra: { url: "https://api.yupra.my.id", key: null },
vreden: { url: "https://api.vreden.web.id", key: null },
delirius: { url: "https://api.delirius.store", key: null },
zenzxz: { url: "https://api.zenzxz.my.id", key: null },
siputzx: { url: "https://api.siputzx.my.id", key: null },
adonix: { url: "https://api-adonix.ultraplus.click", key: 'AdonixKey4vqkxt2009' }
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.gp1 = '120363420575743790'
global.comunidad1 = 'https://chat.whatsapp.com/F6tQ0UIjREMIan0FgASBw6'
global.channel = '120363420575743790'
global.channel2 = '120363420575743790'
global.md = 'https://github.com/Dani-land/SenkoBot-V2.git'
global.correo = 'danielrodigome@gmail.com'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.my = {
  ch: '120363420575743790@newsletter',
  name: '✦ 𝑺𝒆𝒏𝒌𝒐𝑺𝒂𝒏 𝑨𝑰 𝑪𝒉𝒂𝒏𝒏𝒆𝒍 ﻿✦',

  ch2: '120363420575743790@newsletter', 
  name2: '𓆩 𝙼𝚊𝚍𝚎 𝚆𝚒𝚝𝚑 𝙱𝚢 𝙳𝚊𝚗𝚒𝚎𝚕𝚛𝚡𝚣 × 𝚈𝚞𝚕𝚒𝚎𝚝𝚑 𓆪',

  ch3: '120363420575743790@newsletter',
  name3:'───﻿✦ 𝑺𝒆𝒏𝒌𝒐𝑺𝒂𝒏 𝑨𝑰 𝑪𝒉𝒂𝒏𝒏𝒆𝒍 ✦'
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363420575743790@newsletter',
}
global.multiplier = 60

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
