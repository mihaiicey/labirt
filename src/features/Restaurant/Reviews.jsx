import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import placeholderUser from '@/assets/profile-placeholder.png'
import StarsRating from "@/features/ui/StarsRating";
export function ReviewsRest({tripAdvId}) {
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
      if(tripAdvId){
        getReviews();
      }
    }, [tripAdvId]); 
    if (!reviews) return(
        <div id='review' className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-4">
                    <img src={placeholderUser} className='h-10 w-auto rounded-full object-cover'/>
                    <div>
                        <div>
                            <Skeleton width={60} />
                        </div>
                        <p className="mt-0.5 text-lg font-medium text-gray-900"><Skeleton width={100} /></p>
                    </div>
                </div>
                <p className="mt-4">
                <Skeleton />
                </p>
            </div>
    )
    return(
        <div>
               {reviews?.data.map((review) => (
                <div key={review?.id} className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8 mb-4">
                <div className="flex items-center gap-4">
                    <img src={review?.user?.avatar?.medium || placeholderUser} className='h-10 w-auto rounded-full object-cover'/>
                    <div>
                        <div>
                            {<StarsRating rating={review?.rating} />}
                        </div>
                        <p className="mt-0.5 text-lg font-medium text-gray-900">
                            {review?.user?.username}
                        </p>
                    </div>
                </div>
                <p className="mt-4">
                    {review?.text}
                </p>
            </div>
                ))}

            
        </div>
    )

}