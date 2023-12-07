import React from 'react';
import { IoIosStarOutline, IoMdStar, IoMdStarHalf } from 'react-icons/io';

export default function StarsRating({rating}){

    const totalStars = 5;
    let fullStars = Math.floor(rating);
    let halfStar = rating % 1 >= 0.5 ? 1 : 0;
    let emptyStars = totalStars - fullStars - halfStar;
  
    return (
      <div className='flex'>
        {[...Array(fullStars)].map((_, i) => <IoMdStar key={i} />)}
        {halfStar > 0 && <IoMdStarHalf />}
        {[...Array(emptyStars)].map((_, i) => <IoIosStarOutline key={i} />)}
      </div>
    );
  }