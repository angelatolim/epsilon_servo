import * as MapApi from "../map_api.js";


export default async function updateFavouritesCount() {
    const favouritesCount =  document.querySelector('.favourites-count')
    
    MapApi.fetchFavourites().then(favourites => {
        favouritesCount.textContent = `${favourites.count} favourites`
    })
}

updateFavouritesCount()
