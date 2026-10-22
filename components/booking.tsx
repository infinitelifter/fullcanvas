"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { Content } from "@/lib/content";
import type { Locale } from "@/lib/routes";
import BookingModal from "@/components/booking-modal";

/**
 * One booking modal per page, opened from anywhere. Server-rendered sections
 * (service pages, the demo page) use <BookButton>; client sections can call
 * useBooking() directly. Keeps the modal state out of every page component.
 */
const BookingContext = createContext<() => void>(() => {});

export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({
  t,
  locale,
  children,
}: {
  t: Content;
  locale: Locale;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const openBooking = useCallback(() => setOpen(true), []);

  return (
    <BookingContext.Provider value={openBooking}>
      {children}
      <BookingModal open={open} onClose={() => setOpen(false)} t={t} lang={locale} />
    </BookingContext.Provider>
  );
}

export function BookButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const openBooking = useBooking();
  return (
    <button type="button" onClick={openBooking} className={className}>
      {children}
    </button>
  );
}
