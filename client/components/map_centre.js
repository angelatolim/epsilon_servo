import * as Utils from "../utils.js";
import { getMap } from "./map.js";

document.addEventListener("mouseup", (event) => {
    const centreAddressDiv = document.querySelector('.centre-address-div');
    centreAddressDiv.remove();
    const lookupAddressBtn = document.querySelector('.map-centre button');
    lookupAddressBtn.remove();
    Utils.createCentreElem(getMap());
});