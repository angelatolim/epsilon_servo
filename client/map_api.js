export async function fetchStations() {
    let res = await fetch(`/api/stations/all`)
    let stations = await res.json()
    return stations
}

export async function fetchTen() {
  let res = await fetch('/api/stations')
  let stations = await res.json()
  return stations
}

export async function fetchOwnerStats() {
  let res = await fetch('/api/stats')
  let ownerStats = await res.json()
  return ownerStats
}

export async function fetchRandomOwner() {
  let res = await fetch('/api/stations/random')
  let randomOwner = await res.json()
  return randomOwner
}