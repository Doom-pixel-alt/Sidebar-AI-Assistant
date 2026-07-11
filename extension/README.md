# AI Navigator — Chrome Sidebar Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Multi-provider AI assistant in your Chrome sidebar. Chat, automate browser tasks, track costs, and manage sub-agents — all from one panel.

## Features

- **Multi-provider** — OpenAI, Anthropic, Google, Mistral, DeepSeek, OpenRouter, Ollama
- **Chat** — Streaming responses with any configured model
- **Automated Agent** — Tell it what to do in natural language ("go to youtube and search for cats")
- **Permissions** — 5 levels (None → Full Control) + individual permission toggles
- **Cost Tracking** — Real-time token and cost monitoring per model
- **Conversation History** — Automatic saves, switch between conversations
- **Sub-agents** — Delegate background tasks
- **Auto model discovery** — Fetches latest models from provider APIs

## Installation

1. Open `chrome://extensions` in Chrome
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `extension` folder

## Quick Start

1. Click the AI Navigator icon → sidebar opens
2. Go to **Settings** (⚙️) and add an API key
3. Select a model in the top bar
4. Start chatting or use Agent mode for browser automation

## Agent Examples

```
"go to google.com"
"open gemini and ask about the weather"  
"search for cat pictures"
"click the first result"
"read the page"
```

## Project Structure

```
extension/
├── manifest.json        # Chrome extension manifest
├── background.js        # Service worker (providers, costs, agent)
├── content.js           # Content script
├── sidepanel/
│   ├── index.html       # Main UI
│   ├── style.css        # Dark theme styles
│   └── app.js           # UI logic, state management
└── icons/               # Extension icons
```

## Permissions

| Level | Capabilities |
|-------|-------------|
| None | Agent disabled |
| Navigation | Navigate to URLs |
| Read | + Read page content |
| Modify | + Click, type, download |
| Full Control | Full browser access |

## License

MIT
