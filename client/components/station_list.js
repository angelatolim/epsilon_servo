import * as mapApi from '../map_api.js'
import createStationElem from '../utils.js'

// set elems to be used
const stationList = document.querySelector('.station-list')

mapApi.fetchTen()
  .then(stations => {
    stations.forEach( station => {
      let stationElem = createStationElem(station)
      stationList.appendChild(stationElem)
    })
})


// functions