import { UtensilsCrossed, Waves, Wifi, Car, PawPrint, Dumbbell } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const amenities = [
  {
    icon: UtensilsCrossed,
    title: "Free Hot Breakfast",
    description: "Start every morning with a complimentary hot breakfast buffet for the whole family.",
  },
  {
    icon: Waves,
    title: "Indoor Pool",
    description: "Cool off after a day at Cedar Point in our heated indoor pool, open year-round.",
  },
  {
    icon: Wifi,
    title: "Free Wi-Fi",
    description: "Stay connected with complimentary high-speed wireless internet throughout the hotel.",
  },
  {
    icon: Car,
    title: "Free Parking",
    description: "Generous free parking for cars, trucks, and SUVs right at the hotel.",
  },
  {
    icon: PawPrint,
    title: "Pet Friendly",
    description: "Your furry family members are welcome. Pet-friendly rooms available on request.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "Keep up your routine with our on-site fitness center, open 24 hours.",
  },
];

export default function Amenities() {
  return (
    <section id="amenities" className="py-20 bg-amber-50">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading>Everything You Need for a Great Stay</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm">
              <item.icon className="w-10 h-10 text-sky-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
