
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

module.exports = getUris
