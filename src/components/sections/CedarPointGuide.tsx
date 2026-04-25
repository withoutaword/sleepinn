import { MapPin, Clock, Utensils, Ruler, Sun, Ticket } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const tips = [
  {
    icon: MapPin,
    title: "Just 10 Minutes Away",
    description:
      "Sleep Inn Sandusky is only 5 miles from Cedar Point's main entrance via US-250. Quick drive, no highway tolls.",
  },
  {
    icon: Clock,
    title: "Best Times to Visit",
    description:
      "Weekdays in June and late August see shorter lines. Arrive at park opening for the shortest waits on top rides.",
  },
  {
    icon: Ruler,
    title: "Height Requirements",
    description:
      "Many rides require 48\" minimum. Check Cedar Point's website for ride-by-ride requirements before your trip.",
  },
  {
    icon: Sun,
    title: "What to Bring",
    description:
      "Sunscreen, comfortable shoes, a refillable water bottle, and a change of clothes for water rides.",
  },
  {
    icon: Utensils,
    title: "Nearby Dining",
    description:
      "Milan Road is lined with family restaurants — Olive Garden, Red Lobster, Applebee's, and local favorites all within 5 minutes.",
  },
  {
    icon: Ticket,
    title: "Nearby Attractions",
    description:
      "Kalahari Indoor Waterpark (15 min), Lake Erie shores (5 min), Put-in-Bay ferry (20 min).",
  },
];

export default function CedarPointGuide() {
  return (
    <section id="cedar-point-guide" className="py-20 bg-sky-50">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading>Your Cedar Point Survival Guide</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip) => (
            <article key={tip.title} className="bg-white rounded-xl p-6 shadow-sm">
              <tip.icon className="w-10 h-10 text-sky-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{tip.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{tip.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
