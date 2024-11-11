import React from "react";
import "./contact.scss";

const Contact = () => {
  return (
    <section
      id="contact"
      className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20 py-10 md:py-20 text-center"
    >
      {" "}
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Get in Touch
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact Form
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact Information
          </h2>
          <p className="text-gray-700 mb-4">
            <strong>Address:</strong> 1234 Real Estate, Berlin, Germany
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Phone:</strong> +49 1781633786
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Email:</strong> faisalfasi18@gmail.com
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Office Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
