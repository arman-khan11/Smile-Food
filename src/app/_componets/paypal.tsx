"use client";
import { useEffect, useState } from "react";

interface PayPalButtonProps {
  totalPrice: number;
  onSuccess: (details: PayPalOrderDetails) => void;
}

interface PayPalOrderDetails {
  id: string;
  status: string;
  payer: {
    name: { given_name: string };
  };
  purchase_units: Array<{
    amount: { value: string };
  }>;
}

interface CreateOrderActions {
  order: {
    create: (data: { purchase_units: Array<{ amount: { value: string } }> }) => Promise<string>;
  };
}

interface OnApproveActions {
  order: {
    capture: () => Promise<PayPalOrderDetails>;
  };
}

declare global {
  interface Window {
    paypal?: {
      Buttons: (options: {
        createOrder: (_data: unknown, actions: CreateOrderActions) => Promise<string>;
        onApprove: (_data: unknown, actions: OnApproveActions) => Promise<void>;
        onError: (error: unknown) => void;
      }) => { render: (id: string) => void };
    };
  }
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ totalPrice, onSuccess }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPayPalScript = () => {
      const existingScript = document.getElementById("paypal-sdk");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=Ac0Y8NCSMDBkq1yVr0vWbPPBHwv8hrxcuucBzeHFXuHb1MXXPUqBMnm__D_4LkiPg5JRZjPVP1FwCBWp`;
        script.id = "paypal-sdk";
        script.async = true;
        script.onload = initializePayPalButton;
        document.body.appendChild(script);
      } else {
        initializePayPalButton();
      }
    };

    const initializePayPalButton = () => {
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: (_data, actions) => {
            return actions.order.create({
              purchase_units: [
                { amount: { value: totalPrice.toFixed(2) } },
              ],
            });
          },
          onApprove: async (_data, actions) => {
            const details = await actions.order.capture();
            onSuccess(details);
          },
          onError: (err) => {
            console.error("PayPal Checkout Error:", err);
            setError("An error occurred during payment. Please try again.");
          },
        }).render("#paypal-button-container");
      }
    };

    loadPayPalScript();

    return () => {
      const buttonContainer = document.getElementById("paypal-button-container");
      if (buttonContainer) {
        buttonContainer.innerHTML = ""; // Cleanup PayPal button on unmount
      }
    };
  }, [totalPrice, onSuccess]);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default PayPalButton;
