"use client";

import { useState, useEffect } from "react";
import { DiscountPopup } from "../DiscountPopup";

export function ExamResultsPopupTrigger() {
  const [isDiscountPopupOpen, setIsDiscountPopupOpen] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem('discount_popup_shown');
    if (!shown) {
      // Small delay for smooth entrance
      const timer = setTimeout(() => {
        setIsDiscountPopupOpen(true);
        localStorage.setItem('discount_popup_shown', 'true');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isDiscountPopupOpen) return null;

  return (
    <DiscountPopup onClose={() => setIsDiscountPopupOpen(false)} />
  );
}
