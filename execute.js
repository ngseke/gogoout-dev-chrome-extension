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
    Array.from(document.querySelectorAll('input')).forEach(el=> {
      el.style.display = 'block'
    })
  },
  showImg: () => {
    Array.from(document.querySelectorAll('img')).forEach(el=> {
      const src = el.getAttribute('src')
      el.setAttribute('src', src.replace('gogooutlaravel.data', 'gogoout.com'))
    })
  },
  toLocal: () => {
    replaceHost('//gogooutlaravel.data')
  },
  toZhengshiqu: () => {
    replaceHost('//gogoout.com')
  },
  toCeshuiqu: () => {
    replaceHost('//test.gogoout.com')
  }
}

const directTo = (url) => location.href = url

function replaceHost (newHost) {
  const { host, pathname, search } = window.location

  if (['gogooutlaravel.data', 'gogoout.com'].some(i => host.includes(i))) {
    directTo(newHost + pathname + search)
  } else {
    directTo(newHost)
  }
}

const onMessage = ({ action, href }) => {
  if (href) directTo(href)
  else actions[action]()
}

chrome.runtime.onMessage.addListener(onMessage)

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const cookieCloseBtn = document.querySelector('.cookieinfo .cookieinfo-close')
    if (cookieCloseBtn) cookieCloseBtn.click()
  }, 1000)

  // 自動登入 systemAdmin
  if (location.pathname === '/systemAdmin/login') {
    chrome.storage.sync.get(['systemAdminEmail', 'systemAdminPassword', 'autoLoginSystemAdmin'], ({ systemAdminEmail, systemAdminPassword, autoLoginSystemAdmin }) => {
      if (systemAdminEmail && systemAdminPassword && autoLoginSystemAdmin) {
        document.querySelector('#inputEmail3').value = systemAdminEmail
        document.querySelector('#inputPassword3').value = systemAdminPassword
        document.querySelector('[type=submit]').click()
      }
    })
  }
})