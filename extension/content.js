// Content script for page interaction
// Allows the extension to read page content and interact with the DOM

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.type) {
    case 'get-page-content':
      sendResponse({
        title: document.title,
        url: window.location.href,
        text: document.body.innerText.slice(0, 100000),
        html: document.body.innerHTML.slice(0, 200000),
      })
      break
    case 'click-selector': {
      const el = document.querySelector(msg.selector)
      if (el) { el.click(); sendResponse({ success: true }) }
      else sendResponse({ success: false, error: 'Element not found' })
      break
    }
    case 'fill-input': {
      const el = document.querySelector(msg.selector)
      if (el) {
        el.value = msg.text
        el.dispatchEvent(new Event('input', { bubbles: true }))
        el.dispatchEvent(new Event('change', { bubbles: true }))
        sendResponse({ success: true })
      } else sendResponse({ success: false, error: 'Element not found' })
      break
    }
    case 'extract-data': {
      const els = document.querySelectorAll(msg.selector)
      const data = Array.from(els).map(el => msg.attribute ? el.getAttribute(msg.attribute) : el.textContent)
      sendResponse({ success: true, data })
      break
    }
    default:
      sendResponse({ error: 'Unknown content message type' })
  }
  return true
})
