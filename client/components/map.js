import * as MapApi from "../map_api.js";
import * as Utils from "../utils.js";

let map;

async function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  } else {
    console.log(`geolocation not found`);
    const defaultPosition = { lat: -33.868, lng: 151.209 };
    loadMap(defaultPosition);
  }
}

function handleSuccess(position) {
  const userLocation = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  loadMap(userLocation);
}

function handleError(err) {
  const defaultPosition = { lat: -33.868, lng: 151.209 };
  loadMap(defaultPosition);
}

async function loadMap(position) {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 13,
    minZoom: 8,
    center: position,
    mapId: "DEMO_MAP_ID",
  });
  const startEvent = new Event("mapInitialised");
  document.dispatchEvent(startEvent);

  google.maps.event.addListener(map, "bounds_changed", function () {
    const boundsString = map.getBounds().toUrlValue();
    const latLongArray = boundsString.split(",");
    MapApi.fetchBounds(latLongArray).then((stations) => {
      stations.forEach((station) => {
        Utils.createMarker(station, AdvancedMarkerElement);
      });
    });
  });
  Utils.createCentreElem(map);
}

initMap();



export function getMap() {
  return map;
}
