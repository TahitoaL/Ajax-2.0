export function createNotification (type, text) {
  let newElement = function (type, classes, content, parent) {
    let el = document.createElement(type)
    classes.forEach(function (cl) {
      el.classList.add(cl)
    })
    if (content != "") {
      el.innerHTML = content
    }
    parent.appendChild(el)
    return el
  }
  var notifications = document.querySelectorAll('.notifications')
  if (notifications.length == 0 && notifBox != "") {
     var notifBox = newElement('div', ['notifications'], "", document.body)
  } else {
    var notifBox = notifications[0]
  }
  let types = ['success', 'error', 'info']
  let titles = ['Succès', 'Erreur', 'Info']
  let box = newElement('div', ['notification', 'notification-' + type], "", notifBox)
  let title = newElement('span', ['notification__title'], titles[types.indexOf(type)] != undefined ? titles[types.indexOf(type)] : 'Notif', box)
  let content = newElement('span', ['notification__content'], text, box)
  let close = newElement('span', ['notification__close'], '<a href="#">X</a>', box)
  let progress_bar = newElement('span', ['notification__progress_bar'], '', box)
  var closed = false
  close.addEventListener('click', function (e) {
    e.preventDefault()
    closed = true
    box.parentNode.removeChild(box)
    clearTimeout(timer)
  }, false)
  let timer = setTimeout(function () {
    box.setAttribute('style', 'animation-play-state: paused;')
    setTimeout(function () {
      box.setAttribute('style','animation-play-state: running;')
      setTimeout(function () {
        if (closed == false) {
          box.parentNode.removeChild(box)
        }
      }, 500)
    }, 4000)
  }, 500)
}
