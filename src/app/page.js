import Footer from "@/components/Footer/Footer";


import Testimonial from "@/components/Testimonial/Testimonial";

import UpcomingClasses from "@/components/UpcomingClases/UpcomingClasses";
import Features from "./features/page";
import Nav from "@/components/Nav/nav";
import Hero from "@/components/Hero/Hero";



export default function Home() {
  return (
    <div className="bg-white">
      <Nav />
      {/* *Hero section  */}
      <div className="p-2"> <Hero /></div>
      {/**Features Section */}
      <div className="p-2">
        {" "}
        <UpcomingClasses />

      </div>
      {/**Upcoming Classes Section */}
      <div className="p-2">
        {" "}
        <Features />
      </div>
      {/**Upcoming Classes Section */}
      <div className="p-2 mb-10 mt-10">
        {" "}
        <Testimonial />
      </div>
      {/**Upcoming Classes Section */}
      <div className="p-2">
        {" "}
        <Footer />
      </div>
    </div>
  );
}
