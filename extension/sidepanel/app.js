const S = {
  providers: {},
  activeProvider: 'openai',
  activeModel: 'gpt-5.6-luna',
  permissionLevel: 'none',
  permissions: [],
  costs: { records: [], total: 0 },
  subAgents: [],
  modelRegistry: {},
  conversations: [],
  currentConversationId: null,
  chat: [],
  agent: [],
  streaming: false,
  mode: 'chat',
}

const PROVIDERS = [
  { id: 'openai', label: 'OpenAI', ph: 'sk-...' },
  { id: 'anthropic', label: 'Anthropic', ph: 'sk-ant-...' },
  { id: 'google', label: 'Google AI', ph: 'AIza...' },
  { id: 'mistral', label: 'Mistral AI', ph: 'MISTRAL_...' },
  { id: 'deepseek', label: 'DeepSeek', ph: 'sk-...' },
  { id: 'openrouter', label: 'OpenRouter', ph: 'sk-or-...' },
  { id: 'ollama', label: 'Ollama', ph: 'http://localhost:11434' },
]

const MODELS = {
  openai: [
    { id: 'gpt-5.6-sol-pro', label: 'GPT-5.6 Sol Pro' },
    { id: 'gpt-5.6-sol', label: 'GPT-5.6 Sol' },
    { id: 'gpt-5.6-terra-pro', label: 'GPT-5.6 Terra Pro' },
    { id: 'gpt-5.6-terra', label: 'GPT-5.6 Terra' },
    { id: 'gpt-5.6-luna-pro', label: 'GPT-5.6 Luna Pro' },
    { id: 'gpt-5.6-luna', label: 'GPT-5.6 Luna' },
    { id: 'o4-mini-high', label: 'o4 Mini High' },
    { id: 'o4-mini', label: 'o4 Mini' },
    { id: 'o3-pro', label: 'o3 Pro' },
    { id: 'o3', label: 'o3' },
    { id: 'o3-mini-high', label: 'o3 Mini High' },
    { id: 'o3-mini', label: 'o3 Mini' },
    { id: 'gpt-5.5-pro', label: 'GPT-5.5 Pro' },
    { id: 'gpt-5.5', label: 'GPT-5.5' },
    { id: 'gpt-5.4-mini', label: 'GPT-5.4 Mini' },
    { id: 'gpt-5.4-nano', label: 'GPT-5.4 Nano' },
  ],
  anthropic: [
    { id: 'claude-sonnet-5', label: 'Claude Sonnet 5' },
    { id: 'claude-fable-5', label: 'Claude Fable 5' },
    { id: 'claude-opus-4.8-fast', label: 'Claude Opus 4.8 Fast' },
    { id: 'claude-opus-4.8', label: 'Claude Opus 4.8' },
    { id: 'claude-haiku-4.5', label: 'Claude Haiku 4.5' },
    { id: 'claude-sonnet-4.6', label: 'Claude Sonnet 4.6' },
    { id: 'claude-sonnet-4', label: 'Claude Sonnet 4' },
    { id: 'claude-opus-4', label: 'Claude Opus 4' },
  ],
  google: [
    { id: 'gemini-3.5-flash-001', label: 'Gemini 3.5 Flash' },
    { id: 'gemini-3.1-flash-lite-001', label: 'Gemini 3.1 Flash Lite' },
    { id: 'gemini-3.1-pro-preview', label: 'Gemini 3.1 Pro Preview' },
    { id: 'gemini-2.5-pro-001', label: 'Gemini 2.5 Pro' },
    { id: 'gemini-2.5-flash-001', label: 'Gemini 2.5 Flash' },
    { id: 'gemini-2.5-flash-lite-001', label: 'Gemini 2.5 Flash Lite' },
  ],
  mistral: [
    { id: 'mistral-medium-3-5-2604', label: 'Mistral Medium 3.5' },
    { id: 'mistral-small-2603', label: 'Mistral Small 4' },
    { id: 'mistral-large-2512', label: 'Mistral Large 3' },
    { id: 'ministral-3-14b-2512', label: 'Ministral 3 14B' },
    { id: 'ministral-3-8b-2512', label: 'Ministral 3 8B' },
    { id: 'codestral-2508', label: 'Codestral' },
    { id: 'pixtral-large-2411', label: 'Pixtral Large' },
  ],
  deepseek: [
    { id: 'deepseek-v4-pro', label: 'DeepSeek V4 Pro' },
    { id: 'deepseek-v4-flash', label: 'DeepSeek V4 Flash' },
    { id: 'deepseek-v3.2', label: 'DeepSeek V3.2' },
    { id: 'deepseek-chat', label: 'DeepSeek Chat' },
    { id: 'deepseek-reasoner', label: 'DeepSeek Reasoner' },
  ],
  openrouter: [
    { id: 'openai/gpt-5.6-sol', label: 'GPT-5.6 Sol' },
    { id: 'openai/gpt-5.6-luna', label: 'GPT-5.6 Luna' },
    { id: 'openai/o4-mini', label: 'o4 Mini' },
    { id: 'openai/o3-mini-high', label: 'o3 Mini High' },
    { id: 'anthropic/claude-sonnet-5', label: 'Claude Sonnet 5' },
    { id: 'anthropic/claude-fable-5', label: 'Claude Fable 5' },
    { id: 'anthropic/claude-opus-4.8', label: 'Claude Opus 4.8' },
    { id: 'anthropic/claude-haiku-4.5', label: 'Claude Haiku 4.5' },
    { id: 'google/gemini-3.5-flash', label: 'Gemini 3.5 Flash' },
    { id: 'google/gemini-3.1-pro-preview', label: 'Gemini 3.1 Pro Preview' },
    { id: 'deepseek/deepseek-v4-flash', label: 'DeepSeek V4 Flash' },
    { id: 'mistralai/mistral-medium-3-5', label: 'Mistral Medium 3.5' },
    { id: 'mistralai/mistral-small-2603', label: 'Mistral Small 4' },
  ],
  ollama: [
    { id: 'llama3.3:70b', label: 'Llama 3.3 70B' },
    { id: 'llama3.2:3b', label: 'Llama 3.2 3B' },
    { id: 'llama3.2:1b', label: 'Llama 3.2 1B' },
    { id: 'qwen2.5:7b', label: 'Qwen 2.5 7B' },
    { id: 'gemma2:9b', label: 'Gemma 2 9B' },
    { id: 'mistral:7b', label: 'Mistral 7B' },
    { id: 'phi3:14b', label: 'Phi-3 14B' },
    { id: 'nous-hermes2:10b', label: 'Nous Hermes 2 10B' },
  ],
}

const LEVELS = [
  { id: 'none', label: 'None', desc: 'Agent disabled', color: '#dc2626' },
  { id: 'navigation', label: 'Navigation', desc: 'Navigate, click, type', color: '#f59e0b' },
  { id: 'read', label: 'Read', desc: '+ Read page content', color: '#eab308' },
  { id: 'modify', label: 'Modify', desc: '+ Download, manage tabs', color: '#10b981' },
  { id: 'full', label: 'Full Control', desc: 'Full browser access', color: '#3b82f6' },
]

const PERMISSION_ACTIONS = [
  { id: 'navigate', label: 'Navigate', desc: 'Go to URLs' },
  { id: 'click', label: 'Click', desc: 'Click on elements' },
  { id: 'type', label: 'Type', desc: 'Type text in fields' },
  { id: 'read_content', label: 'Read', desc: 'Read page content' },
  { id: 'download', label: 'Download', desc: 'Download files' },
  { id: 'execute_js', label: 'Execute JS', desc: 'Run custom JavaScript' },
]

const LEVEL_PERMISSION_MAP = {
  none: [],
  navigation: ['navigate'],
  read: ['navigate', 'read_content'],
  modify: ['navigate', 'click', 'type', 'read_content', 'download'],
  full: ['navigate', 'click', 'type', 'read_content', 'download', 'execute_js'],
}

const GREETINGS = [
  'Hello! How can I help you today?',
  'Hi! What can I do for you?',
  'Ready to explore the web together?',
  'Hello! What do you need?',
]

const $ = id => document.getElementById(id)
const byTag = sel => document.querySelectorAll(sel)

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
  await refresh()
  if (S.currentConversationId) {
    const conv = S.conversations.find(c => c.id === S.currentConversationId)
    if (conv) { S.chat = conv.chat || []; S.agent = conv.agent || [] }
  }
  if (S.conversations.length === 0) newChat()
  renderChat()
  renderAgent()
  renderConversations()
  bindEvents()
  populateModelSelect()
  updateCostsDisplay()
  updatePermDisplay()
  setInterval(refresh, 3000)
})

async function refresh() {
  try {
    const r = await bg({ type: 'get-state' })
    if (r) {
      const oldModels = JSON.stringify(S.modelRegistry)
      Object.assign(S, r)
      if (JSON.stringify(S.modelRegistry) !== oldModels) populateModelSelect()
    }
    updateCostsDisplay()
    updatePermDisplay()
  } catch {}
}

async function bg(msg) {
  try {
    return await chrome.runtime.sendMessage(msg)
  } catch {
    return null
  }
}

// ===== EVENT BINDING =====
function bindEvents() {
  byTag('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => switchMode(btn.dataset.mode))
  })

  $('settings-btn').addEventListener('click', openSettings)
  $('close-panel-btn').addEventListener('click', closeSettings)
  $('new-chat-btn').addEventListener('click', newChat)
  $('conv-toggle').addEventListener('click', toggleConvList)

  $('msg-btn').addEventListener('click', sendMessage)
  $('stop-btn').addEventListener('click', stopStreaming)
  $('msg-inp').addEventListener('keydown', e => {
    if (e.key === 'Enter') sendMessage()
  })

  $('model-select').addEventListener('change', changeModel)
  $('overlay').addEventListener('click', closeSettings)
  document.addEventListener('click', e => {
    const list = $('conv-list')
    const toggle = $('conv-toggle')
    if (list?.classList.contains('open') && !e.target.closest('.conv-bar') && !e.target.closest('.conv-list')) {
      list.classList.remove('open')
      toggle?.classList.remove('open')
    }
  })

  chrome.runtime.onMessage.addListener(msg => {
    if (msg.type === 'chat-chunk') onChunk(msg.content)
    if (msg.type === 'chat-done') onDone(msg.content)
  })
}

function switchMode(mode) {
  S.mode = mode
  byTag('.toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === mode))
  byTag('.view').forEach(v => {
    v.classList.toggle('active', v.id === `view-${mode}`)
  })
  $('msg-inp').placeholder = mode === 'chat'
    ? 'Type your message...'
    : 'Enter a command...'
  $('msg-inp').focus()
}

function newChat() {
  const conv = createConversation()
  S.chat = conv.chat
  S.agent = conv.agent
  S.currentConversationId = conv.id
  if (!S.conversations.find(c => c.id === conv.id)) S.conversations.unshift(conv)
  S.costs = { records: [], total: 0 }
  renderChat()
  renderAgent()
  updateCostsDisplay()
  renderConversations()
  switchMode('chat')
  saveConversation(conv)
}

function createConversation() {
  return {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    title: 'New conversation',
    chat: [],
    agent: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
}

function saveConversation(conv) {
  if (!conv) return
  conv.chat = S.chat
  conv.agent = S.agent
  conv.updatedAt = Date.now()
  const firstMsg = conv.chat.concat(conv.agent).find(m => m.role === 'user')
  if (firstMsg && conv.title === 'New conversation') {
    conv.title = firstMsg.content.slice(0, 50) + (firstMsg.content.length > 50 ? '...' : '')
  }
  bg({ type: 'save-conversation', conversation: conv })
}

function switchConversation(id) {
  const conv = S.conversations.find(c => c.id === id)
  if (!conv) return
  saveConversation(S.conversations.find(c => c.id === S.currentConversationId))
  S.currentConversationId = id
  S.chat = conv.chat || []
  S.agent = conv.agent || []
  renderChat()
  renderAgent()
  renderConversations()
}

function toggleConvList() {
  const el = $('conv-list')
  const btn = $('conv-toggle')
  el.classList.toggle('open')
  btn.classList.toggle('open')
}

function renderConversations() {
  const el = $('conv-list')
  const current = $('conv-current')
  if (current) {
    const conv = S.conversations.find(c => c.id === S.currentConversationId)
    current.textContent = conv ? conv.title : 'New conversation'
  }
  if (!el) return
  if (!S.conversations || S.conversations.length === 0) {
    el.innerHTML = ''
    return
  }
  el.innerHTML = S.conversations.slice(0, 20).map(c => `
    <div class="conv-item ${c.id === S.currentConversationId ? 'active' : ''}" data-id="${c.id}">
      <div class="conv-title">${escapeHtml(c.title)}</div>
      <button class="conv-del" data-id="${c.id}" title="Delete">×</button>
    </div>
  `).join('')

  el.querySelectorAll('.conv-item').forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.classList.contains('conv-del')) return
      switchConversation(item.dataset.id)
      el.classList.remove('open')
      $('conv-toggle').classList.remove('open')
    })
  })
  el.querySelectorAll('.conv-del').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation()
      deleteConversation(btn.dataset.id)
    })
  })
}

async function deleteConversation(id) {
  if (S.currentConversationId === id) {
    S.currentConversationId = null
    S.chat = []
    S.agent = []
    renderChat()
    renderAgent()
  }
  S.conversations = S.conversations.filter(c => c.id !== id)
  renderConversations()
  await bg({ type: 'delete-conversation', id })
}

function openSettings() {
  renderConfig()
  $('side-panel').classList.add('open')
  $('overlay').classList.add('active')
}

function closeSettings() {
  $('side-panel').classList.remove('open')
  $('overlay').classList.remove('active')
}

function populateModelSelect() {
  const sel = $('model-select')
  const available = PROVIDERS.filter(p => S.providers[p.id])

  if (available.length === 0) {
    sel.innerHTML = '<option>Configure a provider...</option>'
    return
  }

  sel.innerHTML = available.map(p => {
    const models = S.modelRegistry?.[p.id] || MODELS[p.id]
    if (!models || models.length === 0) return ''

    const selectedModel = S.activeProvider === p.id ? S.activeModel : null
    const opts = models.map(m => {
      const val = `${p.id}::${m.id}`
      const selAttr = selectedModel === m.id ? 'selected' : ''
      return `<option value="${val}" ${selAttr}>${m.label}</option>`
    }).join('')

    const isLive = !!S.modelRegistry?.[p.id]
    return `<optgroup label="${p.label}${isLive ? ' · auto' : ''}">${opts}</optgroup>`
  }).join('')
}

function changeModel() {
  const sel = $('model-select')
  if (!sel.value || !sel.value.includes('::')) return
  const [provider, model] = sel.value.split('::')
  if (provider && model) {
    S.activeProvider = provider
    S.activeModel = model
    bg({ type: 'set-active-model', provider, model })
  }
}

// ===== PERMISSION DISPLAY =====
function updatePermDisplay() {
  const el = $('perm-display')
  if (!el) return
  const level = LEVELS.find(l => l.id === S.permissionLevel)
  if (level) {
    el.style.color = level.color
    el.textContent = `● ${level.label}`
    el.title = level.desc
  }
}

function isPermGranted(actionId) {
  const fromLevel = LEVEL_PERMISSION_MAP[S.permissionLevel] || []
  if (fromLevel.includes(actionId)) return true
  return (S.permissions || []).some(p => p.action === actionId && p.granted)
}

// ===== COSTS DISPLAY =====
function updateCostsDisplay() {
  const total = S.costs?.total || 0
  const display = total < 0.01 ? '<$0.01' : `$${total.toFixed(4)}`
  const el = $('costs-value')
  if (el) el.textContent = display
}

// ===== CHAT =====
function renderChat() {
  const el = $('chat-msgs')

  if (S.chat.length === 0) {
    el.innerHTML = `
      <div class="greet">
        <div class="ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <h3>Welcome</h3>
        <p>${GREETINGS[Math.floor(Math.random() * GREETINGS.length)]}</p>
      </div>
    `
    return
  }

  el.innerHTML = S.chat.map(m => {
    const bubble = `<div class="bubble">${escapeHtml(m.content)}</div>`
    return `<div class="msg ${m.role}">${bubble}</div>`
  }).join('')

  el.scrollTop = el.scrollHeight
}

function addChatMessage(role, content) {
  S.chat.push({ role, content })
  renderChat()
}

async function sendMessage() {
  if (S.mode === 'chat') {
    await sendChat()
  } else if (S.mode === 'agent') {
    await sendAgent()
  }
}

function setStreaming(v) {
  S.streaming = v
  $('msg-btn').style.display = v ? 'none' : ''
  $('stop-btn').style.display = v ? '' : 'none'
  $('msg-inp').disabled = v
}

function stopStreaming() {
  bg({ type: 'abort-stream' })
  S._aborted = true
  if (S._msgElement) {
    S._msgElement.innerHTML = S._buffer
      ? `<div class="bubble">${escapeHtml(S._buffer)}</div>`
      : '<div class="bubble" style="color:#999">Stopped</div>'
    S.chat.push({ role: 'assistant', content: S._buffer || '(cancelled)' })
  }
  S._msgElement = null
  S._buffer = ''
  setStreaming(false)
  renderChat()
  autoSaveConv()
}

async function sendChat() {
  const inp = $('msg-inp')
  const text = inp.value.trim()

  if (!text || S.streaming) return

  inp.value = ''
  addChatMessage('user', text)
  autoSaveConv()

  setStreaming(true)

  const el = $('chat-msgs')
  const msgDiv = document.createElement('div')
  msgDiv.className = 'msg assistant'
  msgDiv.innerHTML = '<div class="bubble typing"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>'
  el.appendChild(msgDiv)
  el.scrollTop = el.scrollHeight

  S._buffer = ''
  S._msgElement = msgDiv

  await bg({ type: 'chat-send', messages: [{ role: 'user', content: text }] })
}

function autoSaveConv() {
  const conv = S.conversations.find(c => c.id === S.currentConversationId)
  if (conv) saveConversation(conv)
}

function onChunk(text) {
  S._buffer += text
  if (S._msgElement) {
    S._msgElement.innerHTML = `<div class="bubble">${escapeHtml(S._buffer)}</div>`
    S._msgElement.parentElement?.scrollTo(0, S._msgElement.parentElement.scrollHeight)
  }
}

function onDone(text) {
  if (S._aborted) { S._aborted = false; return }
  const finalText = text || S._buffer
  if (S._msgElement) {
    S._msgElement.innerHTML = `<div class="bubble">${escapeHtml(finalText)}</div>`
  }
  S._msgElement = null
  if (finalText) S.chat.push({ role: 'assistant', content: finalText })
  setStreaming(false)
  renderChat()
  updateCostsDisplay()
  autoSaveConv()
}

// ===== AGENT =====
function renderAgent() {
  const el = $('agent-msgs')

  if (S.agent.length === 0) {
    el.innerHTML = `
      <div class="greet">
        <div class="ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2l9 5-9 5-9-5 9-5z"/>
            <path d="M3 12l9 5 9-5"/>
            <path d="M3 17l9 5 9-5"/>
          </svg>
        </div>
        <h3>Automated Agent</h3>
        <p>The AI understands natural language — just tell it what you need. It will decide which browser actions to take based on its current permissions.</p>
      </div>
    `
    return
  }

  el.innerHTML = S.agent.map(m => {
    const clean = m.content ? stripActions(m.content) : ''
    const logs = m.logs && m.logs.length ? `<div class="agent-logs">${m.logs.map(l => `<div class="agent-log">${escapeHtml(l)}</div>`).join('')}</div>` : ''
    return `<div class="msg ${m.role}"><div class="bubble${logs ? ' has-logs' : ''}"><div class="agent-text">${escapeHtml(clean)}</div>${logs}</div></div>`
  }).join('')

  el.scrollTop = el.scrollHeight
}

function stripActions(text) {
  return text.replace(/\[(?:NAVIGATE|CLICK|TYPE|READ|DELEGATE|INSPECT)\][\s\S]*?(?=\n(?:\[|\n|$)|\n*$)/g, '').trim()
}

async function sendAgent() {
  const inp = $('msg-inp')
  const text = inp.value.trim()

  if (!text || S.streaming) return

  inp.value = ''
  addAgentMessage('user', text)
  autoSaveConv()

  setStreaming(true)

  const history = S.agent.slice(-10).map(m => ({ role: m.role, content: m.content }))
  const r = await bg({ type: 'agent-command', command: text, conversationHistory: history })

  setStreaming(false)

  addAgentMessage('assistant', r?.response || 'Execution error', r?.logs)

  updateCostsDisplay()
  autoSaveConv()
}

function addAgentMessage(role, content, logs) {
  const clean = role === 'assistant' && content ? stripActions(content) : content
  S.agent.push({ role, content: clean, logs })
  renderAgent()
}

// ===== CONFIG =====
function renderConfig() {
  const el = $('config-content')

  let html = `<div class="section-title">AI Providers</div>`

  PROVIDERS.forEach(p => {
    const connected = !!S.providers[p.id]
    const status = connected ? 'Connected' : 'Not configured'
    const statusClass = connected ? 'connected' : ''

    html += `
      <div class="provider-section">
        <div class="provider-header">
          <div class="provider-name">${p.label}</div>
          <div class="provider-status ${statusClass}">● ${status}</div>
        </div>
        <div class="provider-input-row">
          <input id="pk-${p.id}" type="password" placeholder="${p.ph}" value="${S.providers[p.id]?.apiKey || ''}">
          <button class="conf-btn" data-provider="${p.id}">OK</button>
        </div>
      </div>
    `
  })

  html += `<div class="section-title">Permission Levels</div>`
  LEVELS.forEach(level => {
    const isActive = S.permissionLevel === level.id
    html += `
      <div class="perm-option ${isActive ? 'active' : ''}" data-level="${level.id}">
        <div class="perm-dot" style="background: ${level.color};"></div>
        <div class="perm-text">
          <div class="perm-label">${level.label}</div>
          <div class="perm-desc">${level.desc}</div>
        </div>
        <div class="perm-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <path d="M5 13l4 4L19 7"/>
          </svg>
        </div>
      </div>
    `
  })

  html += `<div class="section-title" style="margin-top:20px">Individual Permissions</div>`
  html += `<p style="font-size:11px;color:#666;margin-bottom:12px">Fine-tune specific permissions. Level-based permissions override these.</p>`

  PERMISSION_ACTIONS.forEach(pa => {
    const granted = isPermGranted(pa.id)
    const overridden = (LEVEL_PERMISSION_MAP[S.permissionLevel] || []).includes(pa.id)
    html += `
      <div class="perm-toggle ${granted ? 'granted' : ''}" data-perm="${pa.id}">
        <div class="perm-toggle-text">
          <div class="perm-toggle-label">${pa.label}</div>
          <div class="perm-toggle-desc">${pa.desc}${overridden ? ' · from level' : ''}</div>
        </div>
        <div class="perm-toggle-switch ${granted ? 'on' : ''}">
          <div class="perm-toggle-knob"></div>
        </div>
      </div>
    `
  })

  html += `<div class="footer">AI Navigator v0.1.0</div>`

  el.innerHTML = html

  el.querySelectorAll('.conf-btn').forEach(btn => {
    btn.addEventListener('click', () => configureProvider(btn.dataset.provider))
  })
  el.querySelectorAll('.perm-option').forEach(opt => {
    opt.addEventListener('click', () => setPermissionLevel(opt.dataset.level))
  })
  el.querySelectorAll('.perm-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => togglePermission(toggle.dataset.perm))
  })
}

async function configureProvider(providerId) {
  const input = $(`pk-${providerId}`)
  const key = input.value.trim()

  if (!key) {
    input.style.borderColor = '#dc2626'
    setTimeout(() => { input.style.borderColor = '' }, 2000)
    return
  }

  const btn = document.querySelector(`[data-provider="${providerId}"]`)
  btn.textContent = '...'

  await bg({ type: 'configure-provider', provider: providerId, apiKey: key })
  S.providers[providerId] = { apiKey: key }

  populateModelSelect()
  renderConfig()
  setTimeout(refresh, 3000)
}

async function setPermissionLevel(level) {
  S.permissionLevel = level
  await bg({ type: 'set-permissions', level, permissions: S.permissions || [] })
  updatePermDisplay()
  renderConfig()
}

async function togglePermission(actionId) {
  const fromLevel = LEVEL_PERMISSION_MAP[S.permissionLevel] || []
  if (fromLevel.includes(actionId)) return

  if (!S.permissions) S.permissions = []
  const existing = S.permissions.find(p => p.action === actionId)
  if (existing) {
    existing.granted = !existing.granted
  } else {
    S.permissions.push({ action: actionId, granted: true })
  }

  await bg({ type: 'set-permissions', permissions: S.permissions, level: S.permissionLevel })
  updatePermDisplay()
  renderConfig()
}

// ===== HELPERS =====
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return (text || '').replace(/[&<>"']/g, c => map[c])
}
