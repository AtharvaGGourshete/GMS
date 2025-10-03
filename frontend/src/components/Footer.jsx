import { Github, Instagram, Linkedin } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="h-72 bg-[#131313] text-white">
      <div className="grid grid-cols-2 text-[#F24423] items-center justify-center text-center">
        <div className="text-2xl font-extrabold mt-10 ml-72">
          <img
            src="main-bg.png"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div className="text-2xl font-extrabold  mt-10">
          <div>Quick Links</div>
          <ul className="font-light text-sm text-white">
            <li className=" hover:underline">Home</li>
            <li className=" hover:underline">Memberships</li>
            <li className=" hover:underline">Trainers</li>
            <li className=" hover:underline">About Us</li>
          </ul>
        </div>
        {/* <div className="text-2xl font-extrabold">Features</div> */}
        
      </div>
      <hr className="mt-10 w-[1350px] mx-auto"/>
    <div className="grid grid-cols-2 text-white text-center mt-5">
      <div className="text-gray-400">Terms and conditions applied</div>
      <div className="text-gray-400">
        <div className="flex justify-center gap-5 text-gray-400 cursor-pointer">
          <p><Github/></p>
          <p><Linkedin/></p>
          <p><Instagram/></p>
        </div>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
