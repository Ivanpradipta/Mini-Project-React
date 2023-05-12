import logo from "../Image/logo.png";
import ukdw from "../Image/tiukdw.png"
import fti from "../Image/ftiukdw.png"
import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <>
      <div>
        <section className="mb-40">
          <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
            <div className="px-6 w-full flex flex-wrap items-center justify-between">
              <div className="flex items-center">
                <button
                  className="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContentY"
                  aria-controls="navbarSupportedContentY"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    className="w-5"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                    />
                  </svg>
                </button>
                <img src={logo} className="h-6  sm:h-7" alt="Flowbite Logo" />
                <a
                  href="https://www.ukdw.ac.id/akademik/fakultas-teknologi-informasi/informatika/"
                  className="flex items-center pl-2.5"
                >
                  <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                    Walking Garage
                  </span>
                </a>
              </div>
              <div
                className="navbar-collapse collapse grow items-center"
                id="navbarSupportedContentY"
              >
                <ul className="navbar-nav mr-auto lg:flex lg:flex-row">
                  <li className="nav-item">
                    <a
                      className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                      href="#!"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                      href="#!"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      Team
                    </a>
                  </li>
                  <li className="nav-item mb-2 lg:mb-0">
                    <a
                      className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                      href="#!"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      Projects
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex items-center lg:ml-auto">
                <Link
                  to="/login"
                  className="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </nav>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="svg absolute hidden lg:block"
            style={{
              height: 560,
              width: "100%",
              zIndex: -10,
              overflow: "hidden",
            }}
          >
            <defs>
              <linearGradient id="sw-gradient-0" x1={0} x2={0} y1={1} y2={0}>
                <stop stopColor="hsl(217, 102%, 99%)" offset="0%" />
                <stop stopColor="hsl(217,88%, 93%)" offset="100%" />
              </linearGradient>
            </defs>
            <path
              fill="url(#sw-gradient-0)"
              d="M 0.351 264.418 C 0.351 264.418 33.396 268.165 47.112 270.128 C 265.033 301.319 477.487 325.608 614.827 237.124 C 713.575 173.504 692.613 144.116 805.776 87.876 C 942.649 19.853 1317.845 20.149 1440.003 23.965 C 1466.069 24.779 1440.135 24.024 1440.135 24.024 L 1440 0 L 1360 0 C 1280 0 1120 0 960 0 C 800 0 640 0 480 0 C 320 0 160 0 80 0 L 0 0 L 0.351 264.418 Z"
            />
          </svg>
          <div className="px-6 py-12 lg:my-12 md:px-12 text-gray-800 text-center lg:text-left">
            <div className="container mx-auto xl:px-32">
              <div className="grid lg:grid-cols-2 gap-12 flex items-center">
                <div className="mt-12 lg:mt-0">
                  <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
                    The best offer <br />
                    <span className="text-blue-600">For your Organization</span>
                  </h1>
                  <a
                    className="inline-block px-7 py-3 mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    href="/login"
                    role="button"
                  >
                    Get started
                  </a>
                  <a
                    className="inline-block px-7 py-3 bg-transparent text-blue-600 font-medium text-sm leading-snug uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    href="#!"
                    role="button"
                  >
                    Learn more
                  </a>
                </div>
                <div className="mb-12 lg:mb-0">
                  <img
                    src={ukdw}
                    className="w-full rounded-lg shadow-lg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-gray-100 py-8">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 pl-[15rem]">
          <div className="md:w-1/2 px-4">
            <h1 className="text-3xl font-bold tracking-tight mt-4">
              About <span className="text-blue-600">Us</span>
            </h1>
            <p className="mt-4">
            We are a company engaged in technology and are committed to providing the best solutions for our customers.
            </p>
            <p className="mt-4">
            We have a team consisting of experts in their respective fields and experienced in working on large projects.
            </p>
          </div>
          <div className="md:w-1/2 px-4">
            <img
              className="rounded-lg shadow-lg"
              src={fti}
              alt="About us"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-bold leading-tight mt-4 text-center">
              <span className="text-blue-600">Contact</span> Us
            </h1>
            <p className="mt-4 text-center">
            Please contact us via the form below or via the contact information provided at the bottom of this page.
            </p>
            <form className="mt-8">
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Ivan Pradipta"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="ivan@mail.com"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                  id="message"
                  placeholder="lorem ipsum"
                ></textarea>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Submit 
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
export default LandingPage;
