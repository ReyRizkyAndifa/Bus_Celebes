export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white rounded-lg shadow-md mt-8">
      <div className="max-w-screen-xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
        <a
          href="https://flowbite.com/"
          className="flex items-center mb-4 md:mb-0 space-x-3 rtl:space-x-reverse"
          target="_blank"
          rel="noopener noreferrer"
        >
        
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Bus Celebes
          </span>
        </a>
        <ul className="flex flex-wrap justify-center md:justify-start items-center space-x-6 text-sm font-medium">
          <li>
            <a
              href="#"
              className="hover:underline transition-colors duration-200"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:underline transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:underline transition-colors duration-200"
            >
              Licensing
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:underline transition-colors duration-200"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="border-t border-blue-500 max-w-screen-xl mx-auto px-6 py-4 text-center text-sm text-blue-200">
        © 2023{" "}
          Bus Celebes™
       
        . All Rights Reserved.
      </div>
    </footer>
  );
}
