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

      const lat = Number(station.latitude)
      const lng = Number(station.longitude)

      const position = {
        lat: lat,
        lng: lng,
      };
      const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: station.name
      });

      const name = station.name
      const address = station.address
      const owner = station.owner

      const contentString = `<div id="content">
        <h1>${name}</h1>
        <p>${address}</p>
        <p>${owner}</p>
        <p>${lat.toFixed(6)}</p>
        <p>${lng.toFixed(6)}</p>
        <button>Save</button>
      </div>
      `
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        // ariaLabel: "NAME"
        
    });
      marker.addListener('click', () => {
        infowindow.open({
          anchor: marker,
          map,
        })
      })
  });
})}


initMap();
