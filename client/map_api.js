export async function fetchStations() {
  let res = await fetch(`/api/stations/all`);
  let stations = await res.json();
  return stations;
}

export async function fetchNearest(latitude, longitude, radius) {
  let res = await fetch(`/api/stations/nearest?latitude=${latitude}&longitude=${longitude}&radius=${radius}`);
  let stations = await res.json();
  return stations;
}

export async function fetchOwnerStats() {
  let res = await fetch("/api/stats");
  let ownerStats = await res.json();
  return ownerStats;
}

export async function fetchRandomOwner() {
  let res = await fetch("/api/stations/random");
  let randomOwner = await res.json();
  return randomOwner;
}

export async function fetchBounds(array) {
  let res = await fetch(`/api/stations/bounds?NWLat=${array[0]}&NWLng=${array[1]}&SELat=${array[2]}&SELng=${array[3]}`);
  let bounds = await res.json();
  return bounds;
}

export async function fetchAddress(lat, lng) {
  let res = await fetch(`/api/centre?lat=${lat}&lng=${lng}`);
  let address = await res.json();
  return address;
}

export async function saveStation(id) {
  let res = await fetch(`/api/stations/${id}/save`, {method: "PUT"})
  let saved = await res.json()
  return saved
}


export async function fetchFavourites() {
  let res = await fetch(`/api/stations/saved`)
  let saved = await res.json()
  return saved
}

