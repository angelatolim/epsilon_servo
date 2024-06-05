import * as MapApi from "../map_api.js";
import { getMap } from "./map.js";

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

  function handleLink(event) {
    const latLng = {
      lat: data.latitude,
      lng: data.longitude,
    };
    getMap().setCenter(latLng);
  }

  const addressDiv = document.createElement("div");
  addressDiv.innerHTML = data.address;
  addressDiv.className = "address-div";

  spotlightDiv.appendChild(nameLink);
  spotlightDiv.appendChild(addressDiv);
}
