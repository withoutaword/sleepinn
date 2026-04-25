"use client";

import { Search } from "lucide-react";
import { BOOKING_URL } from "@/lib/constants";

export default function Hero() {
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const checkin = (form.elements.namedItem("checkin") as HTMLInputElement).value;
    const checkout = (form.elements.namedItem("checkout") as HTMLInputElement).value;
    const bookingUrl = new URL(BOOKING_URL);
    bookingUrl.searchParams.set("checkin", checkin);
    bookingUrl.searchParams.set("checkout", checkout);
    const url = bookingUrl.toString();
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-slate-800">
      <img
        src="/images/hero.jpg"
        alt="Sleep Inn Sandusky hotel exterior"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <span className="inline-block bg-orange-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          Only 10 Minutes from Cedar Point!
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Your Perfect Basecamp for Cedar Point Adventures
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-8">
          Free hot breakfast · Indoor pool · Family-friendly rooms
        </p>

        <form
          onSubmit={handleSearch}
          className="bg-white rounded-xl p-4 shadow-lg flex flex-col md:flex-row items-stretch md:items-center gap-3"
        >
          <div className="flex-1">
            <label htmlFor="checkin" className="block text-xs font-medium text-slate-500 mb-1 text-left">
              Check-in
            </label>
            <input
              type="date"
              id="checkin"
              name="checkin"
              lang="en"
              required
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 min-h-[44px]"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="checkout" className="block text-xs font-medium text-slate-500 mb-1 text-left">
              Check-out
            </label>
            <input
              type="date"
              id="checkout"
              name="checkout"
              lang="en"
              required
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 min-h-[44px]"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="guests" className="block text-xs font-medium text-slate-500 mb-1 text-left">
              Guests
            </label>
            <select
              id="guests"
              name="guests"
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 min-h-[44px]"
            >
              <option>2 Adults</option>
              <option>1 Adult</option>
              <option>3 Adults</option>
              <option>4 Adults</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-6 py-2.5 min-h-[44px] flex items-center justify-center gap-2 transition-colors mt-auto"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
