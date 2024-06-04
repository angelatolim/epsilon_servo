function updateClock() {
  const date = new Date();
  const string = date.toString().split(" ");
  const day = string[0];
  const time = string[4];

  const todayDiv = document.querySelector(".today");
  todayDiv.textContent = `${day} ${time}`;
}

setInterval(updateClock, 1000);
updateClock();
