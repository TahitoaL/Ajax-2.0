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

    constructor (name, line_id, station, sens, direction = NULL) {
        this.name = name
        this.id = line_id
        this.station = station
        this.sens = sens
        if (direction != NULL) {
            this.direction == direction
        }
        this.content = []
        this.lastRequest = []
        self = this
    }

}