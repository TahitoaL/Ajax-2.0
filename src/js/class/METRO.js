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

export default class METRO {
    
}