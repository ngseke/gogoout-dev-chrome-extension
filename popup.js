var getSelectedTab = (tab) => {
  var tabId = tab.id;
  var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj)
 
  var handler = function ({ target }) {
    const { action, href } = target.dataset
    
    sendMessage({ action, href })
  }
  
  document.addEventListener('click', function (e) {
    for (var target = e.target; target && target != this; target = target.parentNode) {
      if (target.matches('button')) {
        handler.call(target, e)
        break
      }
    }
  }, false)

  const $fields = [...document.querySelectorAll('input')]

  $fields.forEach(el => {
    const name = el.getAttribute('name')
    
    // 填值回欄位
    chrome.storage.sync.get(name, value => {
      ({
        text: () => el.value = value[name] ?? '',
        checkbox: () => el.checked = value[name] ?? false,
      })[el.getAttribute('type') ?? 'text']()
    })
    // 監聽欄位變動時存檔
    el.addEventListener('change', ({ target }) => {
      let value = {
        text: target.value.trim(),
        checkbox: target.checked,
      }[target.getAttribute('type') ?? 'text']

      chrome.storage.sync.set({ [name]: value })
    })
  })
}
chrome.tabs.getSelected(null, getSelectedTab)