let handler = async (m, { conn, command, usedPrefix }) => {
let img = './src/catalogo.jpg'
let staff = `『✦』 *EQUIPO DE STAFF* ✿
✰ *Dueño* ${creador}
✦ *Bot:* ${botname}
⚘ *Versión:* ${vs}
❖ *Libreria:* ${libreria} ${baileys}

❍ *Creador:*

✐ Danielrxz
> 🜸 Rol » *Creador*
> ✧ GitHub » https://github.com/Dani-land

❒ *Colaboradores:*

ᰔᩚ Yosue
> 🜸 Rol » *Developer*
> ✧ GitHub » https://github.com/yosue891

ᰔᩚ Fede
> 🜸 Rol » *Developer*
> ✧ GitHub » https://github.com/the-xyzz

❀ Administración 

✧ Albert
> 🜸 Rol » *Staff*

✧ Alexis
> 🜸 Rol » *Staff*`
await conn.sendFile(m.chat, img, 'nino.jpg', staff.trim(), m)
}
  
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler
