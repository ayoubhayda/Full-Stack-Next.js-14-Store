import React from "react";

const Hero = () => {
  return (
    <section class="bg-gray-100 dark:bg-gray-900 dark:text-white">
      <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div class="mx-auto max-w-3xl text-center">
          <h1 class="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 dark:bg-gradient-to-r dark:from-teal-300 dark:via-teal-500 dark:to-teal-700 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            All Your Digital Products
            <span class="sm:block mt-4 "> Is One Click Away. </span>
          </h1>

          <p class="mx-auto mt-5 max-w-xl sm:text-xl/relaxed">
            Start Exploring State of the Art Assets Now!
          </p>

          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <a
              class="block w-full rounded border border-teal-600 bg-teal-600 px-12 py-3 text-sm font-medium transition-all text-white hover:bg-transparent hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            <a
              class="block w-full rounded border border-teal-600 px-12 py-3 text-sm font-medium dark:text-white transition-all hover:text-white hover:bg-teal-600 focus:outline-none focus:ring active:bg-teal-500 sm:w-auto"
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
