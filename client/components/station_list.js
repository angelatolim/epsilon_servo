import * as mapApi from "../map_api.js";
import * as Utils from "../utils.js";
import { getMap } from "./map.js";

const stationList = document.querySelector(".station-list");

document.addEventListener("mapInitialised", populateStationList);
document.addEventListener("mouseup", (event) => {
  stationList.innerHTML = "";
  populateStationList();
});

async function populateStationList(event) {
  const currentCenter = getMap().getCenter();
  const latitude = currentCenter.lat();
  const longitude = currentCenter.lng();
  const radius = 100000;

  mapApi.fetchNearest(latitude, longitude, radius).then((stations) => {
    stations.forEach((station) => {
      let stationElem = Utils.createStationElem(station);
      stationList.appendChild(stationElem);
    });
  });
}
