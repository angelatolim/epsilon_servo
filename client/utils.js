import * as MapApi from "../map_api.js";
import { getMap } from "./components/map.js";

export function createStationElem(station) {
  let elem = document.createElement("div");
  elem.className = "station";
  elem.dataset.lat = station.latitude;
  elem.dataset.lng = station.longitude;

  const latLng = {
    lat: station.latitude,
    lng: station.longitude,
  };

  elem.addEventListener('click', (event) => {
    getMap().setCenter(latLng);
  })

  let textDiv = document.createElement("div");
  textDiv.className = "nearest-text-div";
  let iconDiv = document.createElement("div");
  iconDiv.className = "icon-text-div";
  let name = document.createElement("p");
  let address = document.createElement("p");
  let owner = document.createElement("img");
  let distance = Math.round(Number(station.distance));
  let distanceString = `${distance} m`;
  let distanceDiv = document.createElement("div");
  distanceDiv.textContent = distanceString;
  distanceDiv.className = "nearest-distance-div";

  name.textContent = station.name;
  address.textContent = station.address;

  owner.className = "nearest-icon";

  switch (station.owner) {
    case "Caltex":
      owner.src = "../images/caltex-icon.png";
      break;
    case "Shell":
      owner.src = "../images/shell-icon.png";
      break;
    case "7-Eleven Pty Ltd":
      owner.src = "../images/7-eleven-icon.png";
      break;
    case "Ampol":
      owner.src = "../images/ampol-icon.png";
      break;
    case "BP":
      owner.src = "../images/bp-icon.png";
      break;
    case "United":
      owner.src = "../images/united-icon.png";
      break;
    default:
      owner.src = "../images/fuel-icon.png";
  }

  iconDiv.appendChild(owner);
  textDiv.appendChild(name);
  textDiv.appendChild(address);
  elem.appendChild(iconDiv);
  elem.appendChild(textDiv);
  elem.appendChild(distanceDiv);
  return elem;
}

export async function createCentreElem(map) {
  const currentCenter = map.getCenter();
  const mapCenter = document.querySelector(".map-centre");
  mapCenter.innerHTML = "";
  let lat = document.createElement("p");
  let lng = document.createElement("p");
  let lookupButton = document.createElement("button");
  let centreAddressDiv = document.createElement("div");

  centreAddressDiv.className = "centre-address-div";
  lat.textContent = `lat: ${currentCenter.lat()}`;
  lat.className = "map-centre-lat";
  lng.textContent = `lng: ${currentCenter.lng()}`;
  lng.className = "map-centre-lng";
  lookupButton.textContent = "Search Address";
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
  centreAddressDiv.appendChild(lat);
  centreAddressDiv.appendChild(lng);
  mapCenter.appendChild(centreAddressDiv);
  mapCenter.appendChild(lookupButton);
}

export async function createMarker(
  station,
  AdvancedMarkerElement,
  spotlight = null
) {
  const lat = Number(station.latitude);
  const lng = Number(station.longitude);

  const position = {
    lat: lat,
    lng: lng,
  };
  const markerImg = document.createElement("img");
  markerImg.className = "marker";

  switch (station.owner) {
    case "Caltex":
      markerImg.src = "../images/caltex.png";
      break;
    case "Shell":
      markerImg.src = "../images/shell.png";
      break;
    case "7-Eleven Pty Ltd":
      markerImg.src = "../images/7-eleven.png";
      break;
    case "Ampol":
      markerImg.src = "../images/ampol.png";
      break;
    case "BP":
      markerImg.src = "../images/bp.png";
      break;
    case "United":
      markerImg.src = "../images/united.png";
      break;
    default:
      markerImg.src = "../images/fuel.png";
  }

  const marker = new AdvancedMarkerElement({
    map: getMap(),
    position: position,
    title: station.name,
    content: markerImg,
  });

  const name = station.name;
  const address = station.address;
  const owner = station.owner;

  const contentString = `<div id="content">
    <h1>${name}</h1>
    <p>${address}</p>
    <p>${owner}</p>
    <p>${lat.toFixed(6)}</p>
    <p>${lng.toFixed(6)}</p>
    <button class="save-btn" data-id=${station.id}>Save</button>
  </div>
  `;
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
    // ariaLabel: "NAME"
  });
  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
    });
  });
  
  google.maps.event.addListener(infowindow, 'domready', function() {
    
    const saveBtns = document.querySelectorAll('.save-btn')

    saveBtns.forEach(saveBtn => 
      saveBtn.addEventListener('click', (event) => {
        console.log('clicked')
        console.log(saveBtn)
        console.log(saveBtn.dataset.id)
        let id = Number(saveBtn.dataset.id)
        MapApi.saveStation(id)
        .then(result => console.log(result))

        // console.log(dataset.id)
  
      })
  )})

}

export async function populateStationList(event) {
  const currentCenter = getMap().getCenter();
  const latitude = currentCenter.lat();
  const longitude = currentCenter.lng();
  const radius = 100000;
  const stationList = document.querySelector(".station-list");

  MapApi.fetchNearest(latitude, longitude, radius).then((stations) => {
    stations.forEach((station) => {
      let stationElem = createStationElem(station);
      stationList.appendChild(stationElem);
    });
  });
}