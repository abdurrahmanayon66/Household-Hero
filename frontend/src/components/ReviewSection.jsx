// src/components/ReviewSection.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useFetchReviews } from '../context/ReviewsContext';
import { isTokenValid } from "../assets/tokenUtils";

const ReviewSection = ({ helperId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchReviewsRef = useFetchReviews();

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/helper/getReviews/${helperId}`);
      setReviews(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isTokenValid()) {
      setIsLoading(true);
      fetchReviews();
    }
  }, [helperId]);

  useEffect(() => {
    fetchReviewsRef.current = fetchReviews;
  }, [fetchReviewsRef]);

  return (
    <div className="mt-10 h-[400px] overflow-y-scroll pr-2">
      {!isLoading && reviews.map((review) => (
        <div key={review.reviewId} className="review-card bg-customNeutral flex gap-x-3 p-4 rounded-md w-full mb-6">
          <section>
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={`data:image/jpeg;base64,${review.User.userImage}`} alt={`${review.User.name}'s avatar`} />
              </div>
            </div>
          </section>
          <section className="w-full">
            <div className="flex items-center justify-between w-full">
              <p className="text-black font-bold">{review.User.name}</p>
              <p className="text-sm text-gray-400 font-semibold">{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="rating">
              {Array.from({ length: 5 }, (_, i) => (
                <input
                  key={i}
                  type="radio"
                  name={`rating-${review.reviewId}`}
                  className="mask mask-star-2 bg-orange-400 w-4 h-4"
                  defaultChecked={i < review.rating}
                  disabled
                />
              ))}
            </div>
            <p className="mt-3 text-black">
              {review.comment}
            </p>
          </section>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
