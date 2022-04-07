import React, { Component,useState } from "react";
import {
    Marker,
    GoogleMap,
    DirectionsRenderer
} from "react-google-maps";

const Map = ({formattedOrigin, formattedDestination}) => {
    const DirectionService = new google.maps.DirectionsService();
    const [direction,setDirections] = useState("");

    DirectionService.route(
        {
            origin: formattedOrigin,
            destination: formattedDestination,
            travelMode: google.maps.TravelMode.DRIVING,
        },

        (result,status) => {
            if (status === google.maps.DirectionsStatus.OK)
            {
                setDirections(result);
            }
            else {
                console.error(`error fetching directions ${result}`);
            }
        }
    );
    return (
        <section className="googleMap">
          <GoogleMap defaultZoom={9} defaultCenter={{ lat: 41.75, lng: 1.8 }}>
            <Marker position={formattedOrigin} />
            <Marker position={formattedDestination} />
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </section>
      );

};

export default Map