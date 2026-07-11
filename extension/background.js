// ===== STATE =====
const state = {
  providers: {},
  activeProvider: 'openai',
  activeModel: 'gpt-5.6-luna',
  permissions: [],
  permissionLevel: 'none',
  settings: {
    adblockEnabled: true,
    agentMode: 'hermes',
  },
  costs: { records: [], total: 0 },
  subAgents: [],
  chatHistory: [],
  modelRegistry: {},
  conversations: [],
  currentConversationId: null,
}

const DEFAULT_MODELS = {
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

// ===== STORAGE =====
async function loadState() {
  const stored = await chrome.storage.local.get(Object.keys(state))
  Object.assign(state, stored)
  if (!state.permissions) state.permissions = []
  if (!state.chatHistory) state.chatHistory = []
  if (!state.costs) state.costs = { records: [], total: 0 }
  if (!state.subAgents) state.subAgents = []
}
async function saveState() {
  await chrome.storage.local.set(state)
}

// ===== MODEL FETCHING =====
function getModelsForProvider(providerId) {
  return state.modelRegistry[providerId] || DEFAULT_MODELS[providerId] || []
}

async function fetchModelsForProvider(providerId) {
  const config = state.providers[providerId]
  if (!config) return

  try {
    let models = []

    switch (providerId) {
      case 'openai': {
        const res = await fetch('https://api.openai.com/v1/models', {
          headers: { Authorization: `Bearer ${config.apiKey}` },
        })
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const data = await res.json()
        models = (data.data || [])
          .filter(m => m.id.startsWith('gpt-') || m.id.startsWith('o') || m.id.startsWith('ft:'))
          .filter(m => !m.id.includes('realtime') && !m.id.includes('instruct'))
          .sort((a, b) => new Date(b.created || 0) - new Date(a.created || 0))
          .slice(0, 20)
          .map(m => ({ id: m.id, label: m.id }))
        break
      }
      case 'anthropic': {
        const res = await fetch('https://api.anthropic.com/v1/models', {
          headers: { 'x-api-key': config.apiKey, 'anthropic-version': '2023-06-01' },
        })
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const data = await res.json()
        models = (data.data || [])
          .filter(m => m.id.includes('claude'))
          .sort((a, b) => new Date(b.created || 0) - new Date(a.created || 0))
          .slice(0, 10)
          .map(m => ({ id: m.id, label: m.display || m.id }))
        break
      }
      case 'google': {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${config.apiKey}`)
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const data = await res.json()
        models = (data.models || [])
          .filter(m => m.name.includes('gemini'))
          .filter(m => !m.name.includes('tuning') && !m.name.includes('vision'))
          .sort((a, b) => new Date(b.createTime || 0) - new Date(a.createTime || 0))
          .slice(0, 10)
          .map(m => ({ id: m.name.replace('models/', ''), label: m.displayName || m.name.replace('models/', '') }))
        break
      }
      case 'mistral': {
        const res = await fetch('https://api.mistral.ai/v1/models', {
          headers: { Authorization: `Bearer ${config.apiKey}` },
        })
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const data = await res.json()
        models = (data.data || [])
          .filter(m => !m.id.includes('embed') && !m.id.includes('moderate') && !m.id.includes('ocr'))
          .sort((a, b) => new Date(b.created || 0) - new Date(a.created || 0))
          .slice(0, 10)
          .map(m => ({ id: m.id, label: m.id }))
        break
      }
      case 'openrouter': {
        const res = await fetch('https://openrouter.ai/api/v1/models')
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const data = await res.json()
        models = (data.data || [])
          .filter(m => {
            const id = m.id || ''
            return id.startsWith('openai/') || id.startsWith('anthropic/') || id.startsWith('google/') ||
                   id.startsWith('mistralai/') || id.startsWith('deepseek/')
          })
          .filter(m => {
            const id = m.id || ''
            return !id.includes('embed') && !id.includes('image') && !id.includes('audio') &&
                   !id.includes('tts') && !m.architecture?.modality?.includes('image')
          })
          .sort((a, b) => (b.created || 0) - (a.created || 0))
          .slice(0, 50)
          .map(m => ({ id: m.id, label: m.name || m.id }))
        break
      }
    }

    if (models.length > 0) {
      state.modelRegistry[providerId] = models
      await saveState()
    }
  } catch (err) {
    console.log(`[AI Navigator] Model fetch failed for ${providerId}:`, err.message)
  }
}

async function fetchAllModels() {
  const promises = Object.keys(state.providers).map(p => fetchModelsForProvider(p))
  await Promise.allSettled(promises)
}

// ===== PROVIDERS =====
const MODEL_PRICING = {
  'gpt-5.6-sol-pro': { input: 15.00, output: 75.00 },
  'gpt-5.6-sol': { input: 10.00, output: 40.00 },
  'gpt-5.6-terra-pro': { input: 8.00, output: 32.00 },
  'gpt-5.6-terra': { input: 5.00, output: 20.00 },
  'gpt-5.6-luna-pro': { input: 3.00, output: 15.00 },
  'gpt-5.6-luna': { input: 1.50, output: 6.00 },
  'gpt-5.5-pro': { input: 10.00, output: 40.00 },
  'gpt-5.5': { input: 5.00, output: 20.00 },
  'gpt-5.4-mini': { input: 0.30, output: 1.20 },
  'gpt-5.4-nano': { input: 0.10, output: 0.40 },
  'o4-mini-high': { input: 1.50, output: 6.00 },
  'o4-mini': { input: 0.60, output: 2.40 },
  'o3-pro': { input: 10.00, output: 40.00 },
  'o3': { input: 5.00, output: 20.00 },
  'o3-mini-high': { input: 1.25, output: 5.00 },
  'o3-mini': { input: 0.55, output: 2.20 },
  'claude-sonnet-5': { input: 3.00, output: 15.00 },
  'claude-fable-5': { input: 2.00, output: 10.00 },
  'claude-opus-4.8': { input: 15.00, output: 75.00 },
  'claude-opus-4': { input: 15.00, output: 75.00 },
  'claude-haiku-4.5': { input: 0.80, output: 4.00 },
  'claude-sonnet-4': { input: 3.00, output: 15.00 },
  'gemini-3.5-flash': { input: 0.15, output: 0.60 },
  'gemini-3.1-flash-lite': { input: 0.08, output: 0.30 },
  'gemini-3.1-pro': { input: 1.25, output: 5.00 },
  'gemini-2.5-pro': { input: 1.25, output: 5.00 },
  'gemini-2.5-flash': { input: 0.15, output: 0.60 },
  'mistral-medium-3-5': { input: 2.00, output: 6.00 },
  'mistral-small': { input: 0.20, output: 0.60 },
  'mistral-large': { input: 2.00, output: 6.00 },
  'codestral': { input: 1.00, output: 3.00 },
  'pixtral-large': { input: 2.00, output: 6.00 },
  'deepseek-v4-pro': { input: 1.00, output: 4.00 },
  'deepseek-v4-flash': { input: 0.15, output: 0.60 },
  'deepseek-chat': { input: 0.07, output: 1.10 },
  'deepseek-reasoner': { input: 0.55, output: 2.19 },
}

async function chatWithProvider(provider, model, messages, tools, signal) {
  const config = state.providers[provider]
  if (!config) throw new Error(`Provider ${provider} not configured`)

  const headers = { 'Content-Type': 'application/json' }
  let url, body

  switch (provider) {
    case 'openai': {
      url = `${config.baseUrl || 'https://api.openai.com/v1'}/chat/completions`
      headers['Authorization'] = `Bearer ${config.apiKey}`
      body = { model: model || 'gpt-4o', messages, stream: true, tools }
      break
    }
    case 'anthropic': {
      url = `${config.baseUrl || 'https://api.anthropic.com'}/v1/messages`
      headers['x-api-key'] = config.apiKey
      headers['anthropic-version'] = '2023-06-01'
      const systemMsg = messages.find(m => m.role === 'system')
      body = {
        model: model || 'claude-sonnet-5',
        max_tokens: 8192,
        system: systemMsg?.content || '',
        messages: messages.filter(m => m.role !== 'system'),
        stream: true,
      }
      break
    }
    case 'google': {
      url = `https://generativelanguage.googleapis.com/v1beta/models/${model || 'gemini-3.5-flash-001'}:streamGenerateContent?key=${config.apiKey}`
      const contents = messages.filter(m => m.role !== 'system').map(m => ({ role: m.role === 'assistant' ? 'model' : m.role, parts: [{ text: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) }] }))
      body = { contents }
      break
    }
    case 'mistral': {
      url = `${config.baseUrl || 'https://api.mistral.ai'}/v1/chat/completions`
      headers['Authorization'] = `Bearer ${config.apiKey}`
      body = { model: model || 'mistral-medium-3-5-2604', messages, stream: true }
      break
    }
    case 'deepseek': {
      url = `${config.baseUrl || 'https://api.deepseek.com'}/v1/chat/completions`
      headers['Authorization'] = `Bearer ${config.apiKey}`
      body = { model: model || 'deepseek-v4-flash', messages, stream: true }
      break
    }
    case 'openrouter': {
      url = 'https://openrouter.ai/api/v1/chat/completions'
      headers['Authorization'] = `Bearer ${config.apiKey}`
      headers['HTTP-Referer'] = 'https://ainavigator.app'
      headers['X-Title'] = 'AI Navigator'
      body = { model: model || 'openai/gpt-5.6-luna', messages, stream: true }
      break
    }
    case 'ollama': {
      url = `${config.baseUrl || 'http://localhost:11434'}/api/chat`
      body = { model: model || 'llama3.3:70b', messages, stream: true }
      break
    }
    default:
      throw new Error(`Unknown provider: ${provider}`)
  }

  const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body), signal })
  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`API error ${response.status}: ${errText}`)
  }

  return response.body.getReader()
}

// ===== COST TRACKING =====
function trackCost(model, promptTokens, completionTokens) {
  const pricing = MODEL_PRICING[model] || { input: 0, output: 0 }
  const inputCost = (promptTokens / 1_000_000) * pricing.input
  const outputCost = (completionTokens / 1_000_000) * pricing.output
  const record = {
    id: Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    model,
    promptTokens,
    completionTokens,
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost,
    timestamp: Date.now(),
  }
  state.costs.records.push(record)
  state.costs.total += record.totalCost
  saveState()
  return record
}

// ===== SUB-AGENTS =====
let subAgentId = 0

async function delegateSubAgent(task, name) {
  const id = `sub-${++subAgentId}`
  const agent = { id, name: name || `Sub-agent #${subAgentId}`, task, status: 'running', result: null, error: null, startedAt: Date.now(), completedAt: null }
  state.subAgents.push(agent)
  saveState()
  notifySidebar({ type: 'sub-agents-updated', agents: state.subAgents })

  try {
    const provider = state.activeProvider
    const config = state.providers[provider]
    if (!config) throw new Error('Provider not configured')

    const messages = [{ role: 'system', content: `You are a sub-agent. Your task: ${task}\nBe concise and complete in your response.` }]
    const reader = await chatWithProvider(provider, state.activeModel, messages, null)
    const decoder = new TextDecoder()
    let result = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const text = decoder.decode(value, { stream: true })
      result += parseStreamChunk(provider, text)
    }

    agent.status = 'completed'
    agent.result = result || 'No output'
    agent.completedAt = Date.now()
  } catch (err) {
    agent.status = 'error'
    agent.error = err.message
    agent.completedAt = Date.now()
  }

  saveState()
  notifySidebar({ type: 'sub-agents-updated', agents: state.subAgents })
  return id
}

function parseStreamChunk(provider, text) {
  if (!text) return ''
  const lines = text.split('\n').filter(Boolean)

  if (provider === 'anthropic') {
    let result = ''
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const d = JSON.parse(line.slice(6))
          if (d.type === 'content_block_delta') result += d.delta?.text || ''
        } catch {}
      }
    }
    return result
  }

  if (provider === 'ollama') {
    let result = ''
    for (const line of lines) {
      try { const d = JSON.parse(line); result += d.message?.content || '' } catch {}
    }
    return result
  }

  // OpenAI / Mistral / DeepSeek / OpenRouter — SSE format
  let result = ''
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6).trim()
      if (data === '[DONE]') continue
      try {
        const d = JSON.parse(data)
        result += d.choices?.[0]?.delta?.content || ''
      } catch {}
    } else {
      // fallback: direct JSON (some providers)
      try {
        const d = JSON.parse(line)
        result += d.choices?.[0]?.delta?.content || ''
      } catch {}
    }
  }
  return result
}

// ===== ABORT CONTROLLER =====
let _activeAbort = null

function abortActiveStream() {
  if (_activeAbort) {
    _activeAbort.abort()
    _activeAbort = null
  }
}

// ===== SIDEBAR MESSAGING =====
function notifySidebar(data) {
  chrome.runtime.sendMessage(data).catch(() => {})
}

// ===== MESSAGE HANDLER =====
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    try {
      const response = await handleMessage(msg)
      sendResponse(response)
    } catch (err) {
      sendResponse({ error: err.message })
    }
  })()
  return true
})

async function handleMessage(msg) {
  switch (msg.type) {
    case 'get-state':
      return state

    case 'configure-provider': {
       state.providers[msg.provider] = { apiKey: msg.apiKey, baseUrl: msg.baseUrl }
       if (!state.activeProvider) state.activeProvider = msg.provider
       await saveState()
       fetchModelsForProvider(msg.provider)
       return { success: true }
     }

    case 'set-active-provider': {
       state.activeProvider = msg.provider
       await saveState()
       return { success: true }
     }

     case 'set-active-model': {
       state.activeProvider = msg.provider
       state.activeModel = msg.model
       await saveState()
       return { success: true }
     }

    case 'get-costs':
      return state.costs

    case 'reset-costs': {
      state.costs = { records: [], total: 0 }
      await saveState()
      return { success: true }
    }

    case 'get-sub-agents':
      return state.subAgents

    case 'reset-sub-agents': {
      state.subAgents = []
      subAgentId = 0
      await saveState()
      return { success: true }
    }

    case 'set-permissions': {
      if (msg.permissions) state.permissions = msg.permissions
      if (msg.level) state.permissionLevel = msg.level
      if (!state.permissions) state.permissions = []
      await saveState()
      return { success: true }
    }

    case 'set-setting': {
      state.settings[msg.key] = msg.value
      await saveState()
      return { success: true }
    }

    case 'chat-send':
      return handleChat(msg.messages, msg.tools)

    case 'abort-stream': {
      abortActiveStream()
      return { success: true }
    }

    case 'save-conversation': {
      const idx = state.conversations.findIndex(c => c.id === msg.conversation.id)
      if (idx >= 0) state.conversations[idx] = msg.conversation
      else state.conversations.push(msg.conversation)
      state.currentConversationId = msg.conversation.id
      state.conversations.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
      if (state.conversations.length > 50) state.conversations.length = 50
      await saveState()
      return { success: true }
    }

    case 'delete-conversation': {
      state.conversations = state.conversations.filter(c => c.id !== msg.id)
      if (state.currentConversationId === msg.id) state.currentConversationId = state.conversations[0]?.id || null
      await saveState()
      return { success: true }
    }

    case 'clear-conversations': {
      state.conversations = []
      state.currentConversationId = null
      await saveState()
      return { success: true }
    }

    case 'agent-command':
      return handleAgentCommand(msg.command, msg.conversationHistory)

    case 'delegate-task': {
      const id = await delegateSubAgent(msg.task, msg.name)
      return { agentId: id }
    }

    case 'check-permission':
      return { granted: checkPermission(msg.action) }

    case 'navigate': {
      if (!checkPermission('navigate')) return { error: 'Permission denied' }
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (tab) await chrome.tabs.update(tab.id, { url: msg.url })
      return { success: true }
    }

    case 'read-page': {
      if (!checkPermission('read_content')) return { error: 'Permission denied' }
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (!tab) return { error: 'No active tab' }
      const result = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => ({ title: document.title, url: location.href, text: document.body.innerText.slice(0, 50000) }),
      })
      return { success: true, data: result[0]?.result }
    }

    case 'click-element': {
      if (!checkPermission('click')) return { error: 'Permission denied' }
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (!tab) return { error: 'No active tab' }
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (selector) => { const el = document.querySelector(selector); if (el) el.click(); return !!el },
        args: [msg.selector],
      })
      return { success: true }
    }

    case 'type-text': {
      if (!checkPermission('type')) return { error: 'Permission denied' }
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (!tab) return { error: 'No active tab' }
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (selector, text) => {
          const el = document.querySelector(selector)
          if (el) { el.value = text; el.dispatchEvent(new Event('input', { bubbles: true })) }
          return !!el
        },
        args: [msg.selector, msg.text],
      })
      return { success: true }
    }

    case 'execute-js': {
      if (!checkPermission('execute_js')) return { error: 'Permission denied' }
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (!tab) return { error: 'No active tab' }
      const result = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (code) => eval(code),
        args: [msg.code],
      })
      return { success: true, data: result[0]?.result }
    }

    default:
      return { error: `Unknown message type: ${msg.type}` }
  }
}

// ===== CHAT =====
async function handleChat(messages, tools) {
  const provider = state.activeProvider
  const model = state.activeModel
  const config = state.providers[provider]
  if (!config) return { error: `Provider "${provider}" not configured. Add API key in settings.` }

  abortActiveStream()
  const controller = new AbortController()
  _activeAbort = controller

  const reader = await chatWithProvider(provider, model, messages, tools, controller.signal)
  const decoder = new TextDecoder()
  let fullContent = ''
  let promptTokens = 0
  let completionTokens = 0

  for (const m of messages) {
    const c = typeof m.content === 'string' ? m.content : JSON.stringify(m.content)
    promptTokens += Math.ceil(c.length / 4)
  }

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const text = decoder.decode(value, { stream: true })
      const content = parseStreamChunk(provider, text)
      if (content) {
        fullContent += content
        completionTokens += Math.ceil(content.length / 4)
        notifySidebar({ type: 'chat-chunk', content })
      }
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      notifySidebar({ type: 'chat-done', content: fullContent, aborted: true })
      return { success: true, content: fullContent, aborted: true }
    }
    throw err
  } finally {
    _activeAbort = null
  }

  trackCost(model, promptTokens, completionTokens)
  notifySidebar({ type: 'chat-done', content: fullContent })
  return { success: true, content: fullContent }
}

// ===== AGENT COMMANDS =====
async function handleAgentCommand(command, conversationHistory) {
  const provider = state.activeProvider
  const config = state.providers[provider]
  if (!config) return { response: '⚠️ No AI provider configured. Add an API key in Settings.' }

  const allowed = getCurrentPermissions()
  if (allowed.length === 0) return { response: '⚠️ No permissions enabled. Go to Settings to enable agent permissions.' }

  // Phase 1: Extract intent — AI helps but we fallback to keyword parsing
  abortActiveStream()
  const controller = new AbortController()
  _activeAbort = controller
  const plan = await extractIntent(command, conversationHistory, controller.signal)
  _activeAbort = null

  // Fallback: keyword-based parsing if AI fails
  if (!plan?.url && !plan?.action) {
    const fallback = parseIntentKeywords(command)
    if (fallback) {
      plan.url = fallback.url
      plan.action = fallback.action
      plan.query = fallback.query || 'hello'
      plan.message = fallback.message || ''
    }
  }

  if (!plan?.url && !plan?.action) {
    return { response: "I couldn't understand what you want me to do. Try something like: 'go to google.com' or 'open youtube and search for cats'." }
  }

  // Default query if none provided
  if ((plan.action === 'ask' || plan.action === 'search') && !plan.query) {
    plan.query = 'hello world'
  }

  const logs = []
  let response = plan.message || ''

  // Phase 2: Execute plan step by step
  try {
    if (plan.url) {
      await navigateTo(plan.url, logs)
    }

    if (plan.action && checkPermission(plan.action)) {
      await executeWithInspect(plan, logs)
    } else if (plan.action) {
      logs.push(`⛔ ${plan.action}: permission denied`)
    }

    // Phase 3: Ask AI to summarize
    const summary = await askForSummary(logs)
    if (summary) response = summary
  } catch (err) {
    logs.push(`❌ ${err.message}`)
  }

  return { response, logs }
}

async function extractIntent(command, conversationHistory, signal) {
  const msgs = [
    { role: 'system', content: `Extract a browser action plan from the user's request. Respond with valid JSON only, no other text. If no query is specified, use "hello" as default.

Examples:
User: "va sur google.com"
{"url":"https://google.com","action":"navigate","message":"Going to Google"}

User: "ouvre gemini et pose lui une question"
{"url":"https://gemini.google.com","action":"ask","query":"hello","message":"Opening Gemini"}

User: "cherche des photos de chats"
{"url":"https://google.com","action":"search","query":"cat photos","message":"Searching for cat photos"}

User: "recommence" 
(use conversation history to determine the original request)

KNOWN URLS:
- google → https://google.com
- gemini → https://gemini.google.com
- youtube → https://youtube.com
- gmail → https://mail.google.com
- chatgpt → https://chatgpt.com

If can't understand: {"error":"explanation"}` },
  ]

  if (conversationHistory) {
    for (const m of conversationHistory.slice(-4)) {
      msgs.push({ role: m.role, content: m.content })
    }
  }
  msgs.push({ role: 'user', content: command })

  try {
    const reader = await chatWithProvider(state.activeProvider, state.activeModel, msgs, null, signal)
    const decoder = new TextDecoder()
    let text = ''
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      text += parseStreamChunk(state.activeProvider, decoder.decode(value, { stream: true }))
    }
    return JSON.parse(text)
  } catch {
    return { error: "Failed to understand the request. Try a different phrasing." }
  }
}

function parseIntentKeywords(command) {
  const c = command.toLowerCase()
  const sites = {
    'youtube': { url: 'https://youtube.com', action: 'search' },
    'google': { url: 'https://google.com', action: 'search' },
    'gemini': { url: 'https://gemini.google.com', action: 'ask' },
    'gmail': { url: 'https://mail.google.com', action: 'navigate' },
    'chatgpt': { url: 'https://chatgpt.com', action: 'ask' },
    'github': { url: 'https://github.com', action: 'navigate' },
  }

  const words = c.split(/\s+/)
  let best = { url: null, action: null, query: '', message: '' }

  for (const [name, info] of Object.entries(sites)) {
    if (c.includes(name)) {
      best = info
      break
    }
  }

  if (!best.url) {
    // Try to extract a URL directly
    const urlMatch = c.match(/(?:va\s+(?:sur|à|chez)\s+)?(\S+\.\w{2,})/i)
    if (urlMatch) {
      const domain = urlMatch[1].replace(/^https?:\/\//, '')
      best = { url: `https://${domain}`, action: 'navigate', query: '', message: `Going to ${domain}` }
    }
  }

  if (best.url && (best.action === 'ask' || best.action === 'search')) {
    // Extract query: text after "pour", "sur", "demande", "cherche", "question"
    const queryMatch = c.match(/(?:demande|question|pose|cherche|recherche|sur)\s+(.+?)(?:\s+et|\s*$)/i)
    best.query = queryMatch ? queryMatch[1].trim() : 'hello world'
    best.message = best.query && best.query !== 'hello world'
      ? `Asking ${best.query} on ${best.url}`
      : `Opening ${best.url}`
  }

  return best.url ? best : null
}

async function navigateTo(url, logs) {
  const fullUrl = url.startsWith('http') ? url : `https://${url}`
  try {
    const tab = await chrome.tabs.create({ url: fullUrl, active: true })
    const loaded = await waitForPageLoad(tab.id)
    if (loaded) {
      logs.push(`✅ Navigated to ${fullUrl}`)
    } else {
      logs.push(`✅ Navigated to ${fullUrl} (waiting for load)`)
    }
  } catch (err) {
    logs.push(`❌ Navigation failed: ${err.message}`)
    throw err
  }
}

async function executeWithInspect(plan, logs) {
  const tab = await getActiveContentTab()
  if (!tab || !isValidUrl(tab?.url)) {
    logs.push(`⚠️ Page not ready yet`)
    return
  }

  if (plan.action === 'ask' || plan.action === 'search') {
    // Inspect page to find input field
    const inspectResult = await inspectPage(tab.id)
    logs.push(`🔍 Inspected page`)

    const elements = safeJsonParse(inspectResult, [])
    const inputEl = elements.find(el =>
      el.contenteditable || el.role === 'textbox' || el.role === 'combobox' ||
      el.role === 'searchbox' || el.tag === 'textarea' ||
      (el.tag === 'input' && (el.type === 'text' || el.type === 'search' || el.type === 'email')) ||
      el.placeholder || el.name === 'q'
    )

    if (inputEl?.selector) {
      const query = plan.query || (plan.action === 'search' ? 'search' : 'hello')
      await typeInField(tab.id, inputEl.selector, query, logs)

      // Send via Enter (works on all chat UIs)
      await new Promise(r => setTimeout(r, 500))
      await pressEnterFallback(tab.id, logs)
    } else {
      logs.push(`🔍 Searching deeper for input field...`)
      // Try with deep page search
      const found = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          // Search any editable element via deep query
          const candidates = document.querySelectorAll(
            'div[contenteditable], [contenteditable], textarea, input:not([type="hidden"]), [role="textbox"], [role="combobox"], [role="searchbox"], .ql-editor, .ProseMirror, [data-slate-editor]'
          )
          for (const el of candidates) {
            const rect = el.getBoundingClientRect()
            if (rect.width > 30 && rect.height > 20) {
              el.focus()
              return el.getAttribute('contenteditable')
                ? 'contenteditable'
                : el.tagName.toLowerCase() + (el.type ? `[type="${el.type}"]` : '')
            }
          }
          // Last resort: find the largest input-like element
          let best = null, bestArea = 0
          document.querySelectorAll('*').forEach(el => {
            const r = el.getBoundingClientRect()
            const area = r.width * r.height
            if (area > bestArea && area < 500000 && r.width > 50 && r.height > 20) {
              if (el.isContentEditable || el.tagName === 'TEXTAREA' || el.tagName === 'INPUT' ||
                  el.getAttribute('role') === 'textbox' || el.getAttribute('role') === 'combobox') {
                best = el; bestArea = area
              }
            }
          })
          if (best) { best.focus(); return 'deep-fallback' }
          return null
        },
      })
      if (found?.[0]?.result) {
        const query = plan.query || 'hello'
        await typeInField(tab.id, '', query, logs)
        await new Promise(r => setTimeout(r, 1000))
        await pressEnterFallback(tab.id, logs)
      } else {
        logs.push(`⚠️ Could not find any input field on the page`)
      }
    }
  } else if (plan.action === 'click-first') {
    const result = await inspectPage(tab.id)
    const elements = safeJsonParse(result, [])
    const firstLink = elements.find(el => el.tag === 'a' && el.href)
    if (firstLink?.selector) {
      await clickElement(tab.id, firstLink.selector, logs)
    } else {
      logs.push(`⚠️ No links found`)
    }
  }
}

async function inspectPage(tabId) {
  const r = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      const items = []
      const seen = new Set()

      function walk(root) {
        const sel = 'a, button, input, textarea, select, div[contenteditable], [contenteditable], [role="textbox"], [role="combobox"], [role="searchbox"], [role="button"], [role="option"]'
        root.querySelectorAll(sel).forEach(el => {
          if (items.length >= 35) return
          const rect = el.getBoundingClientRect()
          if (rect.width < 15 || rect.height < 15) return
          const selectors = []
          const aria = el.getAttribute('aria-label')
          const name = el.getAttribute('name')
          const placeholder = el.placeholder
          if (el.id) selectors.push(`#${el.id}`)
          if (aria) selectors.push(`[aria-label="${aria.replace(/"/g, '\\"')}"]`)
          if (name) selectors.push(`[name="${name}"]`)
          if (el.hasAttribute('contenteditable')) selectors.push('[contenteditable="true"]')
          if (placeholder) selectors.push(`[placeholder="${placeholder.replace(/"/g, '\\"')}"]`)
          const key = selectors[0] || el.tagName + (aria || name || el.textContent?.trim().slice(0, 20) || '')
          if (seen.has(key)) return
          seen.add(key)
          items.push({
            tag: el.tagName.toLowerCase(),
            type: el.type || null,
            text: (el.textContent || '').trim().slice(0, 40),
            name, 'aria-label': aria, placeholder,
            contenteditable: el.hasAttribute('contenteditable') ? 'true' : null,
            role: el.getAttribute('role'),
            selector: selectors[0] || null,
            visible: rect.top < window.innerHeight && rect.bottom > 0,
          })
        })
        // Walk into open shadow roots
        root.querySelectorAll('*').forEach(el => {
          if (el.shadowRoot) walk(el.shadowRoot)
        })
      }

      walk(document)
      return JSON.stringify(items)
    },
  })
  return r[0]?.result || '[]'
}

async function typeInField(tabId, selector, text, logs) {
  // Log what we're doing
  logs.push(`✏️ Typing: "${text.slice(0, 30)}..."`)

  const ok = await chrome.scripting.executeScript({
    target: { tabId },
    func: (s, t) => {
      let el = null
      // First: try the EXACT Gemini/Prompt input
      const exactSelectors = [
        'prompt-suggestion prompt-chip', 'prompt-suggestion',
        'rich-textarea div[contenteditable]', 'rich-textarea',
        'chat-container div[contenteditable]', 'chat-container',
        'main div[contenteditable]',
        'div[contenteditable="true"]',
        '[contenteditable="true"]',
        'textarea',
        'input[type="text"]:not([aria-hidden])', 'input[type="search"]',
        '[role="textbox"]', '[role="combobox"]', '[role="searchbox"]',
        '.ql-editor', '.ProseMirror',
      ]
      for (const fb of exactSelectors) {
        if (!el) {
          try { el = document.querySelector(fb) } catch {}
        }
      }
      // Deep scan: find the VISIBLE contenteditable nearest the center/bottom
      if (!el) {
        let best = null, bestScore = -1
        document.querySelectorAll('*').forEach(e => {
          if (!e.isContentEditable && e.tagName !== 'TEXTAREA' && e.tagName !== 'INPUT') return
          if (e.tagName === 'INPUT' && ['hidden', 'submit', 'button', 'checkbox', 'radio'].includes(e.type)) return
          const r = e.getBoundingClientRect()
          if (r.width < 30 || r.height < 20) return
          // Prefer elements near the bottom (chat input area)
          const score = (r.bottom) + (r.width * r.height / 10000)
          if (score > bestScore) { best = e; bestScore = score }
        })
        el = best
      }
      if (!el) return 'no-element'

      el.focus()
      el.scrollIntoView({ block: 'center' })

      const tag = el.tagName.toLowerCase()
      const role = el.getAttribute('role') || ''
      const editable = el.isContentEditable

      if (editable) {
        // Clear
        el.textContent = ''
        // Use multiple event approaches to ensure the framework catches it
        el.dispatchEvent(new FocusEvent('focus', { bubbles: true }))
        document.execCommand('insertText', false, t)
        el.dispatchEvent(new InputEvent('beforeinput', { bubbles: true, inputType: 'insertText', data: t }))
        el.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: t }))
        // Also set textContent directly as fallback
        if (!el.textContent) el.textContent = t
        el.dispatchEvent(new Event('input', { bubbles: true }))
        el.dispatchEvent(new Event('change', { bubbles: true }))
      } else {
        el.value = t
        el.dispatchEvent(new Event('input', { bubbles: true }))
        el.dispatchEvent(new Event('change', { bubbles: true }))
      }
      return `${tag}${editable ? '[contenteditable]' : ''} role="${role}"`
    },
    args: [selector, text],
  })
  if (ok?.[0]?.result) {
    if (ok[0].result !== 'no-element') {
      logs.push(`✏️ Typed in ${ok[0].result}`)
    } else {
      logs.push(`⚠️ Could not find input field`)
    }
    // Wait for page to register input before sending
    await new Promise(r => setTimeout(r, 2000))
  } else {
    logs.push(`⚠️ Could not type: field not found`)
  }
}

async function clickElement(tabId, selector, logs) {
  const ok = await chrome.scripting.executeScript({
    target: { tabId },
    func: (s) => {
      const trySelectors = [
        s,
        'button[aria-label*="Send"]', 'button[aria-label*="send"]',
        'button[aria-label*="Envoyer"]', 'button[aria-label*="envoyer"]',
        'button[aria-label*="Search"]', 'button[aria-label*="search"]',
        'button[type="submit"]',
        '[data-testid*="send"]', '[data-testid*="Send"]',
        'button:has(svg)', 'button:last-child',
      ].filter(Boolean)
      for (const sel of trySelectors) {
        try {
          const el = document.querySelector(sel)
          if (el && el.offsetParent !== null) { el.click(); return sel }
        } catch {}
      }
      return null
    },
    args: [selector],
  })
  if (ok?.[0]?.result) {
    logs.push(`✅ Clicked send`)
  } else {
    logs.push(`⚠️ Send button not found, trying Enter key`)
    await pressEnterFallback(tabId, logs)
  }
}

async function pressEnterFallback(tabId, logs) {
  const ok = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      const el = document.activeElement
        || document.querySelector('[contenteditable="true"]')
        || document.querySelector('textarea')
        || document.querySelector('input:not([type="hidden"])')
      if (!el) return false
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true, cancelable: true }))
      el.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true, cancelable: true }))
      el.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true, cancelable: true }))
      return true
    },
  })
  if (ok?.[0]?.result) {
    logs.push(`↩ Pressed Enter`)
  } else {
    logs.push(`⚠️ Could not press Enter`)
  }
}


async function askForSummary(logs) {
  if (logs.length === 0) return ''
  const actions = logs.filter(l => l.startsWith('✅') || l.startsWith('✏️') || l.startsWith('↩'))
  if (actions.length === 0) return ''
  return `Done! ${actions.join(', ')}.`
}

function safeJsonParse(str, fallback) {
  try { return JSON.parse(str) } catch { return fallback }
}

async function waitForPageLoad(tabId) {
  for (let i = 0; i < 30; i++) {
    try {
      const tab = await chrome.tabs.get(tabId)
      if (tab.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) return true
    } catch {}
    await new Promise(r => setTimeout(r, 500))
  }
  return false
}

function isValidUrl(url) {
  return url && (url.startsWith('http://') || url.startsWith('https://'))
}

async function getActiveContentTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
  for (const t of tabs) {
    if (isValidUrl(t.url)) return t
  }
  const all = await chrome.tabs.query({})
  return all.find(t => isValidUrl(t.url)) || tabs[0]
}

// ===== PERMISSIONS =====
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

function checkPermission(action) {
  if (state.permissionLevel === 'full') return true
  if (state.permissionLevel === 'none') return false
  const fromLevel = LEVEL_PERMISSION_MAP[state.permissionLevel] || []
  if (fromLevel.includes(action)) return true
  return state.permissions?.some(p => p.action === action && p.granted) === true
}

function getCurrentPermissions() {
  const fromLevel = LEVEL_PERMISSION_MAP[state.permissionLevel] || []
  const fromIndividual = (state.permissions || []).filter(p => p.granted).map(p => p.action)
  return [...new Set([...fromLevel, ...fromIndividual])]
}

// ===== SIDEPANEL =====
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

chrome.action.onClicked.addListener(() => {
  chrome.sidePanel.open()
})

// ===== INIT =====
chrome.runtime.onInstalled.addListener(() => {
  loadState()
  setTimeout(fetchAllModels, 2000)
})
loadState()
setTimeout(fetchAllModels, 3000)

console.log('[AI Navigator] Service worker loaded')
