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
  groq: [
    { id: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B' },
    { id: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B Instant' },
    { id: 'mixtral-8x7b-32768', label: 'Mixtral 8x7B' },
    { id: 'gemma2-9b-it', label: 'Gemma 2 9B' },
    { id: 'deepseek-r1-distill-llama-70b', label: 'DeepSeek R1 70B' },
  ],
  together: [
    { id: 'meta-llama/Llama-3.3-70B-Instruct-Turbo', label: 'Llama 3.3 70B Turbo' },
    { id: 'mistralai/Mixtral-8x22B-Instruct-v0.1', label: 'Mixtral 8x22B' },
    { id: 'google/gemma-2-27b-it', label: 'Gemma 2 27B' },
    { id: 'deepseek-ai/DeepSeek-R1', label: 'DeepSeek R1' },
    { id: 'Qwen/Qwen2.5-72B-Instruct-Turbo', label: 'Qwen 2.5 72B' },
  ],
  perplexity: [
    { id: 'sonar-pro', label: 'Sonar Pro' },
    { id: 'sonar', label: 'Sonar' },
    { id: 'sonar-deep-research', label: 'Sonar Deep Research' },
  ],
  xai: [
    { id: 'grok-2', label: 'Grok 2' },
    { id: 'grok-2-mini', label: 'Grok 2 Mini' },
    { id: 'grok-vision', label: 'Grok Vision' },
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
      case 'groq': {
        const res = await fetch('https://api.groq.com/openai/v1/models', {
          headers: { Authorization: `Bearer ${config.apiKey}` },
        })
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const data = await res.json()
        models = (data.data || [])
          .sort((a, b) => (b.created || 0) - (a.created || 0))
          .slice(0, 10)
          .map(m => ({ id: m.id, label: m.id }))
        break
      }
      case 'together': {
        const res = await fetch('https://api.together.xyz/v1/models', {
          headers: { Authorization: `Bearer ${config.apiKey}` },
        })
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const data = await res.json()
        models = (data || [])
          .filter(m => !m.id?.includes('embedding'))
          .sort((a, b) => (b.created || 0) - (a.created || 0))
          .slice(0, 15)
          .map(m => ({ id: m.id, label: m.display_name || m.id }))
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
  'llama-3.3-70b-versatile': { input: 0.59, output: 0.79 },
  'llama-3.1-8b-instant': { input: 0.05, output: 0.08 },
  'mixtral-8x7b-32768': { input: 0.24, output: 0.24 },
  'gemma2-9b-it': { input: 0.20, output: 0.20 },
  'meta-llama/Llama-3.3-70B-Instruct-Turbo': { input: 0.88, output: 0.88 },
  'mistralai/Mixtral-8x22B-Instruct-v0.1': { input: 0.90, output: 0.90 },
  'google/gemma-2-27b-it': { input: 0.30, output: 0.30 },
  'sonar-pro': { input: 3.00, output: 15.00 },
  'sonar': { input: 1.00, output: 1.00 },
  'grok-2': { input: 2.00, output: 10.00 },
  'grok-2-mini': { input: 0.10, output: 0.40 },
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
    case 'groq': {
      url = `${config.baseUrl || 'https://api.groq.com/openai/v1'}/chat/completions`
      headers['Authorization'] = `Bearer ${config.apiKey}`
      body = { model: model || 'llama-3.3-70b-versatile', messages, stream: true }
      break
    }
    case 'together': {
      url = `${config.baseUrl || 'https://api.together.xyz/v1'}/chat/completions`
      headers['Authorization'] = `Bearer ${config.apiKey}`
      body = { model: model || 'meta-llama/Llama-3.3-70B-Instruct-Turbo', messages, stream: true }
      break
    }
    case 'perplexity': {
      url = `${config.baseUrl || 'https://api.perplexity.ai'}/chat/completions`
      headers['Authorization'] = `Bearer ${config.apiKey}`
      body = { model: model || 'sonar-pro', messages, stream: true }
      break
    }
    case 'xai': {
      url = `${config.baseUrl || 'https://api.x.ai/v1'}/chat/completions`
      headers['Authorization'] = `Bearer ${config.apiKey}`
      body = { model: model || 'grok-2', messages, stream: true }
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

// ===== AGENT COMMANDS (Talk + Act) =====
async function handleAgentCommand(command, conversationHistory) {
  const provider = state.activeProvider
  const config = state.providers[provider]
  if (!config) return { response: '⚠️ No AI provider configured. Add an API key in Settings.' }

  const allowed = getCurrentPermissions()
  if (allowed.length === 0) return { response: '⚠️ No permissions enabled. Go to Settings to enable agent permissions.' }

  abortActiveStream()
  const controller = new AbortController()
  _activeAbort = controller

  // Build messages with system prompt, history, and current command
  const sysPrompt = `You are a browser automation assistant. You MUST respond conversationally AND include [ACTION] markers when the user asks you to do something.

AVAILABLE ACTIONS:
[NAVIGATE] https://url
[TYPE] css-selector | text to type
[CLICK] css-selector
[READ]
[INSPECT]

CURRENT PERMISSIONS: ${allowed.join(', ') || 'None'}

KNOWN SELECTORS:
- YouTube search: input[name="search_query"]
- YouTube video: a[href*="/watch?v="]
- Google search: input[name="q"]
- Gemini chat: div[contenteditable="true"]

CRITICAL RULES:
1. If the user asks you to DO something on a website, you MUST include action markers
2. NEVER just talk about what you'd do — actually include [NAVIGATE], [TYPE], [CLICK] markers
3. Always include [TYPE] and [CLICK] after navigating if the request involves searching or interacting
4. If you need to know the page structure, use [INSPECT] after navigating
5. BAD: "I'll go to YouTube and search for Mr Beast" (no actions → nothing happens)
6. GOOD: "Going to YouTube to search for Mr Beast! [NAVIGATE] https://youtube.com [TYPE] input[name=\"search_query\"] | mr beast [CLICK] button[aria-label=\"Search\"]"`

  const messages = [{ role: 'system', content: sysPrompt }]
  if (conversationHistory) {
    for (const m of conversationHistory.slice(-10)) {
      messages.push({ role: m.role, content: m.content })
    }
  }
  messages.push({ role: 'user', content: command })

  // Phase 1: Get AI's full response (conversation + action markers)
  let response = ''
  try {
    const reader = await chatWithProvider(provider, state.activeModel, messages, null, controller.signal)
    const decoder = new TextDecoder()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      response += parseStreamChunk(provider, decoder.decode(value, { stream: true }))
    }
  } catch (err) {
    _activeAbort = null
    if (err.name === 'AbortError') return { response: 'Cancelled.', logs: [] }
    return { response: `Error: ${err.message}`, logs: [] }
  }
  _activeAbort = null

  // Phase 2: Parse and execute actions
  const logs = []
  let actions = parseActionMarkers(response)

  // Retry if AI forgot actions but user asked for something
  if (actions.length === 0) {
    const retryMsgs = [
      { role: 'system', content: 'The user asked you to do something on a website, but your previous response had no action markers. Reply with ONLY the action markers needed — no conversation.' },
      { role: 'user', content: `Previous response: "${response.slice(-200)}"\n\nWhat are the correct action markers for this request?` },
    ]
    try {
      const reader2 = await chatWithProvider(provider, state.activeModel, retryMsgs, null)
      const dec2 = new TextDecoder()
      let retryText = ''
      while (true) {
        const { done, value } = await reader2.read()
        if (done) break
        retryText += parseStreamChunk(provider, dec2.decode(value, { stream: true }))
      }
      actions = parseActionMarkers(retryText)
    } catch {}
  }

  let followUpCount = 0
  for (let i = 0; i < actions.length && followUpCount < 8; i++) {
    const action = actions[i]
    if (!checkPermission(action.type)) {
      logs.push(`⛔ ${action.type}: permission denied`)
      continue
    }
    try {
      const log = await executeAction(action)
      logs.push(log)

      // After navigate or inspect, ask AI for next action
      if ((action.type === 'navigate' || action.type === 'inspect') && !log.startsWith('⚠️') && !log.startsWith('❌')) {
        const followUp = await askForNextAction(provider, response, log)
        const nextActions = parseActionMarkers(followUp)
        if (nextActions.length > 0) {
          actions.splice(i + 1, actions.length - i - 1, ...nextActions)
          followUpCount++
        }
      }
    } catch (err) {
      logs.push(`❌ ${action.type}: ${err.message}`)
    }
  }

  // Clean action markers from displayed text
  const cleanResponse = response.replace(/\[\w+\][\s\S]*?(?=\n(?:\[|\n)|\n*$)/g, '').trim()

  return { response: cleanResponse, logs }
}

function parseActionMarkers(text) {
  const actions = []
  const re = /\[(\w+)\]\s*(.*?)(?=\[\w+\]|\n*$)/gs
  let m
  while ((m = re.exec(text)) !== null) {
    const type = m[1].toLowerCase()
    const rest = m[2].trim()
    if (type === 'navigate') actions.push({ type, url: rest })
    else if (type === 'click') actions.push({ type, selector: rest })
    else if (type === 'type') {
      const parts = rest.split('|')
      actions.push({ type, selector: (parts[0] || '').trim(), text: (parts.slice(1).join('|') || '').trim() })
    } else if (type === 'read' || type === 'inspect') actions.push({ type })
    else if (type === 'delegate') {
      const parts = rest.split('|')
      actions.push({ type, task: (parts[0] || '').trim(), name: (parts.slice(1).join('|') || '').trim() || undefined })
    }
  }
  return actions
}

async function askForNextAction(provider, historyContext, result) {
  const config = state.providers[provider]
  if (!config) return ''
  try {
    const msgs = [
      { role: 'system', content: 'You are a browser automation assistant. Continue the plan by outputting the next [ACTION] marker. Examples: "[INSPECT]" or "[TYPE] input[name=\"q\"] | hello" or "[CLICK] button". If the plan is complete, output nothing.' },
      { role: 'user', content: `Original request: ${historyContext.slice(-200)}\n\nLast executed: ${result}\n\nWhat is the single next action? Output just the marker or nothing if done.` },
    ]
    const reader = await chatWithProvider(provider, state.activeModel, msgs, null)
    const decoder = new TextDecoder()
    let r = ''
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      r += parseStreamChunk(provider, decoder.decode(value, { stream: true }))
    }
    return r
  } catch {
    return ''
  }
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


async function executeAction(action) {
  switch (action.type) {
    case 'navigate':
      await navigateTo(action.url, [])
      return `✅ Navigated to ${action.url}`
    case 'click': {
      const tab = await getActiveContentTab()
      if (!tab || !isValidUrl(tab?.url)) return `⚠️ Cannot click: page not ready`
      const r = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (s) => {
          const el = document.querySelector(s)
          if (el) { el.click(); return true }
          return false
        },
        args: [action.selector],
      })
      return r?.[0]?.result ? `✅ Clicked ${action.selector}` : `⚠️ Element not found: ${action.selector}`
    }
    case 'type': {
      const tab = await getActiveContentTab()
      if (!tab || !isValidUrl(tab?.url)) return `⚠️ Cannot type: page not ready`
      await typeInField(tab.id, action.selector, action.text || '', [])
      return `✏️ Typed message`
    }
    case 'read': {
      const tab = await getActiveContentTab()
      if (!tab || !isValidUrl(tab?.url)) return `⚠️ Cannot read: page not ready`
      const r = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => document.body.innerText.slice(0, 2000),
      })
      return `📄 ${r?.[0]?.result?.slice(0, 200) || 'Empty'}`
    }
    case 'inspect': {
      const tab = await getActiveContentTab()
      if (!tab || !isValidUrl(tab?.url)) return `⚠️ Cannot inspect: page not ready`
      const r = await inspectPage(tab.id)
      return `🔍 Page elements found`
    }
    case 'delegate':
      return `✅ Task delegated`
    default:
      return `⚠️ Unknown action: ${action.type}`
  }
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
