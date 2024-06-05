import * as MapApi from "../map_api.js";

let map;

async function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
  } else {
    console.log(`geolocation not found`);
    const defaultPosition = { lat: -33.868, lng: 151.209 };
    loadMap(defaultPosition)
  }
}

function handleSuccess(position) {
  const userLocation = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }
  loadMap(userLocation)
}

function handleError(err) {
  const defaultPosition = { lat: -33.868, lng: 151.209 };
  loadMap(defaultPosition)
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
  // MapApi.fetchStations().then((stations) => {
  //   stations.forEach((station) => {
  //     const lat = Number(station.latitude);
  //     const lng = Number(station.longitude);
  
  //     const position = {
  //       lat: lat,
  //       lng: lng,
  //     };


  //     const markerImg = document.createElement("img");
  //     markerImg.className = 'marker'

  //     switch(station.owner) {
  //       case 'Caltex':
  //         markerImg.src = "../images/caltex.png";
  //         break
  //       case 'Shell':
  //         markerImg.src = "../images/shell.png";
  //         break
  //       case '7-Eleven Pty Ltd':
  //         markerImg.src = "../images/7-eleven.png";
  //         break
  //       case 'Ampol':
  //         markerImg.src = "../images/ampol.png";
  //         break
  //       case 'BP':
  //         markerImg.src = "../images/bp.png";
  //         break
  //       case 'United':
  //         markerImg.src = "../images/united.png";
  //         break
  //       default:
  //         markerImg.src = "../images/fuel.png";

  //     }

  //     const marker = new AdvancedMarkerElement({
  //       map: map,
  //       position: position,
  //       title: station.name,
  //       content: markerImg
  //     });
  
  //     const name = station.name;
  //     const address = station.address;
  //     const owner = station.owner;
  
  //     const contentString = `<div id="content">
  //       <h1>${name}</h1>
  //       <p>${address}</p>
  //       <p>${owner}</p>
  //       <p>${lat.toFixed(6)}</p>
  //       <p>${lng.toFixed(6)}</p>
  //       <button>Save</button>
  //     </div>
  //     `;
  //     const infowindow = new google.maps.InfoWindow({
  //       content: contentString,
  //       // ariaLabel: "NAME"
  //     });
  //     marker.addListener("click", () => {
  //       infowindow.open({
  //         anchor: marker,
  //         map,
  //       });
  //     });
  //   });
  // });

  const currentCenter = map.getCenter();
  const mapCenter = document.querySelector(".map-centre");

  google.maps.event.addListener(map, 'bounds_changed', function() {
    const boundsString = map.getBounds().toUrlValue()
    const latLongArray = boundsString.split(',')
    MapApi.fetchBounds(latLongArray)
    .then((stations) => {
      stations.forEach((station) => {
        const lat = Number(station.latitude);
        const lng = Number(station.longitude);
    
        const position = {
          lat: lat,
          lng: lng,
        };
  
  
        const markerImg = document.createElement("img");
        markerImg.className = 'marker'
  
        switch(station.owner) {
          case 'Caltex':
            markerImg.src = "../images/caltex.png";
            break
          case 'Shell':
            markerImg.src = "../images/shell.png";
            break
          case '7-Eleven Pty Ltd':
            markerImg.src = "../images/7-eleven.png";
            break
          case 'Ampol':
            markerImg.src = "../images/ampol.png";
            break
          case 'BP':
            markerImg.src = "../images/bp.png";
            break
          case 'United':
            markerImg.src = "../images/united.png";
            break
          default:
            markerImg.src = "../images/fuel.png";
  
        }
  
        const marker = new AdvancedMarkerElement({
          map: map,
          position: position,
          title: station.name,
          content: markerImg
        });
    
        const name = station.name;
        const address = station.address;
        const owner = station.owner;
    
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
        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map,
          });
        });
      });
    });
  })

  let lat = document.createElement("p");
  let lng = document.createElement("p");

  lat.textContent = `lat: ${currentCenter.lat()}`;
  lng.textContent = `lng: ${currentCenter.lng()}`;

  mapCenter.appendChild(lat);
  mapCenter.appendChild(lng);
}

initMap();

