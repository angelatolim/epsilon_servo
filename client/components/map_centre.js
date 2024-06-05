import * as Utils from "../utils.js";
import { getMap } from "./map.js";

const sectionMiddle = document.querySelector('.section-middle');

sectionMiddle.addEventListener("mouseup", (event) => {
    const lookupAddressBtn = document.querySelector('.map-centre button');
    const centreAddressDiv = document.querySelector('.centre-address-div');
    centreAddressDiv.remove();
    lookupAddressBtn.remove();
    Utils.createCentreElem(getMap());
});