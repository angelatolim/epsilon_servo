import * as MapApi from "../map_api.js";
import { getMap } from "./map.js";
import * as Utils from "../utils.js";

const spotlightDiv = document.querySelector(".spotlight-content");
const refreshBtn = document.querySelector(".refresh-btn");

const stationList = document.querySelector(".station-list");

renderSpotlight();

refreshBtn.addEventListener("click", renderSpotlight);

async function getRandom() {
  const randomOwner = await MapApi.fetchRandomOwner();
  return randomOwner;
}

async function renderSpotlight() {
  spotlightDiv.innerHTML = "";

  let data = await getRandom();

  const nameLink = document.createElement("a");
  nameLink.textContent = data.name;
  nameLink.className = "name-link";
  nameLink.addEventListener("click", handleLink);

  let iconDiv = document.createElement("div")
  iconDiv.className = "spotlight-icon-div"
  let owner = document.createElement("img");

  owner.className = "spotlight-icon";

  switch (data.owner) {
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

  iconDiv.appendChild(owner)

  async function handleLink(event) {
    const latLng = {
      lat: data.latitude,
      lng: data.longitude,
    };
    getMap().setCenter(latLng);
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const lat = Number(data.latitude);
    const lng = Number(data.longitude);

    const markerImg = document.createElement("img");
    markerImg.className = "marker";

    switch (data.owner) {
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
      position: latLng,
      title: data.name,
      content: markerImg,
    });

    const name = data.name;
    const address = data.address;
    const owner = data.owner;

    const contentString = `<div id="content">
      <h1>${name}</h1>
      <p>${address}</p>
      <p>${owner}</p>
      <p>${lat.toFixed(6)}</p>
      <p>${lng.toFixed(6)}</p>
      <button>Save</button>
    </div>
    `;
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      // ariaLabel: "NAME"
    });

    infowindow.open({
      anchor: marker,
      map: getMap(),
    });

    Utils.createCentreElem(getMap());
    
  }

  const addressDiv = document.createElement("div");
  addressDiv.innerHTML = data.address;

  addressDiv.className = "address-div";
  const spotlightText = document.createElement('div')
  spotlightText.className = 'spotlight-text-div'

  spotlightText.appendChild(nameLink);
  spotlightText.appendChild(addressDiv);
  spotlightDiv.appendChild(iconDiv)
  spotlightDiv.appendChild(spotlightText)
}
