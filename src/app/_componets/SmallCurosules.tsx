"use client";
import React, { useState } from "react";
import Image from "next/image";
import Footer from "./Footer";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { UserContext } from "../context/User/UserConext";

// Replace with your actual image URLs
const imageUrls: string[] = [
  "/1.jpg",
  "/pizza 1.png",
  "/pasta 3.png",
  "/3.jpg",
  "/sandvich 2.png",
  "/tacos 1.png",
  "/5.jpg",
];
const fastFoodTitles: string[] = [
  "Burger",
  "Pizza",
  "Pasta",
  "Fried Chicken",
  "Sandwich",
  "Taco",
  "Hot Dog",
];

const products = [
  {
    id: 1,
    title: " Crispy Chicken Burger",
    price: 10,
    imageUrl: "/burger1.png",
  },
  { id: 2, title: "Classic Beef Burger", price: 10, imageUrl: "/burger2.png" },
  { id: 3, title: " Burger with Fries", price: 10, imageUrl: "/burger 3.png" },
  { id: 4, title: "Double Cheeseburger", price: 10, imageUrl: "/burger 4.png" },
];
const products2 = [
  { id: 1, title: "Veggie Delight Pizza", price: 10, imageUrl: "/pizza 1.png" },
  { id: 2, title: "Pepperoni Pizza", price: 10, imageUrl: "/pizza 2.png" },
  { id: 3, title: "Hawaiian Pizza", price: 10, imageUrl: "/pizza 3.png" },
  { id: 4, title: "BBQ Chicken Pizza ", price: 10, imageUrl: "/pizza 4.png" },
];
const products3 = [
  { id: 1, title: "Fettuccine Alfredo", price: 10, imageUrl: "/pasta 1.png" },
  { id: 2, title: "Spaghetti Marinara", price: 10, imageUrl: "/pasta 2.png" },
  { id: 3, title: "Spaghetti Bolognese", price: 10, imageUrl: "/pasta 3.png" },
  { id: 4, title: "Penne Arrabbiata", price: 10, imageUrl: "/pasta 4.png" },
];
const products4 = [
  {
    id: 1,
    title: "Crispy Fried Chicken with Fries",
    price: 10,
    imageUrl: "/chicken 1.png",
  },
  {
    id: 2,
    title: "Bucket of Fried Chicken",
    price: 10,
    imageUrl: "/chicken 2.png",
  },
  {
    id: 3,
    title: "Spicy Fried Chicken on Lettuce",
    price: 10,
    imageUrl: "/chicken 3.png",
  },
  {
    id: 4,
    title: "Grilled Chicken Platter with Fries",
    price: 10,
    imageUrl: "/chicken 4.png",
  },
];
const products5 = [
  {
    id: 1,
    title: "Grilled Veggie Sandwich",
    price: 10,
    imageUrl: "/sandvich 1.png",
  },
  {
    id: 2,
    title: "Submarine Veggie Sandwich",
    price: 10,
    imageUrl: "/sandvich 2.png",
  },
  { id: 3, title: "Club Sandwich", price: 10, imageUrl: "/sandvich 3.png" },
  {
    id: 4,
    title: "Grilled Chicken Panini",
    price: 10,
    imageUrl: "/sandvich 4.png",
  },
];
const products6 = [
  {
    id: 1,
    title: "Classic Chicken Tacos",
    price: 10,
    imageUrl: "/tacos 1.png",
  },
  { id: 2, title: "Beef Burrito Wrap", price: 10, imageUrl: "/tacos 2.png" },
  { id: 3, title: "Spicy Beef Tacos", price: 10, imageUrl: "/tacos 3.png" },
  { id: 4, title: "Avocado Fiesta Tacos", price: 10, imageUrl: "/tacos 4.png" },
];
const products7 = [
  {
    id: 1,
    title: "Spicy Sausage Delight",
    price: 10,
    imageUrl: "/hotDog 1.png",
  },
  { id: 2, title: "BBQ Beef Supreme", price: 10, imageUrl: "/hotDog 2.png" },
  {
    id: 3,
    title: "Classic Italian Sausage",
    price: 10,
    imageUrl: "/hotDog3.png",
  },
  { id: 4, title: "Double Sausage Combo", price: 10, imageUrl: "/hotDog4.png" },
];

// Initial cart counts set to 1 for each product by ID
const initialCounts = products.reduce((counts, product) => {
  counts[product.id] = 1;
  return counts;
}, {} as { [id: number]: number });

const SmallCarousel: React.FC = () => {
  const userContext = React.useContext(UserContext);
  const email = userContext?.user?.email;

  // Use individual cart count state for each product by ID
  const [cartCounts, setCartCounts] = useState<{ [id: number]: number }>(
    initialCounts
  );
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0);

  const handleCart = async (
    quantity: number,
    price: number,
    productId: number,
    imageUrl: string
  ) => {
    const details = {
      Email: email,
      productId,
      quantity,
      price,
      imageUrl,
    };
    try {
      
      const res = await axios.post("/api/users/cartDetails", details);
      console.log(res.data);
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error);
    }
  };

  // Render each product with independent cart count controls
  const content = [
    <div
      key="products-content" // Key for the outer container
      className="flex gap-2 justify-start sm:justify-start xs:justify-center  flex-wrap sx:flex-nowrap sm:gap-4 animate-fade-in"
    >
      {products.map((product) => (
        <div
          key={product.id} // Use product.id as the key here
          className="bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 duration-300 ease-in-out max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
        >
          <div className="flex justify-center">
            <div className="h-[15vh] xs:w-[35vw]  sx:w-[17vw] object-cover sm:h-[20vh] md:h-[25vh] lg:h-[30vh] xl:h-[35vh]">
              <Image
                src={product.imageUrl}
                alt={product.title}
                height={600}
                width={600}
                className=" object-contain bg-gray-300 h-full rounded-lg"
              />
            </div>
          </div>

          {/* Cart Controls */}
          <div className="flex items-center justify-center space-x-2 mt-2">
            <Button
              onClick={() =>
                setCartCounts((prevCounts) => ({
                  ...prevCounts,
                  [product.id]: Math.max(1, prevCounts[product.id] - 1),
                }))
              }
              className="bg-gray-700  hover:bg-gray-300 transition-all  w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            >
              -
            </Button>
            <span className="text-sm md:text-lg lg:text-xl font-semibold">
              {cartCounts[product.id]}
            </span>
            <Button
              onClick={() =>
                setCartCounts((prevCounts) => ({
                  ...prevCounts,
                  [product.id]: prevCounts[product.id] + 1,
                }))
              }
              className="bg-gray-700  hover:bg-gray-300 transition-all  w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            >
              +
            </Button>
          </div>

          <p className="mt-2 text-[11px] font-bold text-gray-700 h-10">
            {product.title}
          </p>

          
            <div className="flex justify-around items-center"><span className="text-[12px] ">
              Price: ${product.price}
            </span>
            <Button
              onClick={() => {
                handleCart(
                  cartCounts[product.id],
                  product.price,
                  product.id,
                  product.imageUrl
                );
              }}
              className="bg-red-600"
            >
              Add 
            </Button></div>
          </div>
      ))}
    </div>,
    <div
      key="products-content" // Key for the outer container
      className="flex gap-2 justify-start sm:justify-stat  flex-wrap sx:flex-nowrap sm:gap-4 animate-fade-in"
    >
      {products2.map((product) => (
        <div
          key={product.id} // Use product.id as the key here
          className="bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 duration-300 ease-in-out max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
        >
          <div className="flex justify-center">
            <div className="h-[15vh] xs:w-[35vw]  sx:w-[17vw] object-cover sm:h-[20vh] md:h-[25vh] lg:h-[30vh] xl:h-[35vh]">
              <Image
                src={product.imageUrl}
                alt={product.title}
                height={600}
                width={600}
                className=" object-contain bg-gray-300 h-full rounded-lg"
              />
            </div>
          </div>

          {/* Cart Controls */}
          <div className="flex items-center justify-center space-x-2 mt-2">
            <Button
              onClick={() =>
                setCartCounts((prevCounts) => ({
                  ...prevCounts,
                  [product.id]: Math.max(1, prevCounts[product.id] - 1),
                }))
              }
              className="bg-gray-700  hover:bg-gray-300 transition-all  w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            >
              -
            </Button>
            <span className="text-sm md:text-lg lg:text-xl font-semibold">
              {cartCounts[product.id]}
            </span>
            <Button
              onClick={() =>
                setCartCounts((prevCounts) => ({
                  ...prevCounts,
                  [product.id]: prevCounts[product.id] + 1,
                }))
              }
              className="bg-gray-700  hover:bg-gray-300 transition-all  w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            >
              +
            </Button>
          </div>

          <p className="mt-2 text-[11px] font-bold text-gray-700 h-10">
            {product.title}
          </p>

          <div className="flex justify-around items-center"><span className="text-[12px] ">
              Price: ${product.price}
            </span>
            <Button
              onClick={() => {
                handleCart(
                  cartCounts[product.id],
                  product.price,
                  product.id,
                  product.imageUrl
                );
              }}
              className="bg-red-600"
            >
              Add 
            </Button></div>
        </div>
      ))}
    </div>,
    <div
      key="products-content" // Key for the outer container
      className="flex gap-2 justify-start sm:justify-start xs:justify-center  flex-wrap sx:flex-nowrap sm:gap-4 animate-fade-in"
    >
      {products3.map((product) => (
        <div
          key={product.id} // Use product.id as the key here
          className="bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 duration-300 ease-in-out max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
        >
          <div className="flex justify-center">
            <div className="h-[15vh] xs:w-[35vw]  sx:w-[17vw] object-cover sm:h-[20vh] md:h-[25vh] lg:h-[30vh] xl:h-[35vh]">
              <Image
                src={product.imageUrl}
                alt={product.title}
                height={600}
                width={600}
                className=" object-contain bg-gray-300 h-full rounded-lg"
              />
            </div>
          </div>

          {/* Cart Controls */}
          <div className="flex items-center justify-center space-x-2 mt-2">
            <Button
              onClick={() =>
                setCartCounts((prevCounts) => ({
                  ...prevCounts,
                  [product.id]: Math.max(1, prevCounts[product.id] - 1),
                }))
              }
              className="bg-gray-700  hover:bg-gray-300 transition-all  w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            >
              -
            </Button>
            <span className="text-sm md:text-lg lg:text-xl font-semibold">
              {cartCounts[product.id]}
            </span>
            <Button
              onClick={() =>
                setCartCounts((prevCounts) => ({
                  ...prevCounts,
                  [product.id]: prevCounts[product.id] + 1,
                }))
              }
              className="bg-gray-700  hover:bg-gray-300 transition-all  w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            >
              +
            </Button>
          </div>

          <p className="mt-2 text-[11px] font-bold text-gray-700 h-10">
            {product.title}
          </p>

          <div>
            <div className="flex justify-around items-center"><span className="text-[12px] ">
              Price: ${product.price}
            </span>
            <Button
              onClick={() => {
                handleCart(
                  cartCounts[product.id],
                  product.price,
                  product.id,
                  product.imageUrl
                );
              }}
              className="bg-red-600"
            >
              Add 
            </Button></div>
          </div>
        </div>
      ))}
    </div>,
    <div
      key="products-content" // Key for the outer container
      className="flex gap-2 justify-start sm:justify-start xs:justify-center  flex-wrap sx:flex-nowrap sm:gap-4 animate-fade-in"
    >
      {products4.map((product) => (
        <div
          key={product.id} // Use product.id as the key here
          className="bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 duration-300 ease-in-out max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
        >
          <div className="flex justify-center">
            <div className="h-[15vh] xs:w-[35vw]  sx:w-[17vw] object-cover sm:h-[20vh] md:h-[25vh] lg:h-[30vh] xl:h-[35vh]">
              <Image
                src={product.imageUrl}
                alt={product.title}
                height={600}
                width={600}
                className=" object-contain bg-gray-300 h-full rounded-lg"
              />
            </div>
          </div>

          {/* Cart Controls */}
          <div className="flex items-center justify-center space-x-2 mt-2">
            <Button
              onClick={() =>
                setCartCounts((prevCounts) => ({
                  ...prevCounts,
                  [product.id]: Math.max(1, prevCounts[product.id] - 1),
                }))
              }
              className="bg-gray-700  hover:bg-gray-300 transition-all  w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            >
              -
            </Button>
            <span className="text-sm md:text-lg lg:text-xl font-semibold">
              {cartCounts[product.id]}
            </span>
            <Button
              onClick={() =>
                setCartCounts((prevCounts) => ({
                  ...prevCounts,
                  [product.id]: prevCounts[product.id] + 1,
                }))
              }
              className="bg-gray-700  hover:bg-gray-300 transition-all  w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            >
              +
            </Button>
          </div>

          <p className="mt-2 text-[11px] font-bold text-gray-700 h-10">
            {product.title}
          </p>

          <div>
            <div className="flex justify-around items-center"><span className="text-[12px] ">
              Price: ${product.price}
            </span>
            <Button
              onClick={() => {
                handleCart(
                  cartCounts[product.id],
                  product.price,
                  product.id,
                  product.imageUrl
                );
              }}
              className="bg-red-600"
            >
              Add 
            </Button></div>
          </div>
        </div>
      ))}
    </div>,
    <div
      key="products-content" // Key for the outer container
      className="flex gap-2 justify-start sm:justify-start xs:justify-center  flex-wrap sx:flex-nowrap sm:gap-4 animate-fade-in"
    >
      {products5.map((product) => (
        <div
          key={product.id} // Use product.id as the key here
          className="bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 duration-300 ease-in-out max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
        >
          <div className="flex justify-center">
            <div className="h-[15vh] xs:w-[35vw]  sx:w-[17vw] object-cover sm:h-[20vh] md:h-[25vh] lg:h-[30vh] xl:h-[35vh]">
              <Image
                src={product.imageUrl}
                alt={product.title}
                height={600}
                width={600}
                className=" object-contain bg-gray-300 h-full rounded-lg"
              />
            </div>
          </div>

          {/* Cart Controls */}
          <div className="flex items-center justify-center space-x-2 mt-2">
            <Button
              onClick={() =>
                setCartCounts((prevCounts) => ({
                  ...prevCounts,
                  [product.id]: Math.max(1, prevCounts[product.id] - 1),
                }))
              }
              className="bg-gray-700  hover:bg-gray-300 transition-all  w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            >
              -
            </Button>
            <span className="text-sm md:text-lg lg:text-xl font-semibold">
              {cartCounts[product.id]}
            </span>
            <Button
              onClick={() =>
                setCartCounts((prevCounts) => ({
                  ...prevCounts,
                  [product.id]: prevCounts[product.id] + 1,
                }))
              }
              className="bg-gray-700  hover:bg-gray-300 transition-all  w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            >
              +
            </Button>
          </div>

          <p className="mt-2 text-[11px] font-bold text-gray-700 h-10">
            {product.title}
          </p>

          <div>
            <div className="flex justify-around items-center"><span className="text-[12px] ">
              Price: ${product.price}
            </span>
            <Button
              onClick={() => {
                handleCart(
                  cartCounts[product.id],
                  product.price,
                  product.id,
                  product.imageUrl
                );
              }}
              className="bg-red-600"
            >
              Add 
            </Button></div>
          </div>
        </div>
      ))}
    </div>,
    <div
      key="products-content" // Key for the outer container
      className="flex gap-2 justify-start sm:justify-start xs:justify-center  flex-wrap sx:flex-nowrap sm:gap-4 animate-fade-in"
    >
      {products6.map((product) => (
        <div
          key={product.id} // Use product.id as the key here
          className="bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 duration-300 ease-in-out max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
        >
          <div className="flex justify-center">
            <div className="h-[15vh] xs:w-[35vw]  sx:w-[17vw] object-cover sm:h-[20vh] md:h-[25vh] lg:h-[30vh] xl:h-[35vh]">
              <Image
                src={product.imageUrl}
                alt={product.title}
                height={600}
                width={600}
                className=" object-contain bg-gray-300 h-full rounded-lg"
              />
            </div>
          </div>

          {/* Cart Controls */}
          <div className="flex items-center justify-center space-x-2 mt-2">
            <Button
              onClick={() =>
                setCartCounts((prevCounts) => ({
                  ...prevCounts,
                  [product.id]: Math.max(1, prevCounts[product.id] - 1),
                }))
              }
              className="bg-gray-700  hover:bg-gray-300 transition-all  w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            >
              -
            </Button>
            <span className="text-sm md:text-lg lg:text-xl font-semibold">
              {cartCounts[product.id]}
            </span>
            <Button
              onClick={() =>
                setCartCounts((prevCounts) => ({
                  ...prevCounts,
                  [product.id]: prevCounts[product.id] + 1,
                }))
              }
              className="bg-gray-700  hover:bg-gray-300 transition-all  w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            >
              +
            </Button>
          </div>

          <p className="mt-2 text-[11px] font-bold text-gray-700 h-10">
            {product.title}
          </p>

          <div>
            <div className="flex justify-around items-center"><span className="text-[12px] ">
              Price: ${product.price}
            </span>
            <Button
              onClick={() => {
                handleCart(
                  cartCounts[product.id],
                  product.price,
                  product.id,
                  product.imageUrl
                );
              }}
              className="bg-red-600"
            >
              Add 
            </Button></div>
          </div>
        </div>
      ))}
    </div>,
    <div
      key="products-content" // Key for the outer container
      className="flex gap-2 justify-start sm:justify-start xs:justify-center  flex-wrap sx:flex-nowrap sm:gap-4 animate-fade-in"
    >
      {products7.map((product) => (
        <div
          key={product.id} // Use product.id as the key here
          className="bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 duration-300 ease-in-out max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
        >
          <div className="flex justify-center">
            <div className="h-[15vh] xs:w-[35vw]  sx:w-[17vw] object-cover sm:h-[20vh] md:h-[25vh] lg:h-[30vh] xl:h-[35vh]">
              <Image
                src={product.imageUrl}
                alt={product.title}
                height={600}
                width={600}
                className=" object-contain bg-gray-300 h-full rounded-lg"
              />
            </div>
          </div>

          {/* Cart Controls */}
          <div className="flex items-center justify-center space-x-2 mt-2">
            <Button
              onClick={() =>
                setCartCounts((prevCounts) => ({
                  ...prevCounts,
                  [product.id]: Math.max(1, prevCounts[product.id] - 1),
                }))
              }
              className="bg-gray-700  hover:bg-gray-300 transition-all  w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            >
              -
            </Button>
            <span className="text-sm md:text-lg lg:text-xl font-semibold">
              {cartCounts[product.id]}
            </span>
            <Button
              onClick={() =>
                setCartCounts((prevCounts) => ({
                  ...prevCounts,
                  [product.id]: prevCounts[product.id] + 1,
                }))
              }
              className="bg-gray-700  hover:bg-gray-300 transition-all  w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            >
              +
            </Button>
          </div>

          <p className="mt-2 text-[11px] font-bold text-gray-700 h-10">
            {product.title}
          </p>

          <div>
            <div className="flex justify-around items-center"><span className="text-[12px] ">
              Price: ${product.price}
            </span>
            <Button
              onClick={() => {
                handleCart(
                  cartCounts[product.id],
                  product.price,
                  product.id,
                  product.imageUrl
                );
              }}
              className="bg-red-600"
            >
              Add 
            </Button></div>
          </div>
        </div>
      ))}
    </div>,
  ];

  return (
    <div className="max-h-screen bg-gray-200">
      <div className="w-full h-32 p-2 overflow-hidden">
        <div className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-300">
          {imageUrls.map((url) => (
            <div
              key={url} // Use the URL as the key here
              className={`flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center cursor-pointer ${
                selectedCardIndex === imageUrls.indexOf(url)
                  ? "bg-blue-200"
                  : ""
              }`}
              onClick={() => setSelectedCardIndex(imageUrls.indexOf(url))}
            >
              <Image
                src={url}
                alt={`Card image ${imageUrls.indexOf(url) + 1}`}
                width={600}
                height={600}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
      {selectedCardIndex !== null && (
        <div className="flex gap-2 mx-2 shadow-xl justify-center items-center text-gray-400 font-bold  bg-white h-12 rounded-md  mt-4">
          {fastFoodTitles[selectedCardIndex]}
        </div>
      )}

      {selectedCardIndex !== null && (
        <div className="flex gap-2 justify-start sm:justify-start  flex-wrap sx:flex-nowrap sm:gap-4 animate-fade-in  p-4 bg-gray-200 rounded-lg transition-all">
          {content[selectedCardIndex]}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SmallCarousel;
