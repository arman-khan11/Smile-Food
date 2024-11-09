"use client";
import axios from "axios";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "../context/User/UserConext";
import Header from "../_componets/Header";
import Footer from "../_componets/Footer";
import { Button } from "@/components/ui/button";
import PayPalButton from "../_componets/paypal";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

interface TransactionDetails {
  payer: { name: { given_name: string } };
}

const CartDisplay: React.FC = () => {
  const router = useRouter();
  const { user } = useContext(UserContext) || {};
  const Email = user?.email;

  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transactionCompleted, setTransactionCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCartDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/users/orderDetails", { Email });
      const cartItems = res.data.user.cart.items;
      const total = res.data.user.cart.totalPrice;

      const groupedItems = cartItems.reduce((acc: CartItem[], currentItem: CartItem) => {
        const existingItem = acc.find(item => item.imageUrl === currentItem.imageUrl);
        if (existingItem) {
          existingItem.quantity += currentItem.quantity;
        } else {
          acc.push({ ...currentItem });
        }
        return acc;
      }, []);

      setCartItem(groupedItems);
      setTotalPrice(total);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error fetching cart details:", error.message);
        setError("Failed to load cart details. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }, [Email]);

  useEffect(() => {
    if (Email) {
      getCartDetails();
    }
  }, [Email, getCartDetails]);

  const handleConfirmPayment = () => {
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handlePaymentSuccess = async (details: TransactionDetails) => {
    alert("Transaction completed by " + details.payer.name.given_name);
    setTransactionCompleted(true);

    try {
      await axios.post("/api/users/completeTransaction", { Email });
      setCartItem([]);
      setTotalPrice(0);
      router.push("/Delivery");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error saving transaction:", error);
        setError("Failed to save transaction details. Please contact support.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-200 min-h-screen">
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : cartItem.length > 0 ? (
            <>
              <div className="space-y-6">
                {cartItem.map((item, index) => (
                  <div
                    key={index}
                    className="hover:shadow-xl transition-all transform hover:scale-105 duration-300 ease-in-out flex items-center justify-between bg-white shadow-md p-4 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        height={600}
                        width={600}
                        src={item.imageUrl}
                        alt="Product Image"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-semibold">Product ID: {item.productId}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="font-semibold text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-8">
                <h2 className="text-2xl font-bold">Total Price: ${totalPrice.toFixed(2)}</h2>
                <Button onClick={handleConfirmPayment} className="bg-red-600 font-semibold py-2 px-4">
                  Proceed to Payment
                </Button>
              </div>

              {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
                  <div className="bg-white p-6 rounded-md ">
                    <h3 className="text-lg font-bold">Confirm Payment</h3>
                    <p>Are you sure you want to proceed to payment of ${totalPrice.toFixed(2)}?</p>
                    <div className="flex justify-between mt-4 max-h-[100vh] overflow-y-scroll scrollbar-hide ">
                      <Button onClick={handleCloseConfirmation} className="mr-2">
                        Cancel
                      </Button>
                      {totalPrice > 0 && (

                        <PayPalButton  totalPrice={totalPrice} onSuccess={handlePaymentSuccess} />
                      )}                 </div>
                  </div>
                </div>
              )}

              {transactionCompleted && <p className="text-green-600 mt-4">Transaction completed successfully!</p>}
            </>
          ) : (
            <p>No items in the cart.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartDisplay;
