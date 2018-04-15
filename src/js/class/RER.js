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
    return true
  } else {
    console.log('Aucun changement détecté')
    return false
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
    this.html = ''
    this.tbody = ''
    this.content = []
    this.created = false
    this.first = 0
    this.lastRow = 0
    this.lastRequest = []
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
    var horaire = newElement('div', ['horaire'], "", document.getElementById('container'))
    let table__header = newElement('div', ['table__header'], "<img class='table__header__img' src='https://toal.000webhostapp.com/src/img/reragenrvb.svg' alt='RER A'><span class='table__header__dir'>Paris / Boissy-St-Léger / Marne-la-Vallée</span>", horaire)
    let table__body = newElement('div',  ['table__body'], '', horaire)
    let table__container = newElement('div', ['table__container'], '', table__body)
    var tbody = newElement('tbody', ['a'], '', table__container)
    this.tbody = tbody
    for (let i = 0; i < 5; i++) {
      this.createLine()
    }
    this.html = horaire
  }

  createLine () {
    let classes = []
    if (this.lastRow % 2 == 0) {
      classes.push('pair')
    }
    let tr = newElement ('tr', classes, '', this.tbody)
    tr.setAttribute('data-line-number', this.lastRow)
    tr.id = 'line-number-' + this.lastRow
    this.lastRow++
    let code = newElement('td', ['code'], '<span><a class="mission" href="https://toal.000webhostapp.com/transports/contents/mission.php?mission="UBER">UBER</a></span>', tr)
    let direction = newElement('td', ['direction'], this.getTerminus('UBER'), tr)
    let message = newElement('td', ['message'], '', tr)
  }

  newLine () {
    this.createLine()
    var table = this.html.querySelector('.table__container')
    table.classList.add('slide')
    setTimeout(function () {
      let numDel = parseInt(self.lastRow) - 6
      let idDel = '#line-number-' + numDel
      let toDel = document.querySelector(idDel)
      self.tbody.removeChild(toDel)
      table.classList.remove('slide')
    }, 2000)
  }

  fill (line, mission, message, save = true) {
    let tr = document.querySelector('#line-number-' + line)
    let code = tr.querySelector('td.code')
    code.innerHTML = '<span><a class="mission" href="https://toal.000webhostapp.com/transports/contents/mission.php?mission=' + mission + '">' + mission + '</a></span>'
    let direction = tr.querySelector('td.direction')
    direction.innerHTML = this.getTerminus(mission)
    let mes = tr.querySelector('td.message')
    mes.innerHTML = this.message(message)
    if (save == true) {
      this.content.push({
        code: mission,
        message: message
      })
    }
  }

  firstFill (schedules) {
    var schedI = 0
    schedules.forEach(function (schedule) {
      if (schedI < 5) {
        self.fill(schedI, schedule.code, schedule.message)
        schedI++
      }
    })

    this.created = true
    this.autoRefresh()
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
        self.lastRequest = response.result.schedules
        let hasChanged = compare(response.result.schedules[0], self.content[self.first])
        if (hasChanged) {
          self.newLine()
          self.fill(self.lastRow - 1, response.result.schedules[4].code, response.result.schedules[4].message)
          // self.first++
          console.log(self.content)
          self.content.shift()
          // self.content.push(self.lastRequest[5])
          console.log(self.content)
        }
        self.update(response.result.schedules)
        // console.log(result)
      })
      // this.mission()
    } else {
    }
  }

  autoRefresh () {
    setInterval(function () {
      console.log('Vérification de nouveaux trains')
      self.refresh()
    }, 15000)
  }

  update (newSchedule) {
    let firstRow = this.lastRow - 5
    console.log(self.content)
    console.log(newSchedule)
    for (let i = 0; i < 5; i++) {
      if (self.content[i].code == newSchedule[i].code) {
        console.log(self.content[i])
        console.log(newSchedule[i])
        if (self.content[i].message != newSchedule[i].message) {
          console.log('LE MESSAGE A CHANGE')
          self.fill(self.lastRow + i - 5, newSchedule[i].code, newSchedule[i].message, false)
          self.content[i] = newSchedule[i]
        }
      } else {
        console.log('code erreur')
      }
    }
  }

}
