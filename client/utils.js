export default function createStationElem(station) {
  let elem = document.createElement('div')
  elem.className = 'station'

  let name = document.createElement('p')
  let address = document.createElement('p')
  let owner = document.createElement('p')

  name.textContent = station.name
  address.textContent = station.address
  owner.textContent = station.owner

  elem.appendChild(owner)
  elem.appendChild(name)
  elem.appendChild(address)
  return elem
}