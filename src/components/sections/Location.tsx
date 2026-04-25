import { MapPin, Navigation, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { ADDRESS, DISTANCES } from "@/lib/constants";

const distanceItems = [
  { ...DISTANCES.cedarPoint, icon: Navigation },
  { ...DISTANCES.kalahari, icon: Navigation },
  { ...DISTANCES.lakeErie, icon: Navigation },
];

export default function Location() {
  return (
    <section id="location" className="py-20 bg-amber-50">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading>Find Us on Milan Road</SectionHeading>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-xl overflow-hidden shadow-sm min-h-[400px]">
            <iframe
              title="Sleep Inn Sandusky location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.5!2d-82.68!3d41.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDI1JzEyLjAiTiA4MsKwNDAnNDguMCJX!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="w-6 h-6 text-sky-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 text-lg">Our Address</h3>
                <p className="text-slate-500">{ADDRESS.full}</p>
              </div>
            </div>

            <h3 className="font-semibold text-slate-900 text-lg mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-sky-500" />
              Key Distances
            </h3>
            <div className="space-y-3">
              {distanceItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <item.icon className="w-5 h-5 text-sky-500" />
                  <span className="font-medium text-slate-900">{item.label}</span>
                  <span className="text-slate-500 ml-auto">{item.time}{"miles" in item && item.miles ? ` (${item.miles})` : ""}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
