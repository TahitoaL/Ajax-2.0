import {createNotification} from './notification.js'
import css from '../css/app.scss'

var dev = process.env.NODE_ENV == "development"
console.log(dev ? 'development' : 'production')


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

getUris('0').then(function() {
  console.log('requetes terminées')
})

document.querySelectorAll('button').forEach(function (button) {
  button.addEventListener('click', function (e) {
    e.preventDefault()
    console.log('Bonjour les enfants')
    createNotification(this.getAttribute('data-notification-type'), this.getAttribute('data-notification-text') == undefined ? this.innerHTML.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : this.getAttribute('data-notification-text'))
  })
})
