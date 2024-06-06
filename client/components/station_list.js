import * as MapApi from "../map_api.js";
import * as Utils from "../utils.js";
import { getMap } from "./map.js";

document.addEventListener("mapInitialised", () => {
  const stationList = document.querySelector(".station-list");
  const sectionMiddle = document.querySelector('.section-middle');
  const spotlightDiv = document.querySelector(".spotlight");
  const nameLink = document.querySelector(".name-link");

  Utils.populateStationList();
  
  sectionMiddle.addEventListener("click", (event) => {
    stationList.innerHTML = "";
    Utils.populateStationList();
  });

  nameLink.addEventListener("click", (event) => {
    stationList.innerHTML = "";
    Utils.populateStationList();
  });
  
})

