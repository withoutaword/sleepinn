import { Users, Maximize, Coffee, Tv } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import TrackingButton from "@/components/ui/TrackingButton";
import { BOOKING_URL } from "@/lib/constants";

const rooms = [
  {
    name: "Standard King",
    image: "/images/room-king.jpg",
    description: "A cozy room with a king-size bed, perfect for couples or solo travelers.",
    features: [
      { icon: Users, label: "Sleeps 2" },
      { icon: Maximize, label: "300 sq ft" },
      { icon: Coffee, label: "Coffee maker" },
      { icon: Tv, label: "Flat-screen TV" },
    ],
  },
  {
    name: "Double Queen (Family)",
    image: "/images/room-queen.jpg",
    description: "Spacious room with two queen beds — ideal for families visiting Cedar Point.",
    features: [
      { icon: Users, label: "Sleeps 4" },
      { icon: Maximize, label: "350 sq ft" },
      { icon: Coffee, label: "Coffee maker" },
      { icon: Tv, label: "Flat-screen TV" },
    ],
  },
  {
    name: "King Suite",
    image: "/images/room-suite.jpg",
    description: "Our most spacious option with a separate living area for extra comfort.",
    features: [
      { icon: Users, label: "Sleeps 3" },
      { icon: Maximize, label: "450 sq ft" },
      { icon: Coffee, label: "Mini fridge" },
      { icon: Tv, label: "Flat-screen TV" },
    ],
  },
];

export default function Rooms() {
  return (
    <section id="rooms" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading>Comfortable Rooms for the Whole Family</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div key={room.name} className="border border-slate-200 rounded-xl overflow-hidden">
              <img src={room.image} alt={room.name} className="h-48 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{room.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{room.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {room.features.map((feat) => (
                    <div key={feat.label} className="flex items-center gap-2 text-sm text-slate-600">
                      <feat.icon className="w-4 h-4 text-sky-500" />
                      {feat.label}
                    </div>
                  ))}
                </div>
                <TrackingButton variant="outline" color="sky" href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="w-full" buttonType="booking">
                  View on Booking
                </TrackingButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
