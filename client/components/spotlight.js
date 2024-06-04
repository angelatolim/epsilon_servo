import * as MapApi from '../map_api.js'

const spotlightDiv = document.querySelector('.spotlight')

MapApi.fetchRandomOwner()
    .then(randomOwner => {
        console.log(randomOwner)
        const name = randomOwner.name
        const address = randomOwner.address

        const nameDiv = document.createElement('div')
        nameDiv.innerHTML = name 
        nameDiv.classname = 'name-div'
        
        const addressDiv = document.createElement('div')
        addressDiv.innerHTML = address
        addressDiv.className = 'address-div'
        
        spotlightDiv.appendChild(nameDiv)
        spotlightDiv.appendChild(addressDiv)

    }
    )

// function renderSpotlight() {

// }    