"use client"
import Image from 'next/image';
import React from 'react';
import AnimatedSearchBar from './Searchbar';
import Link from 'next/link';


function Hero() {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden min-w-[300px] min-h-[100vh]">
      {/* Background Image */}
      <Image
        src="/bgofbg.jpg" // Ensure this file path is correct
        alt="Hero Background"
        layout="fill" // Makes the image fill the parent container
        objectFit="cover" // Ensures the image covers the entire area
        quality={100} // Optional: Increases image quality
        className="absolute inset-0 z-0"
      />

      {/* Overlayed content with animations */}

      <div className="absolute inset-0 flex flex-col items-start justify-center text-left text-white z-10 p-4 w-full min-w-[300px] min-h-[100vh]">
        <div className='absolute flex justify-center inset-0 h-fit mt-10 '>
          <AnimatedSearchBar/>
        </div>
        <div className="mine">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold animate-fadeIn">
            <div className="logo flex p-5">
              <p className="text-red-600 font-extrabold border border-red-600 text-2xl sm:text-3xl md:text-4xl font-sans pl-2">
                Smile-
              </p>
              <p className="bg-red-600 font-extrabold font-sans text-2xl sm:text-3xl md:text-4xl text-white px-2">
                Food
              </p>
            </div>
          </h1>
          <div className="mt-4 w-[90%] md:w-[50vw] text-[14px] sx:text-[16px] sm:text-sm md:text-lg lg:text-xl xl:text-2xl animate-slideInUp">
            Smile-Food delivers your favorite meals fast and reliably  connecting you with top local restaurants. Whether it &lsquo;s a burger,salad or sushi , we have got you covered with just a few taps!
          <div className="text-left">
           <Link href={"/signup"}>
           <button className='animate-slideInUp bg-red-600 mt-6 rounded-md py-1 px-2 text-lg font-bold'>
              Get Started
            </button></Link>
          </div>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default Hero;
