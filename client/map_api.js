export async function fetchStations() {
    let res = await fetch(`/api/stations/all`)
    let stations = await res.json()
    return stations
}

const MapApi = {
    fetchStations
}