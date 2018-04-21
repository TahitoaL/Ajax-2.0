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

let getStationInfos = async function (gfts) {
  let res = await get ('https://toal.000webhostapp.com/transports/contents/getStation.php?station=' + gfts)
  return res
}

let colors = {
  "1": '#FFCD00',
  "2": '#003CA6',
  "3": '#837902',
  "3B": "#6EC4E8",
  "4": '#CF009E',
  "5": "#FF7E2E",
  "6": "#6ECA97",
  "7": "#FA9ABA",
  "7B": "#6ECA97",
  "8": "#E19BDF",
  "9": "#B6BD00",
  "10": "#C9910D",
  "11": "#704B1C",
  "12": "#007852",
  "13": "#6EC4E8",
  "14": "#62259D"

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
    console.log(this.url)
    Promise.all([getTimes(this.url), getStationInfos(this.station)]).then((values) => {
      let results = []
      values.forEach((value) => {
        results.push(JSON.parse(value))
      })
      console.log(results)
      let line_id = results[1].line_id
      let metro = newElement('div', ['metro'], '', document.querySelector('.container'))

      // HEADER
      let header = newElement('div', ['metro__header'], '', metro)
      header.style.borderBottomColor = colors[String(line_id)]
      newElement('span', ['metro__header__icon'], '<img src="https://toal.000webhostapp.com/src/img/metro.svg" alt="Metro"><img src="https://toal.000webhostapp.com/transports/contents/img/' + line_id + '.svg" alt="Metro ' + line_id + '">', header)
      newElement('span', ['metro__header__station'], results[1].station_name , header)

      //BODY
      if (parseInt(results[0].infos.directionNumb) == 1){
        let body = newElement('div', ['metro__body'], '', metro)
        newElement('span', ['metro__body__dir'], results[0].infos.directionName, body)
        let schedules = newElement('span', ['metro__body__schedules'], '', body)
        let left = newElement('span', ['left'], '', schedules)
        results[0].schedules.forEach((schedule) => {
          if (parseInt(schedule) == -1){
            newElement('span', ['metro__body__schedules__time'], '0', left)
          } else if (schedule == "0") {
            newElement('span', ['metro__body__schedules__time', 'blink__time'], '0', left)
          } else if (schedule == '++') {
            newElement('span', ['metro__body__schedules__time', 'blink__time'], '++', left)
          } else {
            newElement('span', ['metro__body__schedules__time'], parseInt(schedule), left)
          }
        })
      } else if (parseInt(results[0].infos.directionNumb) == 2){
        let i = 0
        Object.entries(results[0].infos.directionName).forEach((direction) => {
          console.log(direction)
          i++
          let bodyClasses = i > 1 ? ['metro__body', 'top-bordered'] : ['metro__body']
          let body = newElement('div', bodyClasses, '', metro)
          newElement('span', ['metro__body__dir'], direction[1], body)
          let schedules = newElement('span', ['metro__body__schedules'], '', body)
          let left = newElement('span', ['left'], '', schedules)
          results[0].schedules.forEach((schedule) => {
            if (schedule[0] == direction[0]){
              if (parseInt(schedule[1]) == -1){
                newElement('span', ['metro__body__schedules__time'], '0', left)
              } else if (schedule[1] == "0") {
                newElement('span', ['metro__body__schedules__time', 'blink__time'], '0', left)
              } else if (schedule[1] == '++') {
                newElement('span', ['metro__body__schedules__time', 'blink__time'], '++', left)
              } else {
                newElement('span', ['metro__body__schedules__time'], parseInt(schedule[1]), left)
              }
            }
          })
        })
      }
    })
  }

}