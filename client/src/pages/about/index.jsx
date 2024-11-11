import React from "react";
import "./about.scss";
const About = () => {
  return (
    <section
      id="about-me"
      className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20 py-10 md:py-20 text-center"
    >
      <h1 className="text-4xl font-bold mb-4">Hi, I'm Faisal Rehman</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">
        Passionate MERN Stack Developer
      </h2>
      <p className="text-lg leading-relaxed mb-4">
        I'm a dedicated MERN (MongoDB, Express.js, React, Node.js) stack
        developer with a knack for crafting modern, responsive, and
        user-friendly web applications. I specialize in leveraging JavaScript,
        React, HTML, CSS, and Next.js to create dynamic and engaging digital
        experiences.
      </p>
      <p className="text-lg leading-relaxed mb-4">
        With hands-on experience in building RESTful APIs, integrating databases
        (MongoDB, MySQL, PostgreSQL), and implementing robust server-side
        applications with Express.js, I am adept at translating ideas into
        functional and scalable solutions.
      </p>
      <p className="text-lg leading-relaxed mb-4">
        I thrive on solving complex problems and continuously enhancing my
        skills to keep pace with the latest technologies. Whether it's designing
        intuitive user interfaces, optimizing performance, or ensuring code
        quality through testing methodologies, I'm committed to delivering
        high-quality software solutions.
      </p>
      <p className="text-lg leading-relaxed">
        Let's collaborate to transform your ideas into reality! Feel free to
        reach out for project inquiries, collaboration opportunities, or just to
        connect and discuss the latest trends in web development.
      </p>
    </section>
  );
};

export default About;
