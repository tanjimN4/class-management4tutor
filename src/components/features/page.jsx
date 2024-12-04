import {
  BarChartHorizontal,
  BatteryCharging,
  CircleHelp,
  Layers,
  WandSparkles,
  ZoomIn,
  BookUser,
  BellRing,
  Shield,
} from "lucide-react";

const reasons = [
  {
    title: "Class Management",
    description:
      "Class management is about organizing activities, resources, and interactions to create an effective learning environment. It includes tasks like planning lessons, tracking attendance, managing behavior, and fostering engagement. Digital tools can simplify these processes, making teaching more efficient and organized.",
    icon: <ZoomIn className="size-6" />,
  },
  {
    title: "Create and edit classes effortlessly",
    description:
      "Effortlessly create, edit, and organize your classes with flexibility and precision. Tailor your lessons, schedules, and resources to suit your teaching style and student needs, ensuring a smooth and efficient management process from start to finish.",
    icon: <BarChartHorizontal className="size-6" />,
  },
  {
    title: "Attendance Tracking",
    description:
      "Simplify attendance tracking with easy-to-use tools that help you monitor student participation and maintain accurate records. Save time and stay organized with automated features that make managing attendance effortless.",
    icon: <BookUser className="size-6" />,
  },
  {
    title: "Notifications",
    description:
      "Stay connected and informed with real-time notifications. Keep students and parents updated on class schedules, assignments, and important announcements, ensuring everyone is on the same page and nothing is missed.",
    icon: <BellRing className="size-6" />,
  },
  {
    title: "Secure Materials Sharing",
    description:
      "Share course materials securely with confidence. Protect your content while providing students with easy access to essential resources, ensuring that all files are safely distributed and only accessible to the right individuals.",
    icon: <Shield className="size-6" />,
  },
  {
    title: "Efficiency",
    description:
      "Boost your teaching efficiency with streamlined tools that simplify class management, reduce administrative tasks, and save you valuable time. Focus more on engaging with students and less on paperwork, ensuring a smoother, more productive workflow.",
    icon: <BatteryCharging className="size-6" />,
  },
];

const Features = () => {
  return (
    <section className="py-32 mx-5">
      <div className="container">
        <div className="mb-10 md:mb-20">
          <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">
            Why Work With Us?
          </h2>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <div key={i} className="flex flex-col">
              <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent">
                {reason.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
