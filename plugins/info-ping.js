import speed from 'performance-now'
import { exec } from 'child_process'

let handler = async (m, { conn }) => {
  let timestamp = speed()
  let sentMsg = await conn.reply(m.chat, '🌱 *Calculando*', m)
  let latency = speed() - timestamp

  exec('neofetch --stdout', (error, stdout, stderr) => {
    let child = stdout.toString('utf-8')
    let ssd = child.replace(/Memory:/, 'Ram:')

    let result = `﹒⌗﹒🌿 .˚₊‧  Hola, @${m.sender.split('@')[0]}.

⚡  .→﹒ Senko AI (⁠◠⁠‿⁠◕⁠).  ◌Ⳋ𝅄

🌱 \`Ping:\` ${latency} ms
⏳ \`Uptime:\` [ ${uptimeFormatted} ]
📦 \`RAM usada:\` ${usedRAM} MB`

    conn.sendMessage(m.chat, { text: result, edit: sentMsg.key }, { quoted: m })
  })
}

handler.help = ['ping']
handler.tags = ['info']
handler.command = ['ping', 'p']

export default handler