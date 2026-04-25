import { Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const reviews = [
  {
    quote: "Perfect location for our Cedar Point trip! The kids loved the pool, and the free breakfast saved us so much money. Will definitely be back!",
    name: "Sarah M.",
    date: "July 2025",
  },
  {
    quote: "Clean rooms, friendly staff, and you can't beat the price for how close it is to Cedar Point. The 15% phone discount was a great deal.",
    name: "James R.",
    date: "August 2025",
  },
  {
    quote: "We stayed here for three nights and had a wonderful experience. Breakfast was hot and fresh every morning. Great value for families!",
    name: "Linda K.",
    date: "June 2025",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading>What Our Guests Say</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.name} className="bg-slate-50 rounded-xl p-6">
              <Stars />
              <blockquote className="text-slate-700 text-sm leading-relaxed mb-4">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <div className="text-sm">
                <span className="font-semibold text-slate-900">{review.name}</span>
                <span className="text-slate-400 ml-2">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
