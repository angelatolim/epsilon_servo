const todayDiv = document.querySelector(".today");
todayDiv.classList.add('time');

let intervalId = null;

displayDateTemp();
todayDiv.addEventListener('click', handleDisplayDateTempClick);

function handleDisplayDateTempClick (event) {
  todayDiv.classList.toggle('time');
  todayDiv.classList.toggle('temperature');
  displayDateTemp();
}

function displayDateTemp () {
  if (todayDiv.classList.contains('time')) {
    updateClock();
    intervalId = setInterval(updateClock, 1000);
    function updateClock() {
      const date = new Date();
      const string = date.toString().split(" ");
      const day = string[0];
      const time = string[4];
      todayDiv.textContent = `${day} ${time}`;
    }
  } else if (todayDiv.classList.contains('temperature')) {
    clearInterval(intervalId);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${userLocation.lat}&longitude=${userLocation.lng}&current=temperature_2m`
          fetch(url)
            .then(data => data.json())
            .then(result => {
              const temperature = `${result.current.temperature_2m}°C`;
              todayDiv.textContent = temperature;
            });
        }
      )
    }
  }
}