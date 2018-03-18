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

export var RER = {
  name: 'Bonjour',
  construct: function () {
    return RER
  },
  message: function (message) {
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
  },
  create: function(jsonFile) {
    var times = JSON.parse(jsonFile)
    let horaire = newElement('div', ['horaire'], "", document.getElementById('container'))
    let table__header = newElement('div', ['table__header'], "<img class='table__header__img' src='https://toal.000webhostapp.com/src/img/reragenrvb.svg' alt='RER A'><span class='table__header__dir'>Paris / Boissy-St-Léger / Marne-la-Vallée</span>", horaire)
    RER.tbody = newElement('tbody', ['a'], '', horaire)
    times.result.schedules.forEach(function (schedule) {
      RER.content.push(schedule)
      let tr = newElement('tr', ['a'], '', RER.tbody)
      newElement('td', ['code'], '<span><a class="mission" href="https://toal.000webhostapp.com/transports/contents/mission.php?mission=' + schedule.code + '">' + schedule.code + '</a></span>', tr)
      newElement('td', ['direction'], schedule.destination, tr)
      newElement('td', ['message'], RER.message(schedule.message), tr)
    })
    return times
  },
  refresh: function () {
    console.log('mise a jour des infos du RER')
  },
  content: []
}

// var RER = class RER {
//   constructor(name){
//     this.name = name
//   }
// // }
//
// module.exports = RER
