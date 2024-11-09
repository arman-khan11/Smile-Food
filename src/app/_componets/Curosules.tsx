// Carousele.tsx
"use client";
import React, { useState, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Define type for image URLs
const imageUrls: string[] = [
  "/chicken 4.png",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/6.jpeg",
];

const Carousele: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Automatically change the slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 3000); // 3-second interval

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Function to go to the next slide
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  }, []);

  // Function to go to the previous slide
  const goToPrevious = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  }, []);

  return (
    <div className="w-full max-w-full mx-auto overflow-hidden">
      <Carousel className="relative">
        {/* Carousel Content: sliding section */}
        <CarouselContent
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {imageUrls.map((url, index) => (
            <CarouselItem key={index} className="flex-shrink-0 w-full">
              <div className="border border-gray-300 rounded-lg overflow-hidden w-full h-full">
                <Card className="p-0">
                  <CardContent className="flex justify-center p-0">
                    <Image
                      src={url}
                      alt={`Slide ${index + 1}`}
                      width={600} // Full width of the carousel
                      height={400} // Adjusted height for consistency
                      quality={100}
                      loading={index === 0 ? "eager" : "lazy"} // Prioritize first image
                      priority={index === 0} // Priority only for the first image
                      className="object-cover w-full h-[240px] rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Navigation */}
        <CarouselPrevious
          onClick={goToPrevious}
          aria-label="Previous Slide"
          className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10"
        />
        <CarouselNext
          onClick={goToNext}
          aria-label="Next Slide"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10"
        />
      </Carousel>
    </div>
  );
};

export default memo(Carousele); // Memoize for better performance
