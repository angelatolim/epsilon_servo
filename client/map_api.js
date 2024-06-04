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