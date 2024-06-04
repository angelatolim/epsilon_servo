let map;

async function initMap() {
  const position = { lat: -25.344, lng: 131.031 };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 13,
    minZoom: 8,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Marker",
  });
}

initMap();
