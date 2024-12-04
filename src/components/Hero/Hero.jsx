import React from "react";
import { ArrowDownRight } from "lucide-react";


import { Button } from "@/components/ui/button";
import Image from "next/image";
const Hero = () => {
  return (
    <div className="mx-10">
      <section className="py-12 container mx-auto">
        <div className="container mx-auto border">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center  lg:items-start text-left">
              <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
                Empowering Tutors for seamless Teaching
              </h1>
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                Manage your classes efficiently by tracking attendance,
                organizing schedules, and sharing course materials all in one
                convenient platform. Simplify the process of engaging with
                students, distributing resources, and keeping everyone on the
                same page with a centralized hub designed to streamline your
                educational workflow.
              </p>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                <Button className="w-full sm:w-auto">Get Started</Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-[#3B82F6] text-white"
                >
                  Learn More
                  <ArrowDownRight className="ml-2 size-4" />
                </Button>
              </div>
            </div>
           
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
