// src/context/ReviewsContext.js
import { createContext, useContext, useRef } from 'react';

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const fetchReviewsRef = useRef();

  return (
    <ReviewsContext.Provider value={fetchReviewsRef}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useFetchReviews = () => {
  const context = useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error('useFetchReviews must be used within a ReviewsProvider');
  }
  return context;
};
