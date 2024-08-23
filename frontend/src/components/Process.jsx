import React from "react";
import images from "../assets/images";

const Process = () => {
  return (
    <div className="mt-16 mb-20 text-black">
      <div className="overflow-hidden">
        <p className="text-4xl font-bold mb-4">Easiest way to get a service</p>
        <div className="flex">
          <div className="w-1/2 flex items-start justify-center">
            <img
              className="w-full h-[500px] object-cover"
              src={images.process}
              alt="Process"
            />
          </div>
          <div className="w-1/2 flex justify-start items-start">
            <ul className="timeline timeline-vertical text-lg">
              <li className="h-[100px]">
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-8 w-8 text-darkBlue"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end timeline-box bg-darkBlue text-lightOrange font-semibold p-4 rounded-md shadow-lg w-[200px] text-center">
                  Select the service
                </div>
                <hr/>
              </li>
              <li className="h-[100px]">
                <hr />
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-8 w-8 text-darkBlue"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end timeline-box bg-darkBlue text-lightOrange p-4 rounded-md shadow-lg w-[200px] text-center">
                  Select your helper
                </div>
                <hr />
              </li>
              <li className="h-[100px]">
                <hr />
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-8 w-8 text-darkBlue"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end timeline-box bg-darkBlue text-lightOrange p-4 rounded-md shadow-lg w-[200px] text-center">
                  Pick your schedule
                </div>
                <hr />
              </li>
              <li className="h-[100px]">
                <hr />
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-8 w-8 text-darkBlue"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end timeline-box bg-darkBlue text-lightOrange p-4 rounded-md shadow-lg w-[200px] text-center">
                  Place your order
                </div>
                <hr />
              </li>
              <li className="h-[100px]">
                <hr />
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-8 w-8 text-darkBlue"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end timeline-box bg-darkBlue text-lightOrange p-4 rounded-md shadow-lg w-[200px] text-center">
                  Relax
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
