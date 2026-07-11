# AI Navigator

> Multi-provider AI assistant directly in your Chrome sidebar. Chat, automate your browser, track costs — all without leaving the page.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Version](https://img.shields.io/badge/version-0.1.0-green)

---

## ✨ Features

| | |
|---|---|
| **💬 Chat** | Stream responses from any AI provider |
| **🤖 Browser Agent** | Automate your browser in natural language |
| **🔐 Granular Permissions** | 5 levels + individual permission toggles |
| **💰 Cost Tracking** | Real-time token & cost monitoring per model |
| **📁 Conversations** | Auto-saved history with quick switching |
| **🔄 Auto Model Discovery** | Fetches latest models from provider APIs |
| **🧩 Sub-agents** | Delegate background tasks |

## 🚀 Supported Providers

OpenAI · Anthropic · Google AI · Mistral · DeepSeek · OpenRouter · Ollama

## 📦 Installation

1. Open `chrome://extensions` in Chrome
2. Enable **Developer mode** (toggle top-right)
3. Click **Load unpacked**
4. Select the `extension` folder
5. Click the puzzle icon → pin **AI Navigator**

## ⚡ Quick Start

1. Click the AI Navigator icon → sidebar opens
2. Open **Settings** (⚙️) → add an API key
3. Select your model in the top bar
4. Start chatting, or switch to **Agent** mode for browser automation

### Agent Examples

```text
"go to google.com"
"open gemini and ask about the weather"
"search for cat pictures"
"click the first result"
"read the page"
```

## 🔐 Permissions

| Level | Allows |
|---|---|
| None | Agent disabled |
| Navigation | Navigate to URLs |
| Read | Navigate + Read page content |
| Modify | Navigate + Read + Click + Type + Download |
| Full Control | Full browser access including JS execution |

Individual permissions can be fine-tuned in Settings.

## 🏗️ Project Structure

```
extension/
├── manifest.json          # Extension manifest (MV3)
├── background.js          # Service worker: providers, agent, costs
├── content.js             # Content script
├── sidepanel/
│   ├── index.html         # UI structure
│   ├── style.css          # Dark theme styles
│   └── app.js             # UI logic & state management
└── icons/                 # Extension icons
```

## 🧪 Development

No build tools required. Edit the files, reload the extension at `chrome://extensions`.

```bash
git clone https://github.com/Doom-pixel-alt/Sidebar-AI-Assistant.git
# Open chrome://extensions → Load unpacked → select extension/
```

## 📄 License

MIT © 2026 Doom-pixel-alt
