import { useState, useEffect } from "react";
import { formatWeekdays, formatWeekend } from "@/lib/scheduleFormatter";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function Description({ tripAdvId, description }) {
  const [details, setDetails] = useState(null);
  const hours = details?.hours?.periods || null;

  useEffect(() => {
    async function getReviews() {
      try {
        const response = await fetch(`${import.meta.env.VITE_ICEY_TRIPADV}/restdetails.php?tripId=${tripAdvId}`, {
          method: "GET",
        });
        const reviewData = await response.json();
        setDetails(reviewData);
      } catch (error) {
        console.error("A apărut o eroare:", error);
      }
    }
    if (tripAdvId) {
      getReviews();
    }
  }, [tripAdvId]);

  return (
    <div>
      <div id="description">
        {details === null ? description : details?.description}
      </div>
      {hours ? (
        <div id="hours" className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 p-4 bg-gray-100 rounded-md">
          <div>
            <h2 className="font-semibold mb-2">Luni - Vineri</h2>
            <ul className="space-y-1">{hours && formatWeekdays(hours)}</ul>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Sambata - Duminica</h2>
            <ul className="space-y-1">{hours && formatWeekend(hours)}</ul>
          </div>
        </div>
      ) : (
        <> </>
        // va urma
        // <Skeleton height={175} />
      )}
    </div>
  );
}
