let newElement = function (type, classes, content, parent, create = true) {
    let el = document.createElement(type)
    classes.forEach(function (cl) {
      el.classList.add(cl)
    })
    if (content != "") {
      el.innerHTML = content
    }
    if (create == true){
      parent.appendChild(el)
    }
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

let getScheduleHTML = function (schedule, parent, create = true) {
  if (parseInt(schedule) == -1){
    var elem = newElement('span', ['metro__body__schedules__time'], '0', parent, create == true ? true : false)
  } else if (schedule == "0") {
    var elem = newElement('span', ['metro__body__schedules__time', 'blink__time'], '0', parent, create == true ? true : false)
  } else if (schedule == '++') {
    var elem = newElement('span', ['metro__body__schedules__time', 'blink__time'], '++', parent, create == true ? true : false)
  } else {
    var elem = newElement('span', ['metro__body__schedules__time'], parseInt(schedule), parent, create == true ? true : false)
  }
  return [elem, schedule]
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
      this.dirNumb = 0
      this.content = []
      this.contentElement = []
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
          let time = getScheduleHTML(schedule, left)
          this.contentElement.push(time[0])
          this.content.push(time[1])
          this.dirNumb = 1
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
              let time = getScheduleHTML(schedule[1], left)
              this.contentElement.push(time[0])
              this.content.push(time[1])
              this.dirNumb = 2
            }
          })
        })
      }
      console.log(this.content)
      console.log(this.contentElement)
      this.autoUpdate()
    })
  }

  autoUpdate () {
    setInterval(() => {
      this.update()
    }, 10000)
  }

  update(){
    console.log('UPDATE')
    getTimes(this.url).then((results) => {
      console.log(results)
      let i = 0
      JSON.parse(results).schedules.forEach((result) => {
        console.log(result)
        console.log(this.content[i])
        console.log(result != this.content[i] ? 'a changé' : 'n\'a pas changé')
        if(result != this.content[i] && this.dirNumb == 1){
          if(this.content[i] == '-1'){

          } else {
            let time = getScheduleHTML(result, this.contentElement[i].parentNode, false)
            this.contentElement[i] = time[0]
            this.content[i] = time[1]
          }
        }
        i++
      })
    })
  }

  newSchedule () {

  }

}