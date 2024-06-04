import * as mapApi from '../map_api.js'

// set elems to be used
const ownerList = document.querySelector('.owner-list')

mapApi.fetchOwnerStats()
  .then(ownerStats => {
    ownerStats.forEach( ownerStat => {
      let ownerName = ownerStat.owner
      let ownerCount = ownerStat.count 
      let ownerDiv = document.createElement('div')
      let nameDiv = document.createElement('div')
      let countDiv = document.createElement('div')
      nameDiv.textContent = ownerName
      countDiv.textContent = ownerCount
      ownerDiv.className = 'owner-div'
      ownerDiv.appendChild(nameDiv)
      ownerDiv.appendChild(countDiv)
      ownerDiv.style.display = 'flex'
      ownerDiv.style.flexDirection = 'row'
      ownerDiv.style.justifyContent = 'space-between'

      ownerList.appendChild(ownerDiv)

    })
  })
