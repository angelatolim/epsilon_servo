import * as MapApi from "../map_api.js";

export function createStationElem(station) {
  let elem = document.createElement("div");
  elem.className = "station";

  let name = document.createElement("p");
  let address = document.createElement("p");
  let owner = document.createElement("p");

  name.textContent = station.name;
  address.textContent = station.address;
  owner.textContent = station.owner;

  elem.appendChild(owner);
  elem.appendChild(name);
  elem.appendChild(address);
  return elem;
}

export async function createCentreElem(map) {
  const currentCenter = map.getCenter();
  const mapCenter = document.querySelector(".map-centre");

  let lat = document.createElement("p");
  let lng = document.createElement("p");
  let lookupButton = document.createElement("button");
  let centreAddressDiv = document.createElement("div");

  lat.textContent = `lat: ${currentCenter.lat()}`;
  lng.textContent = `lng: ${currentCenter.lng()}`;
  lookupButton.textContent = "lookup address";
  lookupButton.dataset.lat = currentCenter.lat();
  lookupButton.dataset.lng = currentCenter.lng();

  lookupButton.addEventListener("click", handleGetAddress);

  function handleGetAddress(event) {
    let centre = event.target;

    MapApi.fetchAddress(centre.dataset.lat, centre.dataset.lng).then(
      (address) => {
        centreAddressDiv.textContent = address.results[0].formatted_address;
      }
    );
  }
  mapCenter.appendChild(lat);
  mapCenter.appendChild(lng);
  mapCenter.appendChild(centreAddressDiv);
  mapCenter.appendChild(lookupButton);
}
