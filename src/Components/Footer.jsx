import React from "react";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "rgb(3, 123, 102)" }} className="text-white py-8">
      <div className="container mx-auto px-4 text-center md:flex md:justify-between md:items-center">
        {/* Left Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-2xl font-semibold">Portfolio Tracker</h3>
          <p className="text-base text-gray-200 mt-2">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>

        {/* Center Section */}
        <div className="mb-6 md:mb-0">
          <ul className="flex justify-center space-x-6">
            <li>
              <a
                href="#"
                className="hover:text-gray-300 text-lg transition duration-200"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-300 text-lg transition duration-200"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-300 text-lg transition duration-200"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
