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

  let get = function(url) {
    return new Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest()
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText)
          } else {
            reject(xhr)
          }
        }
      }
      xhr.open('GET', url, true)
      xhr.send()
    })
  }

let getTimes = async function (url) {
    let res = await get (url)
    return res
}

export default class METRO {

    constructor (name, line_id, station, sens, direction = undefined) {
        this.name = name
        this.id = line_id
        this.station = station
        this.sens = sens
        this.url = ''
        if (direction != undefined) {
            this.direction == direction
        }
        this.content = []
        this.lastRequest = []
        self = this
    }

    create () {
        this.url = 'https://toal.000webhostapp.com/transports/contents/getMetro.php?station=' + this.station + '&line=' + this.id + '&sens=' + this.sens
        this.direction != undefined ? this.url += '&direction=' + this.direction : this.url = this.url
        getTimes(this.url).then((result) => {
            console.log(JSON.parse(result))
            newElement('div', ['metro'], '', document.querySelector('.container'))
            newElement('div', [''])
        })
    }

}