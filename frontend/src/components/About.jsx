import React from "react";
import images from "../assets/images";

const About = () => {
  return (
    <div>
      <div>
        <p className="text-black text-4xl font-bold mb-2"> - Why Choose US?</p>
        <p className="text-black font-semibold text-2xl ml-7">
          Because we provide reliable, professional, and comprehensive household
          services tailored to your needs.
        </p>
      </div>
      <div className="flex mt-10">
        <div className="w-1/2 flex flex-wrap gap-x-10 gap-y-10 justify-evenly">
          <div className="bg-darkBlue w-[45%] flex justify-center items-center p-3 rounded-lg">
            <img className="size-[60px]" src={images.trust} alt="" />
            <p className="text-white font-semibold text-3xl ml-4">Trust</p>
          </div>
          <div className="bg-darkBlue w-[45%] flex justify-center items-center p-3 rounded-lg">
            <img className="size-[60px]" src={images.affordable} alt="" />
            <p className="text-white font-semibold text-3xl ml-4">Affordable</p>
          </div>
          <div className="bg-darkBlue w-[45%] flex justify-center items-center p-3 rounded-lg">
            <img className="size-[60px]" src={images.eco} alt="" />
            <p className="text-white font-semibold text-3xl ml-4">
              Eco-Friendly
            </p>
          </div>
          <div className="bg-darkBlue w-[45%] flex justify-center items-center p-3 rounded-lg">
            <img className="size-[60px]" src={images.satisfaction} alt="" />
            <p className="text-white font-semibold text-3xl ml-4">
              Satisfaction
            </p>
          </div>
        </div>
        <div className="w-1/2">
          <img className="w-full object-cover" src={images.about} alt="" />
        </div>
      </div>
      <div className="mt-16 flex justify-evenly items-center bg-darkBlue rounded-lg py-4">
        <div className="text-white font-bold text-2xl">
            <p>15,000+</p>
            <p>Service Providers</p>
        </div>
        <div className="w-[2px] h-[100px] bg-white"></div>
        <div className="text-white font-bold text-2xl">
            <p>200,000+</p>
            <p>Orders Served</p>
        </div>
        <div className="w-[2px] h-[100px] bg-white
        "></div>
        <div className="text-white font-bold text-2xl">
            <p>500,000+</p>
            <p>Satisfied Clients</p>
        </div>
      </div>
    </div>
  );
};

export default About;
