import {createNotification} from './notification.js'
import RER from './class/RER'
import css from '../css/app.scss'


var RerA = new RER ('RerA')
console.log(RerA)

// console.log(RerA.message('17:04 Voie A'))

// console.log(RerA.create('{ "result": { "schedules": [ { "code": "NEMO", "message": "21:47 Voie 1", "destination": "Boissy-Saint-Leger" }, { "code": "QURE", "message": "21:53 Voie 1", "destination": "Marne-la-Vallee Chessy" }, { "code": "NEMO", "message": "22:00 Voie 1", "destination": "Boissy-Saint-Leger" }, { "code": "OPUS", "message": "22:08 Voie 1", "destination": "Torcy" }, { "code": "NEMO", "message": "22:16 Voie 1", "destination": "Boissy-Saint-Leger" }, { "code": "QURE", "message": "22:23 Voie 1", "destination": "Marne-la-Vallee Chessy" } ] }, "_metadata": { "call": "GET /schedules/rers/A/la+defense+%28grande+arche%29/R", "date": "2018-03-25T21:46:21+02:00", "version": 3 } }'))


var get = function(url) {
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

var getRequest = async function () {
  var response = await get('https://toal.000webhostapp.com/transports/contents/horaires.php')
  let ret = JSON.parse(response)
  return ret
}

var getUris = async function (sens) {
  let horaires = await getRequest()
  let times = {}
  times.rer = []
  times.bus = []
  times.metro = []
  horaires.forEach(function (horaire) {
    if (horaire.type == "RER" && sens == horaire.trajet) {
      times.rer.push('https://toal.000webhostapp.com/transports/contents/horaire_ajax_rer.php?ligne=' + horaire.ligne + '&station=' + horaire.station + '&sens=' + horaire.sens)
    } else if (horaire.type == "BUS" && sens == horaire.trajet) {
      times.bus.push('https://toal.000webhostapp.com/transports/contents/horaire_ajax_bus.php?ligne=' + horaire.ligne + '&station=' + horaire.station + '&sens=' + horaire.sens)
    } else if (horaire.type == "METRO" && sens == horaire.trajet) {
      times.metro.push('https://toal.000webhostapp.com/transports/contents/horaire_ajax_metro.php?ligne=' + horaire.ligne + '&station=' + horaire.station + '&sens=' + horaire.sens)
    }
  })
  console.log('fin de la création')
  return times
}

var getSchedules = async function (sens) {
  let response = await getUris(sens)
  RerA.url = response.rer
  response.rer.forEach(async function (url) {
    let schedule = await get(url)
    // RerA.create(schedule)
    RerA.createTable()
    createNotification('success', 'Les requetes ont été effectuées avec succès')

  })
  // response.bus.forEach(async function (url) {
  //   let schedule = await get(url)
  //   console.log(schedule)
  // })
  // response.metro.forEach(async function (url) {
  //   let schedule = await get(url)
  //   console.log(schedule)
  // })
  console.log('RerA')
  return response
}

getSchedules('0').then(function (results) {
  console.log('results')
  setInterval(function () {
    if (RerA.created) {
      // RerA.refresh()
      RerA.newLine()
      console.log(RerA.lastRow)
      if (RerA.lastRow % 2 == 0){
        RerA.fill(RerA.lastRow, 'TAXI', 'Train à quai')
      }
      console.log('NOUVEAU')
    }
  }, 10000)
})

document.querySelectorAll('button').forEach(function (button) {
  button.addEventListener('click', function (e) {
    e.preventDefault()
    createNotification(this.getAttribute('data-notification-type'), this.getAttribute('data-notification-text') == undefined ? this.innerHTML.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : this.getAttribute('data-notification-text'))
  })
})
