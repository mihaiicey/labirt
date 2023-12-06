import React, { useContext, useState, useEffect } from "react";
import { formatCityNameCuSarma } from "../../lib/helpers";
import CityDescriptionSkeleton from "./CityDescriptionSkeleton";
import { toast } from "react-toastify";
import { toastStandard } from "../../lib/cofigs";

export default function CityDescription({ city }) {
  const [error, setError] = useState(false);
  const [cityData, setCityData] = useState(null);
  const wikyCity = formatCityNameCuSarma(city);

  useEffect(() => {
    async function getCity() {
      try {
        const data = await fetch(
          `https://ro.wikipedia.org/api/rest_v1/page/summary/${wikyCity}`
        ).then((response) => {
          if (response.status !== 200) {
            setError(true);
            toast.error('A aparut o eroare la preluarea restaurantelor', {
              ...toastStandard,
            });
          }else{
            setError(false)
            return response.json();
          }
        });
        setCityData(data);
      } catch (error) {
        console.error("A apărut o eroare:", error.message);
      }
    }
    getCity();
  }, [city]);

  if (error) return ;
  if (!cityData) {
    return <CityDescriptionSkeleton />;
  }

  function Image({ src }) {
    return (
      <img
        src={src}
        alt="city"
        className="w-full h-64 md:h-96 mx-auto md:mr-auto ml-0 rounded-md object-cover object-top"
      />
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl sm:text-3xl font-semibold text-secondary">
          Restaurante si birturi din <span className="capitalize">{city}</span>
        </h1>
        <div className="block md:hidden mt-4">
          <Image src={cityData.originalimage.source} />
        </div>
        {cityData?.extract_html && (
          <div
            className="mt-4 text-lg md:tex-base"
            dangerouslySetInnerHTML={{ __html: cityData.extract_html || "" }}
          />
        )}
      </div>
      <div className="hidden md:block w-1/2">
        <Image src={cityData.originalimage.source} />
      </div>
    </div>
  );
}
