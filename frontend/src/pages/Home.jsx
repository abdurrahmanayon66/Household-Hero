import React, { useState } from "react";
import images from "../assets/images";
import Services from '../components/Services';
import About from '../components/About';
import Process from "../components/Process";
import { IoMdSearch } from "react-icons/io";

const Home = () => {
  const [workType, setWorkType] = useState(null);

  const handleServiceClick = (service) => {
    setWorkType(service.toLowerCase());
  };

  return (
    <div className="px-16 pt-10 relative z-10">
      <div className="relative w-full">
        <img className="h-[70vh] w-full rounded-md object-cover" src={images.home} alt="" />
        <div className="bg-black opacity-30 rounded-md absolute h-[70vh] w-full top-0"></div>
        <div className="absolute top-[40%] flex flex-col items-center w-full gap-y-3">
          <p className="text-white font-bold text-6xl text-center">Making Home Life Easier</p>
          <p className="text-white font-bold text-2xl text-center">One-Stop Solution for All Your Household Needs.</p>
          <label className="input input-bordered flex items-center gap-2 bg-white mt-3 w-[60%]">
            <input type="text" className="grow text-darkBlue font-semibold placeholder:text-darkBlue" placeholder="Search" />
            <IoMdSearch className="text-darkBlue text-xl" />
          </label>
        </div>
        <div className="absolute text-white grid grid-cols-7 hover:cursor-pointer bg-darkBlue shadow-lg w-[90%] mx-[5%] bottom-[-50px] h-24 rounded-md">
          <div
            className={`justify-center flex flex-col items-center gap-y-2 grow hover:bg-yellow-400 rounded-l-md ${workType === 'cooking' ? 'bg-yellow-400' : ''}`}
            onClick={() => handleServiceClick('cooking')}
          >
            <img className="size-[40px]" src={images.cooking} alt="Cooking" />
            <p className="font-semibold">Cooking</p>
          </div>
          <div
            className={`justify-center flex flex-col items-center gap-y-2 grow hover:bg-yellow-400 ${workType === 'cleaning' ? 'bg-yellow-400' : ''}`}
            onClick={() => handleServiceClick('cleaning')}
          >
            <img className="size-[40px]" src={images.cleaning} alt="Cleaning" />
            <p className="font-semibold">Cleaning</p>
          </div>
          <div
            className={`justify-center flex flex-col items-center gap-y-2 grow hover:bg-yellow-400 ${workType === 'maintenance' ? 'bg-yellow-400' : ''}`}
            onClick={() => handleServiceClick('maintenance')}
          >
            <img className="size-[40px]" src={images.maintenance} alt="Maintenance" />
            <p className="font-semibold">Maintenance</p>
          </div>
          <div
            className={`justify-center flex flex-col items-center gap-y-2 grow hover:bg-yellow-400 ${workType === 'laundry' ? 'bg-yellow-400' : ''}`}
            onClick={() => handleServiceClick('laundry')}
          >
            <img className="size-[40px]" src={images.laundry} alt="Laundry" />
            <p className="font-semibold">Laundry</p>
          </div>
          <div
            className={`justify-center flex flex-col items-center gap-y-2 grow hover:bg-yellow-400 ${workType === 'gardening' ? 'bg-yellow-400' : ''}`}
            onClick={() => handleServiceClick('gardening')}
          >
            <img className="size-[40px]" src={images.gardening} alt="Gardening" />
            <p className="font-semibold">Gardening</p>
          </div>
          <div
            className={`justify-center flex flex-col items-center gap-y-2 grow hover:bg-yellow-400 ${workType === 'childcare' ? 'bg-yellow-400' : ''}`}
            onClick={() => handleServiceClick('childcare')}
          >
            <img className="size-[40px]" src={images.baby} alt="Childcare" />
            <p className="font-semibold">Childcare</p>
          </div>
          <div
            className={`justify-center flex flex-col items-center gap-y-2 grow hover:bg-yellow-400 rounded-r-md ${workType === 'petcare' ? 'bg-yellow-400' : ''}`}
            onClick={() => handleServiceClick('petcare')}
          >
            <img className="size-[40px]" src={images.pet} alt="Pet Care" />
            <p className="font-semibold">Pet Care</p>
          </div>
        </div>
      </div>
      <Services workType={workType} />
      <About />
      <Process />
    </div>
  );
};

export default Home;
