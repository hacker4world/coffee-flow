import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmedPage = () => {
  const navigate = useNavigate();

  // After a short pause, fade out and return to the home screen.
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      document
        .getElementById("confirmation-root")
        ?.classList.add("opacity-0");
    }, 1600);

    const navTimer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 2200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div
      id="confirmation-root"
      className="relative w-full max-w-md mx-auto bg-gradient-to-b from-stone-100 to-amber-100 min-h-screen shadow-xl flex flex-col items-center justify-center px-6 transition-opacity duration-700"
    >
      {/* Animated check mark */}
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 52 52" className="h-full w-full">
          <circle
            cx="26"
            cy="26"
            r="24"
            fill="none"
            stroke="#b45309"
            strokeWidth="3"
            strokeLinecap="round"
            className="check-circle"
          />
          <path
            fill="none"
            stroke="#b45309"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 27l8 8 16-16"
            className="check-mark"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-display font-bold text-stone-800 tracking-tight mt-6">
        Order Confirmed!
      </h1>
      <p className="text-stone-500 mt-2 text-center">
        Thank you! Your coffee is being prepared. ☕
      </p>
    </div>
  );
};

export default OrderConfirmedPage;
