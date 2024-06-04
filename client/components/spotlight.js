import * as MapApi from "../map_api.js";

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

  const nameDiv = document.createElement("div");
  nameDiv.innerHTML = data.name;
  nameDiv.classname = "name-div";

  const addressDiv = document.createElement("div");
  addressDiv.innerHTML = data.address;
  addressDiv.className = "address-div";

  spotlightDiv.appendChild(nameDiv);
  spotlightDiv.appendChild(addressDiv);
}
