import React, { useRef, useEffect } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

function MyMapComponent({ center, zoom, name }) {
  const ref = useRef();

  useEffect(() => {
    const map = new google.maps.Map(ref.current, {
      center,
      zoom,
      styles: [
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "transit",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

    const marker = new google.maps.Marker({
      position: center,
      map: map,
    });

    const infowindow = new google.maps.InfoWindow({
      content: `<h6 style="font-weight: 500;">${name}</h6><br/>
                <a href='https://www.google.com/maps/?q=${center.lat},${center.lng}'tyle="text-decoration:underline">Vezi directii</a>`
    });
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
    
  }, [center, zoom]);

  return <div ref={ref} style={{ width: '100%', height: 350 }} />;
}
export function GoogleMap({ lat, lng, name }) {
  const center = { lat: Number(lat) || 45.80403297400235, lng: Number(lng) || 24.144985604037565 };
  const zoom = lat ? 18 : 13;

  return (
    <div id="maps" className="mt-4">
      <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
        <MyMapComponent center={center} zoom={zoom} name={name} />
      </Wrapper>
    </div>
  );
}
