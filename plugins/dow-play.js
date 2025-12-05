import fetch from "node-fetch"
import yts from 'yt-search'

const handler = async (m, { conn, text, usedPrefix, command }) => {
try {

if (!text.trim()) 
return conn.reply(m.chat, `🌸✨ *Onii-chan~ escribe el nombre de la canción, porfis* 💗`, m)

await m.react('🐾')

const videoMatch = text.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/))([a-zA-Z0-9_-]{11})/)
const query = videoMatch ? 'https://youtu.be/' + videoMatch[1] : text

const search = await yts(query)
const result = videoMatch 
? search.videos.find(v => v.videoId === videoMatch[1]) || search.all[0] 
: search.all[0]

if (!result) throw '💔 *Nyah~ no encontré nada con ese nombre...*'

const { title, thumbnail, timestamp, views, ago, url, author, seconds } = result

if (seconds > 1800) 
throw '😿 *Ese video es muuuy largo (máx 10 min, nyah~)*'

const vistas = formatViews(views)

const info = `
🌸 *Kawaii Player — Info del vídeo* 🌸

💗 *Título:* ${title}
🎀 *Canal:* ${author.name}
👀 *Vistas:* ${vistas}
⏱️ *Duración:* ${timestamp}
📅 *Publicado:* ${ago}
🔗 *Link:* ${url}

*UwU dame un momentito mientras lo preparo~ 💞*
`.trim()

const thumb = (await conn.getFile(thumbnail)).data

await conn.sendMessage(m.chat, { image: thumb, caption: info }, { quoted: m })

// AUDIO
if (['play', 'yta', 'ytmp3', 'playaudio'].includes(command)) {
const audio = await getAud(url)
if (!audio?.url) throw '😿 *No pude obtener el audio UwU*'

m.reply(`🍓 *Audio listo!* 🎧\n✨ Proxy usado: ${audio.api}`)

await conn.sendMessage(
m.chat,
{ audio: { url: audio.url }, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' },
{ quoted: m }
)

await m.react('🎶')
}

// VIDEO
else if (['play2', 'ytv', 'ytmp4', 'mp4'].includes(command)) {

const video = await getVid(url)
if (!video?.url) throw '😿 *No pude convertir el video nyah~*'

m.reply(`🎀 *Video cargado correctamente* 🍥\n🌟 Proxy usado: ${video.api}`)

await conn.sendFile(m.chat, video.url, `${title}.mp4`, `✨ ${title}`, m)

await m.react('📽️')
}

} catch (e) {
await m.react('💢')
return conn.reply(
m.chat, 
typeof e === 'string' ? e : `⚠️ Ocurrió un error inesperado:\n${e.message}`, 
m
)
}
}

handler.command = handler.help = [
'play', 'yta', 'ytmp3',
'play2', 'ytv', 'ytmp4',
'playaudio', 'mp4'
]
handler.tags = ['dow']
handler.group = true
export default handler



// ------- API SYSTEM -------- //

async function getAud(url) {
const apis = [
{ api: 'Adonix', endpoint: `${global.APIs.adonix.url}/download/ytaudio?apikey=${global.APIs.adonix.key}&url=${encodeURIComponent(url)}`, extractor: res => res.data?.url },
{ api: 'ZenzzXD', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp3?url=${encodeURIComponent(url)}`, extractor: res => res.data?.download_url },
{ api: 'ZenzzXD v2', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp3v2?url=${encodeURIComponent(url)}`, extractor: res => res.data?.download_url },
{ api: 'Yupra', endpoint: `${global.APIs.yupra.url}/api/downloader/ytmp3?url=${encodeURIComponent(url)}`, extractor: res => res.result?.link },
{ api: 'Vreden', endpoint: `${global.APIs.vreden.url}/api/v1/download/youtube/audio?url=${encodeURIComponent(url)}&quality=128`, extractor: res => res.result?.download?.url },
{ api: 'Vreden v2', endpoint: `${global.APIs.vreden.url}/api/v1/download/play/audio?query=${encodeURIComponent(url)}`, extractor: res => res.result?.download?.url },
{ api: 'Xyro', endpoint: `${global.APIs.xyro.url}/download/youtubemp3?url=${encodeURIComponent(url)}`, extractor: res => res.result?.download },
]
return await fetchFromApis(apis)
}

async function getVid(url) {
const apis = [
{ api: 'Adonix', endpoint: `${global.APIs.adonix.url}/download/ytvideo?apikey=${global.APIs.adonix.key}&url=${encodeURIComponent(url)}`, extractor: res => res.data?.url },
{ api: 'ZenzzXD', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp4?url=${encodeURIComponent(url)}&resolution=360p`, extractor: res => res.data?.download_url },
{ api: 'ZenzzXD v2', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp4v2?url=${encodeURIComponent(url)}&resolution=360`, extractor: res => res.data?.download_url },
{ api: 'Yupra', endpoint: `${global.APIs.yupra.url}/api/downloader/ytmp4?url=${encodeURIComponent(url)}`, extractor: res => res.result?.formats?.[0]?.url },
{ api: 'Vreden', endpoint: `${global.APIs.vreden.url}/api/v1/download/youtube/video?url=${encodeURIComponent(url)}&quality=360`, extractor: res => res.result?.download?.url },
{ api: 'Vreden v2', endpoint: `${global.APIs.vreden.url}/api/v1/download/play/video?query=${encodeURIComponent(url)}`, extractor: res => res.result?.download?.url },
{ api: 'Xyro', endpoint: `${global.APIs.xyro.url}/download/youtubemp4?url=${encodeURIComponent(url)}&quality=360`, extractor: res => res.result?.download }
]
return await fetchFromApis(apis)
}

async function fetchFromApis(apis) {
for (const { api, endpoint, extractor } of apis) {
try {
const controller = new AbortController()
const timeout = setTimeout(() => controller.abort(), 10000)

const res = await fetch(endpoint, { signal: controller.signal }).then(r => r.json())
clearTimeout(timeout)

const link = extractor(res)
if (link) return { url: link, api }

} catch (e) {}

await new Promise(resolve => setTimeout(resolve, 500))
}
return null
}

function formatViews(views) {
if (views === undefined) return "No disponible"
if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`
if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`
if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`
return views.toString()
}