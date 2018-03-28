// import { get } from './get'

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
  let res = await get(url)
  return res
}


export default class RER {

  constructor (name) {
    this.name = name
    this.url = ''
    this.tbody = ''
    this.content = []
    this.created = false
    this.first = 0
  }

  message (message) {
    let exp = message.split(':')
    let exp2 = message.split(' ')
    if (exp[0].length == 2 && exp2[0].length == 5 && exp2[1].length > 0) {
      var response = "<span class='message__content'><span class='message__time'>" + exp2[0] + "</span><span class='voie'>" // On a une date et un message
      for (var i = 1; i < exp2.length; i++) {
        response += exp2[i] + ' '
      }
      response += "</span></span>"
    } else if (exp2[1] == undefined) {
      response = "<span class='message__content'><span class='message__time'> " + message + "</span><span class='voie'></span></span>" // On a une date
    } else if (exp[1] == undefined) {
      response = "<span class='message__content'><span class='voie' style='position: relative;'>"+ message+ "</span></span>";
    }
    return response
  }

  create (jsonFile) {
    var times = JSON.parse(jsonFile)
    let horaire = newElement('div', ['horaire'], "", document.getElementById('container'))
    let table__header = newElement('div', ['table__header'], "<img class='table__header__img' src='https://toal.000webhostapp.com/src/img/reragenrvb.svg' alt='RER A'><span class='table__header__dir'>Paris / Boissy-St-Léger / Marne-la-Vallée</span>", horaire)
    var tbody = newElement('tbody', ['a'], '', horaire)
    this.tbody = tbody
    for (var i = 0; i < 5; i++) {
      this.content.push(times.result.schedules[i])
    }
    console.log(this.content)
    this.mission()
    this.refresh()
    this.created = true
    return times
  }

  mission () {
    document.querySelectorAll('.mission').forEach(function (mission) {
      mission.addEventListener('click', function (e) {
        e.preventDefault()
      })
    })
  }

  push (schedule) {
    this.content.push(schedule)
    let tr = newElement('tr', ['a'], '', this.tbody)
    newElement('td', ['code'], '<span><a class="mission" href="https://toal.000webhostapp.com/transports/contents/mission.php?mission=' + schedule.code + '">' + schedule.code + '</a></span>', tr)
    newElement('td', ['direction'], schedule.destination, tr)
    newElement('td', ['message'], this.message(schedule.message), tr)
  }

  compare (newContent) {
    if (newContent[0].code != this.content.code[this.first]) {
      console.log('Changement détecté')
    } else {
      console.log('Aucun changement détecté')
    }
  }

  refresh () {
    if (this.url.length > 0) {
      // console.log(this.url)
      getTimes(this.url).then(function (result) {
        console.log('OKKKK')
        console.log(result)
      })
      // this.push({code: 'UBER', destination: 'Courbevoie', message: '06:45 Voie C'})
      // this.mission()
    } else {
      console.log('url vide')
    }
  }

}
