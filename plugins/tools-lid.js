let handler = async function (m, { conn, participants, groupMetadata, args }) {
    try {
        const participantList = groupMetadata.participants || []
        let userId

        if (m.mentionedJid?.length) {
            userId = m.mentionedJid[0]
        } else if (args[0]) {
            let number = args[0].replace(/[^0-9]/g, '')
            if (!number.endsWith('@s.whatsapp.net')) {
                number = number + '@s.whatsapp.net'
            }
            userId = number
        } else {
            userId = m.sender
        }

        const participant = participantList.find(p => p.id === userId)

        await m.react('🕒')

        if (participant && participant.lid) {
            await conn.sendMessage(m.chat, {
                text: `❀ El LID de @${userId.split('@')[0]} es:\n\n☆ ${participant.lid}`,
                mentions: [userId]
            }, { quoted: m })
            await m.react('✔️')
        } else {
            await conn.sendMessage(m.chat, {
                text: `✦ No se pudo encontrar el LID de @${userId.split('@')[0]}.`,
                mentions: [userId]
            }, { quoted: m })
            await m.react('✖️')
        }

    } catch (error) {
        console.error(error)
        await conn.sendMessage(m.chat, {
            text: '♥︎ Ocurrió un error al procesar tu solicitud.',
        }, { quoted: m })
        await m.react('✖️')
    }
}

handler.command = ['lid', 'mylid']
handler.help = ['lid [@usuario|número]', 'mylid']
handler.tags = ['tools']
handler.group = true
handler.rowner = true

export default handler