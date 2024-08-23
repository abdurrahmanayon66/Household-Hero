import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from './Pagination'

const Services = ({ workType }) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    const endpoint = workType
      ? `http://localhost:8000/api/helper/getHelpersByType/${workType}`
      : "http://localhost:8000/api/helper/getHelpers";

    axios
      .get(endpoint)
      .then((response) => {
        setServices(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [workType]);

  // Get current services
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="my-28">
      <div className="py-16 h-full w-full flex flex-wrap gap-x-6 gap-y-20">
        {!isLoading &&
          currentServices.map((service) => ( // Updated to use currentServices
            <div
              key={service.helperId}
              className="flex w-[400px] h-[250px] shadow-lg rounded-md relative bg-darkBlue text-white"
            >
              <section className="w-[40%]">
                <img
                  className="object-cover h-full w-full rounded-tl-md rounded-bl-md"
                  src={`data:image/jpeg;base64,${service.helperImage}`}
                  alt={service.name}
                />
              </section>
              <section className="w-[60%] pr-2 pl-6 flex flex-col py-2">
                <h1 className="text-2xl font-bold">
                  {service.name}
                </h1>
                <p className="text-md mt-3 font-bold">{service.serviceTitle}</p>
                <div className="rating my-2">
                  <input
                    type="radio"
                    name={`rating-${service.helperId}`}
                    className="mask mask-star-2 bg-lightOrange w-4 h-4"
                  />
                  <input
                    type="radio"
                    name={`rating-${service.helperId}`}
                    className="mask mask-star-2 bg-lightOrange w-4 h-4"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name={`rating-${service.helperId}`}
                    className="mask mask-star-2 bg-lightOrange w-4 h-4"
                  />
                  <input
                    type="radio"
                    name={`rating-${service.helperId}`}
                    className="mask mask-star-2 bg-lightOrange w-4 h-4"
                  />
                  <input
                    type="radio"
                    name={`rating-${service.helperId}`}
                    className="mask mask-star-2 bg-lightOrange w-4 h-4"
                  />
                </div>
                <h2 className="text-xl font-bold text-lightOrange mt-3">
                  ${service.feePerDay} / <span className="text-sm">day</span>
                </h2>
                <button className="bg-lightOrange text-white font-semibold text-xl absolute bottom-6 p-2 rounded-md w-[150px]">
                  <Link to={`/hireHelperForm/${service.helperId}`}>
                    Book Now
                  </Link>
                </button>
              </section>
            </div>
          ))}
      </div>
      <Pagination
        totalServices={services.length}
        servicesPerPage={servicesPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Services;
