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
    chrome.storage.sync.get(name, value => el.value = value[name] ?? '')
    el.addEventListener('change', ({ target }) => {
      console.log(target.value.trim())
      chrome.storage.sync.set({ [name]: target.value.trim() })
    })
  })
}
chrome.tabs.getSelected(null, getSelectedTab)