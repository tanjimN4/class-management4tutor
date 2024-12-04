"use client"
import Link from "next/link";
import React from "react";


const servicesData = [
  {
    title: "Class Management",
    description:
      "Create, manage, and schedule classes with ease. Tutors can upload materials, track student performance, and engage with students in real-time.",
    icon: "📅",
  },
  {
    title: "Attendance Tracking",
    description:
      "Keep track of student attendance for each class, and ensure that your students are staying on track with their learning progress.",
    icon: "✅",
  },
  {
    title: "Student Feedback & Grades",
    description:
      "Provide personalized feedback and grades to your students. Monitor their performance and progress over time.",
    icon: "📝",
  },
  {
    title: "Payment Integration",
    description:
      "Integrate with payment systems like Stripe or PayPal to securely manage payments for your classes, ensuring a smooth payment process.",
    icon: "💳",
  },
];

const Services = () => {
  return (
    <div className="bg-white h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Home Link */}
        <Link
          href={'/'}
          className="text-indigo-600 text-lg font-medium mb-6 inline-block"
        >
          &#8592; Back to Home
        </Link>

        <h2 className="text-3xl font-semibold text-gray-900 mb-8">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <div className="text-4xl mb-4 text-indigo-600">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
