import { useState } from "react"

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState("");
    const [latLong, setLatLong] = useState("");
    const [isFindingLoading, setIsFindingLoading] = useState(false);


    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLatLong(`${latitude},${longitude}`);
        setLocationErrorMsg("");
        setIsFindingLoading(false);

    }

    const error = () => {
        setIsFindingLoading(false);
        setLocationErrorMsg("Unable to retrieve your location");
    }

    const handleTrackLocation = ()=> {
      setIsFindingLoading(true);
      if (!navigator.geolocation) {
        setLocationErrorMsg("Geolocation is not supported by your browser");
        setIsFindingLoading(false);
      } else {
        // status.textContent = "Loading..";
        navigator.geolocation.getCurrentPosition(success, error);
      }
    }
    return {
      latLong,
      handleTrackLocation,
      locationErrorMsg,
      isFindingLoading,
    };
}

export default useTrackLocation;