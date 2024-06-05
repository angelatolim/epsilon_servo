import * as mapApi from "../map_api.js";
import * as Utils from "../utils.js";

const stationList = document.querySelector(".station-list");

mapApi.fetchTen().then((stations) => {
  stations.forEach((station) => {
    let stationElem = Utils.createStationElem(station);
    stationList.appendChild(stationElem);
  });
});
