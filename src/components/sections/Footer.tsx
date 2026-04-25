import { Phone } from "lucide-react";
import TrackingButton from "@/components/ui/TrackingButton";
import {
  HOTEL_NAME,
  PHONE_NUMBER,
  PHONE_DISPLAY,
  BOOKING_URL,
  ADDRESS,
  NAV_LINKS,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <p className="text-slate-400 text-sm mb-2">{ADDRESS.full}</p>
            <p className="text-slate-400 text-sm mb-2">
              <a href={`tel:${PHONE_NUMBER}`} className="hover:text-white transition-colors">
                {PHONE_DISPLAY}
              </a>
            </p>
            <p className="text-slate-400 text-sm">
              <a href="mailto:info@qualityinnsandusky.com" className="hover:text-white transition-colors">
                info@qualityinnsandusky.com
              </a>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-400 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Book Your Stay</h3>
            <div className="flex flex-col gap-3">
              <TrackingButton
                variant="solid"
                color="orange"
                href={`tel:${PHONE_NUMBER}`}
                icon={<Phone className="w-4 h-4" />}
                buttonType="phone"
              >
                Call to Save 15%
              </TrackingButton>
              <TrackingButton
                variant="outline"
                color="sky"
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                buttonType="booking"
              >
                Book on Booking
              </TrackingButton>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} {HOTEL_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
