import { WAMessageStubType } from '@whiskeysockets/baileys';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  const chat = globalThis.db.data.chats[m.chat];
  const nombre = globalThis.db.data.users[m.messageStubParameters[0]]?.name || {};
  const botId = conn.user.jid;

  const ppUrl = await conn.profilePictureUrl(m.messageStubParameters[0], 'image')
    .catch(() => "https://upload.hackstorex.com/uploads/0906b9adbddf292f785bf321dcaeaa65.jpg");

  const name = nombre || conn.getName(m.messageStubParameters[0]);
  const actionUser = m.key.participant ? await conn.getName(m.key.participant) : null;

  const actionMessages = {
    [WAMessageStubType.GROUP_PARTICIPANT_ADD]: actionUser ? `\n┊🌱 *Añadido por >* @${m.key.participant.split`@`[0]}` : '',
    [WAMessageStubType.GROUP_PARTICIPANT_REMOVE]: actionUser ? `\n┊🍄 *Eliminado por >* @${m.key.participant.split`@`[0]}` : '',
    [WAMessageStubType.GROUP_PARTICIPANT_LEAVE]: ''
  };

  const userss = m.messageStubParameters[0];
  const formatText = (template, memberCount) => {
    return template
      .replace('@user', `@${userss.split`@`[0]}`)
      .replace('@group', groupMetadata.subject)
      .replace('@date', new Date().toLocaleString())
      .replace('@users', `${memberCount}`)
      .replace('@type', actionMessages[m.messageStubType])
      .replace('@desc', groupMetadata.desc?.toString() || '✿ Sin Desc ✿');
  };

  let memberCount = participants.length;
  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) memberCount += 1;
  else if ([WAMessageStubType.GROUP_PARTICIPANT_REMOVE, WAMessageStubType.GROUP_PARTICIPANT_LEAVE].includes(m.messageStubType)) memberCount -= 1;

const welcomeMessage = formatText(chat.sWelcome || `╭﹒₊˚ʚᗢ₊˚⊹♡‧₊˚✦
┊「 ʚ Bienvenido, nya~ ɞ 」
┊｡･ﾟﾟ･ *Nombre:* @user
┊｡･ﾟﾟ･ *Grupo:* @group
┊｡･ﾟﾟ･ *Tipo:* @type
┊⋆ ˚｡ Usa #menu para ver comandos
┊⋆ ˚｡ Ahora somos @users miembros
╰┈❥ ʚ Gracias por unirte ɞ`, memberCount);

  const byeMessage = formatText(chat.sBye || `╭˚₊‧꒰ა ☆ ໒꒱ ‧₊˚╮
┊「 *Hasta pronto (⁠o⁠´⁠･⁠_⁠･⁠)* 」 
┊﹋﹋﹋﹋﹋﹋﹋﹋﹋﹋
┊  *Nombre ›* @user
┊✦･ﾟ:｡ ✧･ﾟ:｡ @type
┊➤ *Ojalá lo atropelle un caballo 🐴*
┊➤ *Ahora somos @users miembros.*
┊︶︶︶︶︶︶︶︶︶︶
╰˚₊‧꒰ა 🐾 ໒꒱ ‧₊˚╯`, memberCount);

  const leaveMessage = formatText(chat.sBye || byeMessage, memberCount);
  const mentions = [userss, m.key.participant];

  const fakeContext = {
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363420575743790@newsletter",
        serverMessageId: '',
        newsletterName: "𓆩 𝙼𝚊𝚍𝚎 𝚆𝚒𝚝𝚑 𝙱𝚢 𝙳𝚊𝚗𝚒𝚎𝚕𝚛𝚡𝚣 × 𝚈𝚞𝚕𝚒𝚎𝚝𝚑 𓆪"
      },
      externalAdReply: {
        title: namebot,
        body: dev,
        mediaUrl: null,
        description: null,
        previewType: "PHOTO",
        thumbnailUrl: icon,
        sourceUrl: redes,
        mediaType: 1,
        renderLargerThumbnail: false
      },
      mentionedJid: mentions
    }
  };

        if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    let caption = welcomeMessage;
    await conn.sendMessage(m.chat, { image: { url: ppUrl }, caption, ...fakeContext });
  }

        if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
    let caption = byeMessage;
    await conn.sendMessage(m.chat, { image: { url: ppUrl }, caption, ...fakeContext });
  }
        if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
    let caption = welcomeMessage;
    await conn.sendMessage(m.chat, { image: { url: ppUrl }, caption, ...fakeContext });
  }
}