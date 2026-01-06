<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Senko AI - Bot de WhatsApp</title>
    <style>
        /* Estilos Generales */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #1a1a2e; /* Fondo oscuro */
            color: #ffffff; /* Texto claro */
            margin: 0;
            padding: 20px;
            line-height: 1.6;
        }
        .container {
            max-width: 900px;
            margin: auto;
            background-color: #162447; /* Contenedor ligeramente más claro */
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        /* Encabezado */
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            font-size: 2.5em;
            color: #e43f5a; /* Color de acento 1 */
            letter-spacing: 2px;
            margin-bottom: 10px;
        }
        .header img {
            width: 100%;
            max-width: 600px;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.7);
            transition: transform 0.3s ease-in-out;
        }
        .header img:hover {
            transform: scale(1.02); /* Pequeña animación al pasar el ratón */
        }

        /* Secciones */
        .section-title {
            font-size: 1.8em;
            color: #53a8b6; /* Color de acento 2 */
            border-bottom: 2px solid #e43f5a;
            padding-bottom: 5px;
            margin-top: 40px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
        }
        .section-title span {
            margin-right: 10px;
            font-size: 1.2em;
        }
        
        /* Detalles (Acordeones) */
        details {
            background-color: #2a3d66; /* Fondo para el acordeón */
            border-radius: 8px;
            margin-bottom: 15px;
            transition: background-color 0.3s ease;
        }
        details:hover {
            background-color: #3b507f;
        }
        summary {
            font-weight: bold;
            padding: 15px;
            cursor: pointer;
            outline: none;
            color: #f7e8a1; /* Color para el título del acordeón */
            list-style: none; /* Oculta el marcador por defecto */
            display: flex;
            align-items: center;
        }
        summary::before {
            content: '▶'; /* Flecha cerrada */
            margin-right: 10px;
            transition: transform 0.2s;
        }
        details[open] summary::before {
            content: '▼'; /* Flecha abierta */
            transform: rotate(0deg);
        }
        .details-content {
            padding: 5px 20px 20px 20px;
            border-top: 1px solid #162447;
        }

        /* Listas de Comandos */
        .command-list {
            background-color: #131b2f;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
        }
        .command-list pre {
            margin: 0;
            font-family: 'Consolas', 'Courier New', monospace;
            font-size: 0.9em;
            color: #8cffb3; /* Color de código */
        }
        
        /* Enlaces */
        .links a {
            display: inline-block;
            background-color: #e43f5a;
            color: white;
            padding: 10px 20px;
            margin: 5px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            transition: background-color 0.3s ease, transform 0.2s;
        }
        .links a:hover {
            background-color: #c0314a;
            transform: translateY(-2px);
        }
        .contact-links a {
            background-color: #53a8b6;
        }
        .contact-links a:hover {
            background-color: #418b95;
        }

        /* Botón de Descarga */
        .download-btn {
            display: block;
            text-align: center;
            margin: 30px 0;
            padding: 0;
        }
        .download-btn img {
            height: 125px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .download-btn img:hover {
            transform: scale(1.1);
            opacity: 0.9;
        }
        
        /* Animación para el título */
        @keyframes pulse {
            0% { text-shadow: 0 0 5px rgba(228, 63, 90, 0.5); }
            50% { text-shadow: 0 0 15px rgba(228, 63, 90, 1); }
            100% { text-shadow: 0 0 5px rgba(228, 63, 90, 0.5); }
        }
        .header h1 {
            animation: pulse 3s infinite;
        }
    </style>
</head>
<body>

<div class="container">
    
    <div class="header">
        <h1>✦ Senko AI ✦</h1>
        <p>
            <img src="https://files.catbox.moe/tl3ey1.jpg" alt="Imagen de Senko AI Bot">
        </p>
    </div>
    
    <h2 class="section-title"><span>❕️</span> Información Importante</h2>
    
    <details>
        <summary><b> ➮ Info • Bot</b></summary>
        <div class="details-content">
            <p><strong>Senko AI</strong> es un bot de WhatsApp multifuncional basado en <strong>Baileys</strong>, enfocado en **velocidad**, **estabilidad** y **herramientas útiles** para usuarios y administradores.</p>
        </div>
    </details>

    <details>
        <summary><b> ➮ Funciones Destacadas</b></summary>
        <div class="details-content">
            <p>⚠️ **Nota:** Bot en desarrollo. Si presenta alguna falla, por favor reportar al creador para darle una solución óptima.</p>
            <ul>
                <li>[x] Interacción con voz y texto</li>
                <li>[x] Configuración de grupo (antilink, alertas, etc.)</li>
                <li>[x] Sistema de bienvenidas</li>
                <li>[x] Juegos, gacha, etc.</li>
                <li>[x] Crear sticker de imagen, video, gif</li>
                <li>[x] SubBot (Jadibot)</li>
                <li>[x] Buscador avanzado</li>
                <li>[x] Juego RPG</li>
                <li>[x] Descarga de música y video de YT</li>
                <li>[ ] **Otras funciones en desarrollo...**</li>
            </ul>
        </div>
    </details>

    <h2 class="section-title"><span>✧</span> Descarga de Termux</h2>
    
    <p class="download-btn">
        <p align="center">Haga click en la imagen para descargar Termux</p>
        <a href="https://www.mediafire.com/file/llugt4zgj7g3n3u/com.termux_1020.apk/file">
            <img src="https://qu.ax/finc.jpg" alt="Descargar Termux APK">
        </a> 
    </p>

    <h2 class="section-title"><span>➮</span> Instalación por Termux</h2>
    
    <details>
        <summary><b> ✎ Comandos de Instalación Manual </b></summary>
        <div class="details-content">
            <h3>❀ Instalación manual por Termux</h3>
            <p><strong>Nota:</strong> Copie y pegue los comandos en Termux uno por uno.</p>
            
            <div class="command-list">
                <pre>termux-setup-storage</pre>
                <pre>apt update && apt upgrade && pkg install -y git nodejs ffmpeg imagemagick yarn</pre>
                <pre>git clone https://github.com/Dani-land/SenkoBot-V2 && cd SenkoBot-V2</pre>
                <pre>yarn install</pre>
                <pre>npm install</pre>
                <pre>npm update</pre>
                <pre>npm start</pre>
            </div>
            <br>
            <p>👉 Si aparece <code>(Y/I/N/O/D/Z) [default=N] ?</code>, use la letra **"y"** + **"ENTER"** para continuar con la instalación.</p>
            
            <hr style="border-color: #3b507f; margin: 20px 0;">

            <h3>🜸 Activar en caso de detenerse en Termux</h3>
            <p>Si después de instalar el bot en Termux se detiene (pantalla en blanco, pérdida de conexión a Internet, reinicio del dispositivo), sigue estos pasos:</p>
            <ul>
                <li>Abre Termux y navega al directorio del bot:
                    <div class="command-list"><pre>cd SenkoBot-V2</pre></div>
                </li>
                <li>Inicia el bot nuevamente:
                    <div class="command-list"><pre>npm start</pre></div>
                </li>
            </ul>

            <hr style="border-color: #3b507f; margin: 20px 0;">

            <h3>✰ Volverte Owner del Bot</h3>
            <p>Si deseas poner tu número en la lista de *owner* después de iniciar la sesión del bot, usa este comando:</p>
            <div class="command-list">
                <pre>cd SenkoBot-V2 && nano settings.js</pre>
            </div>
            <p>Luego edita el archivo `settings.js` para añadir tu número.</p>
        </div>
    </details>

    <h2 class="section-title"><span>➮</span> Enlaces Útiles</h2>
    
    <details>
        <summary><b> 🜸 Enlaces Oficiales </b></summary>
        <div class="details-content links">
            <a href="https://whatsapp.com/channel/0029VbBUzJ6DzgT8o9NiMq2b" target="_blank">Canal Oficial</a>
            <a href="https://chat.whatsapp.com/LqCVRDFmKPV8VNeSppqsDp?mode=hqrc" target="_blank">Grupo Oficial</a>
            <a href="https://chat.whatsapp.com/Btb9Apfgh4X2n1qy14k9p7" target="_blank">Comunidad Oficial</a>
        </div>
    </details>

    <details>
        <summary><b> ✰ Contáctame</b></summary>
        <div class="details-content links contact-links">
            <a href="https://wa.me/526242255295" target="_blank">WhatsApp</a>
            <a href="mailto:danielrodigome@gmail.com">Gmail - Correo</a>
        </div>
    </details>

</div>

</body>
</html>
