import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="px-16 py-5 bg-darkBlue h-[50vh]">
      <section className="flex justify-between">
        <div className="text-black w-[30%]">
          <p className="text-4xl mb-5 font-bold text-lightOrange">
            HouseHold<span className="text-hotPink ml-2">Hero</span>
          </p>
          <div>
            <p className="text-md font-semibold text-[#b5c6e8]">
              We strive to bring convenience and peace of
              mind to your household needs. Our platform connects you with
              skilled, reliable household workers and maids who are committed to
              providing exceptional service. Whether you need regular cleaning,
              occasional help, or specialized assistance, HouseHold Hero makes
              it easy to find the perfect match for your home.
            </p>
          </div>
        </div>
        <div className="w-[30%] grid grid-cols-3 text-md font-semibold text-[#b5c6e8]">
          <section className="space-y-4">
            <p className="font-bold text-lg text-lightOrange">
              <Link>Quick Links</Link>
            </p>
            <p>
              <Link>Home</Link>
            </p>
            <p>
              <Link>Recipes</Link>
            </p>
            <p>
              <Link>Blog</Link>
            </p>
          </section>
          <section className="space-y-4">
            <p className="font-bold text-lg text-lightOrange">
              <Link>Quick Links</Link>
            </p>
            <p>
              <Link>Share Recipe</Link>
            </p>
            <p>
              <Link>About Us</Link>
            </p>
            <p>
              <Link>Contact</Link>
            </p>
          </section>
          <section className="space-y-4">
            <p className="font-bold text-lg text-lightOrange">
              <Link>Legal</Link>
            </p>
            <p>
              <Link>Terms of use</Link>
            </p>
            <p>
              <Link>Privacy & Cookies</Link>
            </p>
          </section>
        </div>

        <div className="w-[30%] grid grid-rows-3">
          <div className="text-black">
            <p className="mb-1 text-center text-lg font-bold text-lightOrange">Newsletter</p>
            <p className="text-center text-md font-semibold text-customNeutral">
              Subcribe to our newsletter to get new updates.
            </p>
          </div>
          <input
            type="text"
            placeholder="Enter Your Email"
            className="w-full bg-customNeutral h-[50px] px-2 text-darkBlue rounded-sm placeholder:text-darkBlue font-medium"
          />
          <button className="w-full mx-auto rounded-sm bg-lightOrange h-[50px] text-darkBlue font-semibold">
            Subscribe
          </button>
        </div>
      </section>{" "}
      {/*upper section ends here */}
      <section></section>
    </div>
  );
};

export default Footer;
