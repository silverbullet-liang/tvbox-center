# TVBox Media Center

A **pure front-end, single-file, build-free** media aggregator player, built on Material Design 3.

Open one HTML file in a browser to search, play and cast — no backend, no install, no bundling.

Two editions are provided:

- **Pro (`index.html`)** — full-featured. Ships two data sources, casting, long-press speed, intro/outro skip, resume position and more.
- **Mini (`mini.html`)** — lightweight. A single data source, a leaner UI, suitable for low-end devices and quick deploys.

License: `AGPL-3.0-or-later`

> [中文说明](README.md)

---

## Disclaimer

> This project is **for technical learning and exchange only**. It does not host, store or provide any media content.
>
> - All media data comes from **third-party public collection APIs** (standard Apple CMS / MacCMS JSON endpoints), maintained by their respective providers, not by the author of this project.
> - This is a pure browser-side UI: search and playback URLs connect **directly to the data sources**. The author neither can nor ever does control their content.
> - Do not use this project commercially, or for copyright infringement or spreading illegal information.
> - The bundled endpoint is a **technical demo**; users must judge and bear the consequences of use on their own.
> - Rights holders should contact the **data source provider** directly. This project assumes no liability.
>
> **Please support official releases and watch content through legitimate channels.**

---

## Features

| Capability | Mini | Pro |
| --- | :--: | :--: |
| Bundled sources | 1 | 6 |
| Parallel multi-source search | Yes | Yes |
| Search suggestions | — | Yes |
| HLS playback (hls.js) | Yes | Yes |
| Quality switch | Yes | Yes |
| Aspect ratio | Yes | Yes |
| Playback speed (0.25x–5x) | Yes | Yes |
| Episode / line switch | Yes | Yes |
| Fullscreen / mini window | Yes | Yes |
| Gestures (seek / volume) | Yes | Yes |
| Keyboard shortcuts | Yes | Yes |
| Resume position | — | Yes |
| Long-press 2x speed | — | Yes |
| Skip intro / outro | — | Yes |
| Play mode (seq / loop / random) | — | Yes |
| Casting (Chromecast / AirPlay) | — | Yes |
| History limit setting | — | Yes |
| Watch Together (MQTT chat / online users / unread badge) | — | Yes |
| Watch Together shares (`TVC1:` / clipboard & search) | — | Yes |
| Encrypted backup (`.tvcbak` export / import) | — | Yes |
| Themes (4 colors + dark/light) | Yes | Yes |
| MiSans font | — | Yes |

---

## Quick start

### 1. Open directly

Download `index.html` and open it with a browser.

> Some endpoints disallow `file://` cross-origin requests. If search returns nothing, use a local server or deploy over HTTPS.

### 2. Local server (recommended)

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html`.

### 3. GitHub Pages

Fork this repo → `Settings` → `Pages` → Source: `Deploy from a branch` → branch `main`, folder `/ (root)` → Save. Visit `https://<your-name>.github.io/tvbox-center/`.

### 4. Any static host

`index.html` / `mini.html` are self-contained. Drop them onto Nginx, object storage or any CDN.

---

## Usage

1. **Search** — open "Search" in the bottom nav, type a title, and multiple sources return in parallel.
2. **Play** — pick a line and an episode on the detail page to enter the player.
3. **Favorites / History** — tap the heart on a card to favorite; played items land in "History" on the home page.
4. **Settings** — themes, source toggles; (Pro) history limit, default player settings and behaviors.

### Keyboard shortcuts

| Key | Action |
| --- | --- |
| `Space` / `K` | Play / pause |
| `←` / `→` | Seek back / forward 10s |
| `J` / `L` | Seek back / forward 60s |
| `↑` / `↓` | Volume + / − |
| `M` | Mute toggle |
| `F` | Fullscreen toggle |
| `Esc` | Close player / exit fullscreen |
| `P` / `N` | Previous / next episode |
| `0` – `9` | Jump to 0% – 90% |
| `>` / `<` | Speed up / down 0.25x |
| `E` | Toggle episode panel |

---

## Watch Together

The **Watch Together** button in the player controls opens a chat sidebar and switches to cinema mode:

- **Desktop / landscape**: the player takes about 70% of the viewport, with a fixed 320px sidebar on the right.
- **Portrait / mobile**: the app first requests real landscape. If orientation lock is unavailable, the sidebar shares the player's rotated coordinate system: the video yields 320px, the sidebar sits on the visual right, and its header (with the close button) is ordered to the visual top.
- **Closing the sidebar** restores the full-width player. The MQTT connection and subscription stay alive unless background monitoring is disabled in Settings.

Rooms are isolated per title using `sourceKey::vodId` — different sources for the same title do not merge, while episodes and lines share one room.

- Broker: `wss://broker.emqx.io:8084/mqtt` by default. Edit `MQTT_CONFIG` to use your own broker.
- Topics: `tvbox-center/v1/chat/{roomHash}`.
- Status dot: green connected, yellow connecting, red failed; reconnection is automatic.
- Presence: 15s heartbeat; the online list de-duplicates by user ID (multiple tabs count once).
- Read receipts: ACK is sent only after another client opens the sidebar and renders the message; reconnect triggers an incremental sync (up to 200 messages).
- Limits: 500 characters per message, 1.2s send interval, 200 messages retained per title. Messages on a public broker are visible to anyone who knows the topic — **do not send sensitive information**.

### Share links

The **Share** button builds a `TVC1:` string (JSON → deflate-raw → base64url) and copies it to the clipboard. The app recognizes it from the clipboard on load/focus, when pasted into the search box (press Enter), from a global paste, or via Settings → "Open from clipboard". Joining switches to the matching source, loads the title, selects the line/episode, seeks to the shared position, enters fullscreen and opens the sidebar.

## Encrypted backup

Settings → **Data backup**:

- **Export all data**: enter a key twice; produces `tvbox-backup-YYYYMMDD-HHmm.tvcbak`.
- **Import backup**: pick a `.tvcbak` file and enter the export key.

The backup covers favorites, settings, history, playback positions, profile (avatar / nickname), Watch Together switches, chat records and the full-library IndexedDB index.

```text
magic(8) "TVCBAK1\0" | version(1) | flags(1) | salt(16) | iv(12) | AES-GCM ciphertext
```

Pipeline: JSON → UTF-8 → **GZIP** → XOR → RC4 → **AES-GCM-256**. PBKDF2-SHA256 (200,000 iterations) derives 64 bytes for the AES / RC4 / XOR keys; AES-GCM additional data binds the header to prevent tampering.

> The key is never stored, uploaded or logged. Losing it makes the backup unrecoverable. Backup files contain chat records and profile data — keep them safe. Export/import requires `CompressionStream` (GZIP) and WebCrypto over **HTTPS or localhost**.

## Component library

`dist/tvbox-center.js` is a self-contained component library with all Pro features. It bundles **hls.js 1.7.3** and **mqtt.js 5.15.1** into the same file and exposes them as `TVBoxCenter.hls` / `TVBoxCenter.mqtt`.

```html
<script src="https://cdn.jsdelivr.net/gh/silverbullet-liang/tvbox-center@v1.8.7/dist/tvbox-center.min.js"></script>
<div id="tvbox-app" style="height:100vh"></div>
<script>
  TVBox.mount('#tvbox-app', { theme: 'purple' });
</script>
```

In a Web Worker, `importScripts` the same file — only the vendor bundle is installed when `document` is absent:

```js
const worker = new Worker(URL.createObjectURL(new Blob([`
  importScripts('https://cdn.jsdelivr.net/gh/silverbullet-liang/tvbox-center@v1.8.7/dist/tvbox-center.js');
  const client = TVBoxCenter.mqtt.connect('wss://broker.emqx.io:8084/mqtt');
`], { type: 'application/javascript' })));
```

## Data sources

Sources are public Apple CMS (MacCMS v10) JSON endpoints using these parameters:

| Param | Purpose |
| --- | --- |
| `ac=list` | List / search |
| `ac=detail` | Detail |
| `ac=suggest` | Suggestions |

Endpoint URLs live in the `DEFAULT_SOURCES` array at the top of each file and can be swapped for any compatible endpoint:

```js
const DEFAULT_SOURCES = [
  { key:"lzi", name:"LZI", api:"https://example.com/api.php/provide/vod/", type:1, enabled:true, noProxy:true }
];
```

> No third-party endpoint's availability, legality or stability is guaranteed; endpoints may change or break at any time.

---

## Project layout

```
tvbox-center/
├── index.html          Pro edition (default entry)
├── promo.html          Single-file landing page
├── dist/               CDN assets (component library with mqtt/hls, API SDK)
├── mini.html           Mini edition
├── favicon.png         Site icon
├── LICENSE             Full AGPL-3.0 text
├── README.md           Chinese docs
├── README.en.md        English docs
├── CHANGELOG.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── .editorconfig
├── .gitignore
└── .github/            Issue / PR templates
```

---

## Browser support

| Browser | Support |
| --- | --- |
| Chrome / Edge (desktop & Android) | Full |
| Safari (macOS / iOS) | Full, casting via AirPlay |
| Firefox | Full, no Chromecast casting |

HLS playback uses `hls.js`; Safari's native HLS is used as fallback.

Watch Together requires WebSocket and Web Worker. Encrypted backup requires `CompressionStream` (GZIP) and WebCrypto (Safari 16.4+), and must run over **HTTPS or localhost**.

---

## FAQ

**Watch Together keeps showing "connecting" / "failed"?**
The public broker may be blocked by your network or rate-limited. Point `MQTT_CONFIG` at your own broker. Chat being unavailable never blocks playback.

**No landscape mode when opening Watch Together?**
Since v1.8.6, opening it in portrait requests real landscape first; if unavailable, the sidebar shares the rotated coordinate system, the video yields 320px, and the sidebar sits on the visual right. Make sure you are using the latest `index.html`.

**Import says "wrong key or corrupted backup"?**
Make sure the key matches the export key exactly; unsupported versions, corrupted files and missing GZIP compression share the same message. Export a fresh backup with the current version and retry.

**No search results?**
Usually an endpoint outage or a CORS limit. Use a local server / HTTPS, or switch sources in settings.

**Black screen / endless buffering?**
The m3u8 source is often dead or the network is restricted — try another line or episode.

**Where is data stored?**
Entirely in browser `localStorage`, never uploaded. Clearing browser data also clears favorites and history.

**How to add a source?**
Edit the `DEFAULT_SOURCES` array (see above) and add a compatible endpoint.

---

## Development

This project stays deliberately **single-file and build-free**: no bundler, no module split — edit and refresh.

- Design: Material Design 3 tokens
- Icons: Iconify (lucide set)
- Playback: hls.js 1.7.3
- Realtime chat: mqtt.js 5.15.1
- Encoding: UTF-8, inline CSS / JS

Read [CONTRIBUTING.md](CONTRIBUTING.md) before contributing.

---

## Credits

- [hls.js](https://github.com/video-dev/hls.js)
- [Iconify](https://iconify.design/) / [Lucide](https://lucide.dev/)
- MiSans (Pro font)
- Material Design 3

---

## License

Released under the **GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later)**. See [LICENSE](LICENSE).

```
Copyright (C) 2026 silverbullet-liang
```

AGPL requires that anyone who runs a modified version of this program over a network must also release the complete source under AGPL.
