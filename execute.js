const actions = {
  fill: () => {
    var 卡 = document.querySelector.bind(document)
    ;`4000-2211-1111-1111`.split('-').forEach((_, i) => 卡(`#card_${i+1}`).value = _)
    var 欄位 = { '#expire_m': '01', '#expire_y': '30', '[name=cvc]':'817' }
    Object.keys(欄位).forEach(_ => 卡(_).value = 欄位[_])
    卡('[name=confirm_order]').checked = true
    卡('#confirm_send_order').click()
  },
  showHidden: () => {
    Array.from(document.querySelectorAll('input[type=hidden]')).forEach(el=> {
      el.setAttribute('type', 'text')
    })
  },
  showImg: () => {
    Array.from(document.querySelectorAll('img')).forEach(el=> {
      const src = el.getAttribute('src')
      el.setAttribute('src', src.replace('gogooutlaravel.data', 'gogoout.com'))
    })
  },
  toggleLang: () => {
    
  }
}

const onMessage = (message) => actions[message.action]()

chrome.runtime.onMessage.addListener(onMessage)