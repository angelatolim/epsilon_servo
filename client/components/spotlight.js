import * as MapApi from "../map_api.js";
import { getMap } from "./map.js";
import * as Utils from "../utils.js";

const spotlightDiv = document.querySelector(".spotlight-content");
const refreshBtn = document.querySelector(".refresh-btn");

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
  }

  const addressDiv = document.createElement("div");
  addressDiv.innerHTML = data.address;
  addressDiv.className = "address-div";

  spotlightDiv.appendChild(nameLink);
  spotlightDiv.appendChild(addressDiv);
}
