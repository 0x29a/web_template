import type { ReactElement } from "react";

export default function Dropdown({
  children,
  title,
}: {
  children: ReactElement[];
  title: string;
}) {
  return (
    <li className="relative group">
      <a
        className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center"
        href="#0"
        onClick={(e) => e.preventDefault()}
      >
        {title}
        <svg
          className="w-3 h-3 fill-current text-gray-500 cursor-pointer ml-1 shrink-0"
          viewBox="0 0 12 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.28 4.305L5.989 8.598 1.695 4.305A1 1 0 00.28 5.72l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z" />
        </svg>
      </a>
      <ul className="absolute top-full right-0 w-40 bg-white py-2 ml-4 rounded shadow-lg hidden group-hover:block">
        {children}
      </ul>
    </li>
  );
}
