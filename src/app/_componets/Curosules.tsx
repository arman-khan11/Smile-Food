"use client"
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useState,useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Replace these with actual image paths
const imageUrls = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/6.jpeg",

  
];
const Carousele = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      }, 2000); // Change slide every 3 seconds
  
      return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);
    return (
      <div className="w-full max-w-full mx-auto overflow-hidden"> {/* Added overflow hidden */}
        <Carousel className="relative">
          <CarouselContent
            className="flex transition-transform duration-500" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }} 
          >
            {imageUrls.map((url, index) => (
              <CarouselItem key={index} className="flex-shrink-0 w-full"> {/* Use flex-shrink-0 to keep items at full width */}
                <div className="border border-gray-300 rounded-lg overflow-hidden w-full h-full">
                  <Card className="p-0">
                    <CardContent className="flex justify-center p-0"> {/* Removed inner padding */}
                      <Image 
                        src={url} 
                        alt={`Slide ${index + 1}`} 
                        width={1920}    // Full width of the carousel
                        height={240}    // Reduced height
                        className="object-cover w-full h-[240px] rounded-lg" // Fixed height for uniformity
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Carousel Navigation */}
          <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2" />
          <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2" />
        </Carousel>
      </div>
    );
  };
  
  export default Carousele;