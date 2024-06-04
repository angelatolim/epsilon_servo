import * as MapApi from "../map_api.js";

let map;

async function initMap() {
  const position = { lat: -33.868, lng: 151.209 };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 13,
    minZoom: 8,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  MapApi.fetchStations().then((stations) => {
    stations.forEach((station) => {
      const position = {
        lat: Number(station.latitude),
        lng: Number(station.longitude),
      };
      const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: station.name
      });
    });
  });
}

initMap();
