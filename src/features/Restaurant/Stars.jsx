import { useEffect, useState } from "react";
import { calculateAverageRating } from "../../lib/helpers";
import StarsRating from "../ui/StarsRating";
export default function StartRest({tripAdvId}) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    async function getReviews() {
      try {
        const response = await fetch(`${import.meta.env.VITE_ICEY_TRIPADV}/reviewsic.php?tripId=${tripAdvId}`, {
          method: 'GET',
          referrer: 'http://devlocal.icey.dev'
        });
        if (!response.ok) {
          throw new Error('Eroare la preluarea datelor');
        }
        const reviewData = await response.json();
        setReviews(reviewData);
      } catch (error) {
        console.error('A apărut o eroare:', error);
      }
    }
  
    getReviews();
  }, [tripAdvId]); 
  
  if (!reviews) return;
  
  return (
    <>
      <span className="text-white text-sm flex"><StarsRating rating={calculateAverageRating(reviews.data)}/></span>
    </>
  );
}
