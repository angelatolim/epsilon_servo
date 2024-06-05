import * as suburbApi from "../suburb_api.js";

const postcodeSearchForm = document.querySelector(".postcode-search-form");
const postcodeSearchInput = document.querySelector(".postcode-search-input");
const suburbResults = document.querySelector(".suburb-results");
const suburbTotal = document.querySelector(".suburb-total");

postcodeSearchForm.addEventListener("submit", handlePostcodeSubmit);

function handlePostcodeSubmit(event) {
  event.preventDefault();
  suburbResults.textContent = "";
  const postcode = postcodeSearchInput.value;

  if (Number.isNaN(Number(postcode)) || postcode.length < 3) {
    suburbTotal.textContent = `0 results`;
  } else {
    suburbApi.fetchSuburbs(postcode).then((suburbs) => {
      suburbs.forEach((suburb) => {
        const name = suburb.name;
        const button = document.createElement("button");
        button.textContent = name;
        suburbResults.appendChild(button);
      });
      const totalSuburbs = suburbs.length;
      suburbTotal.textContent = `${totalSuburbs} results`;
    });
  }
}
