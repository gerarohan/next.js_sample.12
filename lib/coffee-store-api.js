import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY,
});

const getBaseURl = (query,latLong,limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getPictureData = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "spiderman",
    perPage: 30,
  });
  const photoResult = photos.response?.results || [];
  return photoResult.map((data) => data.urls["small"]);
};

export const FetchCoffeeStoreApi = async (
  latLong = "51.45455632345072%2C-2.5903762743253904",
  limit = 6
) => {
  const photos = await getPictureData();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };
  const response = await fetch(getBaseURl("coffee",latLong,limit), options);
  const data = await response.json();
  return data.results.map((result, idx) => {
    const locality = result.location.locality;
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      locality: locality.length > 0 ? locality[0] : "",
      imgUrl: photos.length > 0 ? photos[idx] : null,
    };
  });
};
