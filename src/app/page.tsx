import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Amenities from "@/components/sections/Amenities";
import Rooms from "@/components/sections/Rooms";
import CedarPointGuide from "@/components/sections/CedarPointGuide";
import Reviews from "@/components/sections/Reviews";
import Location from "@/components/sections/Location";
import Footer from "@/components/sections/Footer";
import MobileBottomBar from "@/components/ui/MobileBottomBar";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16 pb-16 lg:pb-0">
        <Hero />
        <Amenities />
        <Rooms />
        <CedarPointGuide />
        <Reviews />
        <Location />
      </main>
      <Footer />
      <MobileBottomBar />
    </>
  );
}
