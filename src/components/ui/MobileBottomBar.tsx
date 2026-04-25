"use client";

import { Phone } from "lucide-react";
import { PHONE_NUMBER } from "@/lib/constants";

export default function MobileBottomBar() {
  function handleClick() {
    navigator.sendBeacon(
      "/api/track-click",
      JSON.stringify({ buttonType: "phone" })
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-orange-500 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <a
        href={`tel:${PHONE_NUMBER}`}
        onClick={handleClick}
        className="flex items-center justify-center gap-2 py-4 text-white font-semibold text-lg min-h-[56px]"
      >
        <Phone className="w-5 h-5" />
        Call to Save 15%
      </a>
    </div>
  );
}
