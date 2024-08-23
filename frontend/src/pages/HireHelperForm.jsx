// src/pages/HireHelperForm.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isTokenValid, getUserIdFromToken } from "../assets/tokenUtils";
import ReviewSection from "../components/ReviewSection";
import images from "../assets/images";
import { ReviewsProvider, useFetchReviews } from "../context/ReviewsContext";

const HireHelperForm = () => {
  const [activeSection, setActiveSection] = useState("about");
  const { helperId } = useParams();
  const [helper, setHelper] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const descriptionLength = 250;
  const [comment, setComment] = useState();
  const userId = getUserIdFromToken();
  const navigate = useNavigate();
  const fetchReviewsRef = useFetchReviews();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8000/api/helper/getHelper/${helperId}`)
      .then((response) => {
        setHelper(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [helperId]);

  const handleAboutClick = () => {
    setActiveSection("about");
  };

  const handleReviewClick = () => {
    setActiveSection("review");
  };

  const [rating, setRating] = useState(0); // Initialize state with default value

  const postRating = async (e) => {
    e.preventDefault();
    if (isTokenValid()) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/helper/postReview",
          {
            userId: userId,
            helperId: helperId,
            rating: rating,
            comment: comment,
          }
        );
        toast.success("Thank you for your feedback.");
        setRating(1);
        fetchReviewsRef.current(); // Call fetchReviews from context
      } catch (error) {
        console.error("Error posting rating", error);
        toast.error("Error submitting rating");
      }
    } else {
      navigate("/login");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex w-full justify-center items-center">
        <span className="loading loading-spinner text-lightOrange size-36"></span>
      </div>
    );
  } else {
    return (
      <div className="px-16 py-10">
        <ToastContainer />
        {helper && !isLoading ? (
          <div className="flex justify-between">
            <div className="w-[60%]">
              <section className="flex mb-6">
                <div className="w-1/2 h-[350px]">
                  <img
                    className="w-full h-full rounded-lg object-cover"
                    src={`data:image/jpeg;base64,${helper.helperImage}`}
                    alt=""
                  />
                </div>
                <div className="w-1/2 pl-10 text-black">
                  <p className="text-2xl font-bold mb-1">{helper.name}</p>
                  <p className="mb-2 text-lg font-semibold">
                    {helper.gender}, {helper.age} years old
                  </p>
                  <p className="text-md font-medium">
                    {helper.about.slice(0, descriptionLength)}...
                  </p>
                  <div className="my-3 flex justify-start items-center gap-x-3">
                    <span className="text-xl font-semibold text-lightOrange bg-darkBlue py-1 px-2 rounded-md">
                      ${helper.feePerDay} / day
                    </span>
                    <span>OR</span>
                    <span className="text-xl font-semibold mr-4 text-lightOrange bg-darkBlue py-1 px-2 rounded-md">
                      ${helper.feePerMonth} / month
                    </span>
                  </div>
                  <button className="bg-lightOrange p-2 grow text-center rounded-lg font-semibold text-darkBlue text-lg w-full mt-4">
                    <Link to={`/orderForm/${helper.helperId}`}>Book Now</Link>
                  </button>
                </div>
              </section>
              <section className="w-full">
                <div className="flex w-1/2 text-2xl text-lightOrange font-semibold bg-darkBlue mb-6 rounded-md">
                  <div
                    className={`w-1/2 text-center p-2 hover:cursor-pointer ${
                      activeSection === "about"
                        ? "bg-lightOrange text-darkBlue"
                        : ""
                    }`}
                    onClick={handleAboutClick}
                  >
                    About
                  </div>
                  <div
                    className={`w-1/2 text-center p-2 hover:cursor-pointer ${
                      activeSection === "review"
                        ? "bg-lightOrange text-darkBlue"
                        : ""
                    }`}
                    onClick={handleReviewClick}
                  >
                    Review
                  </div>
                </div>
                {activeSection === "about" && (
                  <div className="about-section mt-10">
                    <span className="bg-lightOrange text-darkBlue p-2 rounded-lg font-semibold">
                      {helper.serviceType}
                    </span>
                    <p className="mt-6 mb-4 text-2xl text-black font-bold">
                      {helper.serviceTitle}
                    </p>
                    <p className="text-black font-medium">
                      {helper.serviceDescription}
                    </p>
                  </div>
                )}
                {activeSection === "review" && (
                  <div>
                    <ReviewSection helperId={helperId} />
                  </div>
                )}
              </section>
            </div>
            <section className="w-[30%] bg-darkBlue rounded-md">
              <div>
                <img className="w-full" src={images.review} alt="" />
                <p className="my-6 px-4 text-center text-white font-semibold">
                  Share your experience with our helpers. Your feedback helps us
                  improve our services.
                </p>
                <form onSubmit={postRating} className="px-6">
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={rating}
                    required
                    className="range bg-customNeutral mt-6 mb-2"
                    onChange={(e) => setRating(e.target.value)}
                    style={{
                      WebkitAppearance: "none",
                      appearance: "none",
                      outline: "none",
                    }}
                  />
                  <div className="w-full flex justify-between text-md px-2 text-white">
                    <span>Worst</span>
                    <span>Bad</span>
                    <span>Average</span>
                    <span>Good</span>
                    <span>Best</span>
                  </div>
                  <textarea
                    className="textarea w-full bg-customNeutral rounded-sm h-[150px] mt-8 text-lg font-medium text-black placeholder:text-darkBlue placeholder:font-medium"
                    placeholder="Leave a comment here..."
                    value={comment}
                    required
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <div className="flex justify-center mb-3 mt-6">
                    <button className="bg-lightOrange px-2 py-3 mb-4 w-full rounded-sm text-darkBlue font-medium text-lg">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
};

export default () => (
  <ReviewsProvider>
    <HireHelperForm />
  </ReviewsProvider>
);
