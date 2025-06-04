import {
  Search,
  ShoppingCart,
  Edit,
  UserPlus,
  GraduationCap,
  LogIn,
} from "lucide-react"; // Lucide for icons

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "1. Sign Up and Explore",
      description:
        "Create your account and browse through a wide range of courses available on our platform.",
      icon: <LogIn className="w-10 h-10 text-blue-500" />,
    },
    {
      id: 2,
      title: "2. Search and Select Courses",
      description:
        "Use our search functionality to find the courses that match your interest.",
      icon: <Search className="w-10 h-10 text-green-500" />,
    },
    {
      id: 3,
      title: "3. Purchase and Watch",
      description:
        "Purchase your desired course and start learning through high-quality video content.",
      icon: <ShoppingCart className="w-10 h-10 text-yellow-500" />,
    },
    {
      id: 4,
      title: "4. Complete and Achieve",
      description:
        "Complete the course and gain in-depth knowledge to enhance your skills..",
      icon: <GraduationCap className="w-10 h-10 text-purple-500" />,
    },
  ];

  return (
    <div className="bg-gray-200 py-12">
      <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">
        How It Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-12">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center p-6 rounded-lg  bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-center">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
