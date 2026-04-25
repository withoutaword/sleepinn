"use client";

import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import TrackingButton from "@/components/ui/TrackingButton";
import { NAV_LINKS, PHONE_NUMBER, BOOKING_URL } from "@/lib/constants";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 font-bold text-lg text-slate-900">
          <div className="w-8 h-8 bg-sky-500 rounded-md" />
          Sleep Inn
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-sky-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <TrackingButton variant="outline" color="sky" href={BOOKING_URL} target="_blank" rel="noopener noreferrer" buttonType="booking">
            Book on Booking
          </TrackingButton>
          <TrackingButton variant="solid" color="orange" href={`tel:${PHONE_NUMBER}`} icon={<Phone className="w-4 h-4" />} buttonType="phone">
            Call to Save 15%
          </TrackingButton>
        </div>

        <button
          className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 flex flex-col items-center pt-8 gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-slate-700 hover:text-sky-500"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4 w-full px-8">
            <TrackingButton variant="outline" color="sky" href={BOOKING_URL} target="_blank" rel="noopener noreferrer" buttonType="booking">
              Book on Booking
            </TrackingButton>
            <TrackingButton variant="solid" color="orange" href={`tel:${PHONE_NUMBER}`} icon={<Phone className="w-4 h-4" />} buttonType="phone">
              Call to Save 15%
            </TrackingButton>
          </div>
        </div>
      )}
    </header>
  );
}
