import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { isTokenValid, getUserIdFromToken } from "../assets/tokenUtils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderForm = () => {
  const [frequency, setFrequency] = useState("");
  const navigate = useNavigate();
  const [rating, setRating] = useState();
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userId = getUserIdFromToken();
  const [time, setTime] = useState("");
  const [helper, setHelper] = useState();
  const [selectedDays, setSelectedDays] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });

  const { helperId } = useParams();

  const handleCheckboxChange = (day) => {
    if (frequency === "monthly basis") {
      const newSelectedDays = { ...selectedDays, [day]: !selectedDays[day] };
      const selectedCount = Object.values(newSelectedDays).filter(
        (value) => value
      ).length;

      if (selectedCount <= 3) {
        setSelectedDays(newSelectedDays);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(frequency, date, time);

    if (isTokenValid()) {
      const formData = new FormData();
      formData.append("frequency", frequency);
      formData.append("date", date);
      formData.append("time", time);
      formData.append("helperId", helperId);
      formData.append("userId", userId);

      if (frequency === "monthly basis") {
        const selectedDaysArray = Object.keys(selectedDays).filter(
          (day) => selectedDays[day]
        );

        if (selectedDaysArray.length >= 1 && selectedDaysArray.length <= 3) {
          const selectedDaysString = selectedDaysArray.join(" ");
          formData.append("selectedDays", selectedDaysString);
        } else {
          alert("Please select between 1 to 3 days for monthly service.");
          return;
        }
      }

      try {
        const response = await axios.post(
          "http://localhost:8000/api/order/postOrder",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Your order has been placed!");
      } catch (error) {
        toast.error("Oops, something went wrong!");
      }
    } else {
      navigate("/login");
    }
  };

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

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8000/api/helper/getRating/${helperId}`)
      .then((response) => {
        setRating(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [helperId]);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  // In your component
  const wordLimit = 40; // Adjust the word limit as needed

  if (isLoading) {
    return (
      <div className="h-screen flex w-full justify-center items-center">
        <span className="loading loading-spinner text-lightOrange size-36"></span>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <form
          className="flex w-[80%] h-[90%] justify-evenly bg-darkBlue rounded-md"
          onSubmit={handleSubmit}
        >
          <section className="w-1/2 px-20 py-6 border-r-2 border-r-lightOrange">
            {!isLoading && helper && (
              <div className="h-full">
                <img
                  className="w-[300px] h-1/2 rounded-lg object-cover"
                  src={`data:image/jpeg;base64,${helper.helperImage}`}
                  alt=""
                />
                <div className="mt-6">
                  <p className="text-white text-2xl font-semibold mb-1">
                    {helper.name} -{" "}
                    <span className="text-lightOrange">
                      {helper.serviceTitle}
                    </span>
                  </p>
                  <div className="rating">
                    <div className="rating">
                      {[1, 2, 3, 4, 5].map((value) => {
                        return (
                          <input
                            key={value}
                            type="radio"
                            name="rating"
                            className="mask mask-star-2 bg-lightOrange w-4 h-4"
                            checked={rating >= value}
                            readOnly // Make the radio inputs read-only
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-x-4 my-6">
                    <span className="border-2 border-lightOrange text-lightOrange text-xl px-2 py-2 rounded-sm">${helper.feePerDay}/day</span><span className="text-xl text-white">OR</span><span className="border-2 border-lightOrange text-lightOrange text-xl px-2 py-2 rounded-sm">${helper.feePerMonth}/month</span>
                  </div>
                  <p className="text-white font-medium mt-2">
                    {truncateText(helper.about, wordLimit)}
                  </p>
                  <p></p>
                </div>
              </div>
            )}
          </section>
          <section className="w-[50%] flex flex-col items-center gap-y-4 py-6">
            <p className="text-lightOrange font-semibold text-2xl">
              Service Details
            </p>
            <label className="form-control w-[80%]">
              <div className="label">
                <span className="label-text text-lightOrange font-semibold">
                  How frequent do you want this service?
                </span>
              </div>
              <select
                className="select select-bordered rounded-sm bg-white text-black font-medium"
                value={frequency}
                onChange={(e) => {
                  setFrequency(e.target.value);
                  // Reset selectedDays when changing frequency
                  setSelectedDays({
                    Sunday: false,
                    Monday: false,
                    Tuesday: false,
                    Wednesday: false,
                    Thursday: false,
                    Friday: false,
                    Saturday: false,
                  });
                }}
              >
                <option disabled value="">
                  Pick one
                </option>
                <option value="one time only">One time only</option>
                <option value="monthly basis">Monthly basis</option>
              </select>
            </label>
            {frequency === "monthly basis" && (
              <label className="form-control w-[80%]">
                <div className="label">
                  <span className="label-text text-lightOrange font-semibold">
                    On which days do you want this service? (maximum - 3)
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-x-4 font-medium">
                  {Object.keys(selectedDays).map((day) => (
                    <div className="form-control" key={day}>
                      <label className="label cursor-pointer">
                        <span className="label-text text-lightOrange mr-2">
                          {day}
                        </span>
                        <input
                          type="checkbox"
                          checked={selectedDays[day]}
                          onChange={() => handleCheckboxChange(day)}
                          className="checkbox checkbox-lightOrange border-2 border-lightOrange"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </label>
            )}
            <label className="form-control w-[80%]">
              <div className="label">
                <span className="label-text text-lightOrange font-semibold">
                  Date -
                </span>
              </div>
              <input
                className="rounded-sm p-3 hover:cursor-pointer h-[48px] text-black font-medium"
                type="date"
                name="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <label className="form-control w-[80%]">
              <div className="label">
                <span className="label-text text-lightOrange font-semibold">
                  Time -
                </span>
              </div>
              <input
                className="rounded-sm p-3 hover:cursor-pointer h-[48px] text-black font-medium"
                type="time"
                name="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </label>
            <button className="bg-lightOrange text-darkBlue font-semibold text-xl p-3 rounded-sm w-[80%] mt-6">
              Confirm
            </button>
          </section>
        </form>
      </div>
    );
  }
};

export default OrderForm;
