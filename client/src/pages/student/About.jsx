import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { School } from "lucide-react";
import React from "react";
import {
  FaLightbulb,
  FaUniversalAccess,
  FaAward,
  FaHandsHelping,
  FaUserGraduate,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="dark:bg-[#020817] min-h-screen flex flex-col items-center justify-start p-6 dark:text-gray-200">
      <Card className="w-full max-w-4xl mt-10 dark:bg-[#020817]">
        <CardHeader>
          <h1 className="text-4xl font-extrabold text-gray-900 text-center flex items-center justify-center dark:text-gray-200">
            <School size={35} className="mr-2" />{" "}
            {/* Icon with margin to the right */}
            UpSkillify
          </h1>
          <p className="text-center text-gray-700 mt-2 text-2xl dark:text-gray-200">
            See beyond, learn beyond
          </p>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>
          <div className="text-center mb-6">
            <img
              src="https://images.prismic.io/codiste-website/ZzXxMK8jQArT030-_LearningManagementSystems-LMS-WhatYouNeedtoKnow.webp?auto=format,compress"
              alt="Learning and growth"
              className="w-full max-w-md mx-auto rounded-lg shadow-md"
            />
          </div>
          <p className="text-lg text-gray-700 leading-7 mb-6 dark:text-gray-200">
            At UpSkillify, we believe in empowering individuals to push the
            boundaries of learning and growth. Our mission is to provide
            high-quality courses and tools that help learners acquire the skills
            they need to excel in their personal and professional lives.
          </p>
          <p className="text-lg text-gray-700 leading-7 mb-6 dark:text-gray-200">
            Whether you're a student, a professional, or someone eager to
            explore new horizons, UpSkillify offers a range of resources to
            support your journey. From expert-led courses to interactive
            learning tools, we are committed to making education accessible,
            engaging, and impactful.
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <Button
              className=" hover:bg-gray-700 shadow-black"
              onClick={() => navigate(`/course/search?query`)}
            >
              Explore Courses
            </Button>
            <Button variant="outline" className="shadow-white">
              Contact Us
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* New Section for Second Image */}
      <div className="w-full max-w-4xl mt-10 flex items-center gap-6">
        <div className="flex-shrink-0">
          <img
            src="https://blog.flock.com/hs-fs/hubfs/Stock%20images/Brainstorm%20against%20business%20interface%20with%20graphs%20and%20data.jpeg?width=1000&name=Brainstorm%20against%20business%20interface%20with%20graphs%20and%20data.jpeg"
            alt="Our Team"
            className="w-full max-w-md mx-auto rounded-lg shadow-md"
          />
        </div>
        <p className="text-lg text-gray-700 leading-7 shadow-black dark:text-gray-200">
          Our dedicated team of experts is passionate about creating an
          environment that nurtures creativity and skill development. Together,
          we focus on continuous improvement and strive to bring innovative
          solutions that meet the evolving needs of learners. With a strong
          background in education and technology, our team is committed to
          delivering the best learning experience.
        </p>
      </div>

      <div className="w-full max-w-4xl mt-10">
        <h2 className="text-3xl font-serif text-gray-800 text-center dark:text-gray-200">
          Our Values
        </h2>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex items-center gap-2">
              <FaLightbulb className="text-blue-900 text-3xl dark:text-gray-400" />
              <h3 className="text-xl font-bold text-blue-950 dark:text-gray-200">
                Innovation
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-200">
                We strive to bring the latest advancements in education to our
                platform, ensuring a cutting-edge learning experience.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-2">
              <FaUniversalAccess className="text-blue-900 text-3xl dark:text-gray-400" />
              <h3 className="text-xl font-bold text-blue-950 dark:text-gray-200">
                Accessibility
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-200">
                Learning should be for everyone. We design our courses to be
                accessible and inclusive for all types of learners.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-2">
              <FaAward className="text-blue-900 text-3xl dark:text-gray-400" />
              <h3 className="text-xl font-bold text-blue-950 dark:text-gray-200">
                Excellence
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-200">
                We are committed to delivering high-quality content and
                exceptional user experiences.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="w-full max-w-4xl mt-10">
        <h2 className="text-3xl font-serif text-gray-800 text-center dark:text-gray-200">
          Our Mission
        </h2>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex items-center gap-2">
              <FaHandsHelping className="text-blue-900 text-3xl dark:text-gray-400" />
              <h3 className="text-xl font-bold text-blue-950 dark:text-gray-200">
                Supportive Community
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-200">
                We foster a community where learners and educators support and
                inspire one another to achieve their goals.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-2">
              <FaUserGraduate className="text-blue-900 text-3xl dark:text-gray-400" />
              <h3 className="text-xl font-bold text-blue-950 dark:text-gray-200">
                Student Success
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-200">
                Our mission is centered around helping students succeed by
                providing the resources they need to thrive.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-2">
              <FaLightbulb className="text-blue-900 text-3xl dark:text-gray-400" />
              <h3 className="text-xl font-bold text-blue-950 dark:text-gray-200">
                Lifelong Learning
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-200">
                We encourage learners to embrace a lifelong journey of growth
                and self-improvement.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
