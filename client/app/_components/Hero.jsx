import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-800 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-teal-300 via-teal-500 to-teal-700 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            All Your Digital Products
            <span className="sm:block mt-4 "> Is One Click Away. </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl sm:text-xl/relaxed">
            Start Exploring State of the Art Assets Now!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded border border-teal-600 bg-teal-600 px-12 py-3 text-sm font-medium transition-all text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            <a
              className="block w-full rounded border border-teal-600 px-12 py-3 text-sm font-medium text-white transition-all hover:text-white hover:bg-teal-600 focus:outline-none focus:ring active:bg-teal-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
