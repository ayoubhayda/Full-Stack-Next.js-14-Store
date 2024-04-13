import React from "react";

const BreadCrumb = ({ PathName, Path }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol className="flex overflow-hidden rounded-lg border border-gray-700 text-gray-200">
        <li className="flex items-center">
          <a
            href="/"
            className="flex h-10 items-center gap-1.5  px-4 transition bg-gray-800 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>

            <span className="text-xs font-medium"> Home </span>
          </a>
        </li>

        <li className="relative flex items-center">
          <span className="absolute inset-y-0 -start-px h-10 w-4  [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180 bg-gray-800"></span>

          <a
            href={Path}
            className="flex h-10 items-center  pe-4 ps-8 text-xs font-medium transition  bg-gray-900 hover:text-white"
          >
            {PathName}
          </a>
        </li>
      </ol>
    </nav>
  );
};

export default BreadCrumb;
