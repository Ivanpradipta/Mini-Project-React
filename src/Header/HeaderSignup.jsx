import logo from "../Image/logo.png";
import { Link } from "react-router-dom";


function HeaderAdmin() {
  return (
    <>
      {/* Main navigation container */}
      <nav
        className="flex-no-wrap relative flex w-full items-center justify-between bg-neutral-100 py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4"
        data-te-navbar-ref=""
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          {/* Collapsible navigation container */}
          <div
            className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContent1"
            data-te-collapse-item=""
          >
            {/* Logo */}
            <a
              className="mb-4 mr-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
              href="#"
            >
              <img
                src={logo}
                style={{ height: 25 }}
                alt=""
                loading="lazy"
              />
            </a>
            {/* Left navigation links */}
            <ul
              className="list-style-none mr-auto flex flex-col pl-0 lg:flex-row"
              data-te-navbar-nav-ref=""
            >
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref="">
                <Link
                  to="/"
                  className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
                >
                  Walking Garage
                </Link>
              </li>
              
            </ul>
          </div>
          <div className="relative flex items-center">
          <Link to="/login" className="text-md  font-medium w-full bg-red-500 text-white text-sm font-bold py-2 px-3 rounded-md hover:bg-indigo-600 transition duration-300">
                
                Continue to Sign In 
            
          </Link>
      </div>
        </div>
      </nav>
    </>
  );
}

export default HeaderAdmin;
