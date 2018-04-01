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

let compare = function (newContent, oldContent) {
  if (newContent.code != oldContent.code) {
    console.log('Changement détecté')
  } else {
    console.log('Aucun changement détecté')
  }
}

var terminus = {
  'A': 'Achères-Grand-Cormier',
  'B': 'La Défense',
  'C': 'Auber',
  'D': 'Noisy-le-Grand',
  'E': 'Joinville-le-Pont',
  'G': 'Charles-de-Gaulle - Etoile',
  'H': 'Nation',
  'I': 'Achères-Ville',
  'M': 'Chatelêt-les-Halles',
  'N': 'Boissy-Saint-Léger',
  'O': 'Torcy',
  'Q': 'Marne-la-Vallée',
  'R': 'La Varennes - Chennevrières',
  'S': 'Val de Fontenay',
  'T': 'Poissy',
  'U': 'Cergy-le-Haut',
  'V': 'Sartrouville',
  'W': '**Vide Voyageur**',
  'X': 'Le Vésinet - Le Pecq',
  'Y': 'Reuil-Malmaison',
  'Z': 'Saint-Germain-en-Laye'
};


export default class RER {

  constructor (name) {
    this.name = name
    this.url = ''
    this.tbody = ''
    this.content = []
    this.created = false
    this.first = 0
    this.lastRow = 0
    self = this
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

  createTable () {
    let horaire = newElement('div', ['horaire'], "", document.getElementById('container'))
    let table__header = newElement('div', ['table__header'], "<img class='table__header__img' src='https://toal.000webhostapp.com/src/img/reragenrvb.svg' alt='RER A'><span class='table__header__dir'>Paris / Boissy-St-Léger / Marne-la-Vallée</span>", horaire)
    var tbody = newElement('tbody', ['a'], '', horaire)
    this.tbody = tbody
    for (let i = 0; i < 5; i++) {
      this.createLine()
    }
    this.fill(1, 'TAXI', "Train à quai")
  }

  createLine () {
    let tr = newElement ('tr', ['a'], '', this.tbody)
    tr.setAttribute('data-line-number', this.lastRow)
    tr.id = 'line-number-' + this.lastRow
    this.lastRow++
    let code = newElement('td', ['code'], '<span><a class="mission" href="https://toal.000webhostapp.com/transports/contents/mission.php?mission="UBER">UBER</a></span>', tr)
    let direction = newElement('td', ['direction'], this.getTerminus('UBER'), tr)
    let message = newElement('td', ['message'], '', tr)
  }

  fill (line, mission, message) {
    let tr = document.querySelector('#line-number-' + line)
    let code = tr.querySelector('td.code')
    code.innerHTML = '<span><a class="mission" href="https://toal.000webhostapp.com/transports/contents/mission.php?mission="' + mission + '">' + mission + '</a></span>'
    let direction = tr.querySelector('td.direction')
    direction.innerHTML = this.getTerminus(mission)
    let mes = tr.querySelector('td.message')
    console.log(message)
    mes.innerHTML = this.message(message)
  }

  create (jsonFile) {
    var times = JSON.parse(jsonFile)
    let horaire = newElement('div', ['horaire'], "", document.getElementById('container'))
    let table__header = newElement('div', ['table__header'], "<img class='table__header__img' src='https://toal.000webhostapp.com/src/img/reragenrvb.svg' alt='RER A'><span class='table__header__dir'>Paris / Boissy-St-Léger / Marne-la-Vallée</span>", horaire)
    var tbody = newElement('tbody', ['a'], '', horaire)
    this.tbody = tbody
    for (var i = 0; i < times.result.schedules.length; i++) {
      this.push(times.result.schedules[i])
    }
    this.mission()
    this.refresh()
    this.created = true
    return times
  }

  getTerminus (code) {
    let firstChar = code.charAt(0)
    console.log(terminus)
    let lastStation = terminus[firstChar]
    return lastStation
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
    newElement('td', ['direction'], this.getTerminus(schedule.code), tr)
    newElement('td', ['message'], this.message(schedule.message), tr)
  }

  refresh () {
    if (this.url.length > 0) {
      getTimes(this.url).then(function (result) {
        let response = JSON.parse(result)
        console.log(response.result.schedules[0])
        compare(response.result.schedules[0], self.content[self.first])
        console.log('OKKKK')
        // console.log(result)
      })
      // this.mission()
    } else {
      console.log('url vide')
    }
  }

  update () {
    console.log('update...')
  }

}
