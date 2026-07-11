# Sidebar AI Assistant

[![CI](https://github.com/Doom-pixel-alt/Sidebar-AI-Assistant/actions/workflows/ci.yml/badge.svg)](https://github.com/Doom-pixel-alt/Sidebar-AI-Assistant/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Chrome](https://img.shields.io/badge/Chrome-MV3-4285F4?logo=googlechrome)

Multi-provider AI assistant that lives in your Chrome sidebar. Chat with models from 11 providers, automate browser tasks through natural language, and track usage costs — all from one panel.

## Features

- **11 providers** — OpenAI, Anthropic, Google, Mistral, DeepSeek, OpenRouter, Ollama, Groq, Together AI, Perplexity, xAI
- **Streaming chat** — full conversation context sent with each message
- **Browser automation agent** — natural language commands (navigate, click, type, read)
- **Granular permissions** — 5 levels + individual toggles
- **Cost tracking** — real-time token and cost monitoring per model
- **Conversation history** — auto-saved with quick switching
- **Auto model discovery** — fetches latest models from provider APIs on configure
- **Sub-agents** — delegate background tasks

## Installation

```bash
git clone https://github.com/Doom-pixel-alt/Sidebar-AI-Assistant.git
```

1. Open `chrome://extensions`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `extension` folder

## Quick Start

1. Click the AI Navigator icon → sidebar opens
2. Open **Settings** (⚙️) → add any API key
3. Select a model from the top bar
4. Chat or switch to **Agent** mode for browser automation

### Agent Examples

```
"go to google.com"
"open gemini and ask about the weather"
"search for cat pictures"
"click the first result"
"read the page"
```

## Architecture

```
extension/
├── manifest.json         # Manifest V3 — permissions, service worker, side panel
├── background.js         # Service worker — providers, agent logic, cost tracking, model fetching
├── content.js            # Content script (optional page interaction)
├── sidepanel/
│   ├── index.html        # UI shell — header, chat area, input bar, settings panel
│   ├── style.css         # Dark theme, responsive layout, chat bubbles
│   └── app.js            # UI state, event binding, conversation management
└── icons/                # Extension icons (16, 48, 128 px)
```

### Model management

Model lists are not duplicated. `background.js` contains the authoritative `DEFAULT_MODELS` and auto-fetches the latest models from each provider's API when configured. The sidepanel (`app.js`) uses a minimal static fallback (2 models per provider) that displays only until the live data arrives.

### Permissions

Host permissions request `<all_urls>` because the browser agent needs to interact with any page the user navigates to. The agent only acts when explicitly told and within the user-configured permission level.

## Security

- **API keys** are stored in `chrome.storage.local` — Chrome's encrypted local storage, accessible only to this extension. They never leave your browser except when sent directly to the configured provider API. Remove them anytime via Settings → clear the key field and click OK.
- **No telemetry.** No analytics, no tracking, no external network calls except to the AI providers you explicitly configure.
- **Permission levels** limit what the agent can do. Set to "None" to disable all agent actions.

## Permissions Reference

| Level | Actions allowed |
|---|---|
| None | None |
| Navigation | Navigate to URLs |
| Read | Navigate + Read page content |
| Modify | Navigate + Read + Click + Type + Download |
| Full Control | All of the above + arbitrary JS execution |

Each action can also be toggled individually in Settings regardless of the level.

## Development

No build tools required. Edit any file and reload the extension at `chrome://extensions`.

```bash
node --check extension/background.js
node --check extension/sidepanel/app.js
```

## License

MIT © 2026 Doom-pixel-alt
