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
}
chrome.tabs.getSelected(null, getSelectedTab)