import "../App2.css";
import React, { useEffect, useRef, useState } from "react";
import { auth, db, storage } from "../firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import back from "../Image/back.png";
import logo from "../Image/logo.png";
import blm from "../Image/download.png";
import logout from "../Image/logout.png";
import gambar from "../Image/cart.png";
import { Link } from "react-router-dom";

function User() {
  const [productList, setProductList] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredList, setFilteredList] = useState(productList);
  const productsCollectionRef = collection(db, "products");
  const cartCollectionRef = collection(db, "cart");

  const getProducts = async () => {
    try {
      const data = await getDocs(productsCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductList(filterData);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleOnClick = async (id, name, description, image) => {
    try {
      await addDoc(cartCollectionRef, {
        id,
        name,
        description,
        image,
        userId: getAuth().currentUser.uid,
      });
      alert("Berhasil Masukan Produk Ke Cart");
    } catch (error) {
      console.error(error);
      alert("salah");
    }
  };

  const handleSort = () => {
    const sortedList = [...productList].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
    
    setProductList(sortedList);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  useEffect(() => {

    getProducts();
  }, []);
  
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-slate-500	"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 ">
          <a href="/" className="flex items-center pl-2.5 mb-5">
            <img src={logo} className="h-6 mr-3 sm:h-7" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Walking Garage
            </span>
          </a>
          <ul className="space-y-2 font-medium">
            <li>
              <div className="">
                <input
                  type="search"
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  id="exampleSearch"
                  placeholder="Search"
                  onChange={(event) => setFilteredList(event.target.value)}
                />
              </div>
            </li>
            <li>
              <a
                href="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>

                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleSort}
              >
                <img
                  src={blm}
                  alt=""
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white pl-1"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Sort by Name ({sortOrder === "asc" ? "A-Z" : "Z-A"})
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleSort}
              >
                <img
                  src={gambar}
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white pl-1"
                  alt=""
                />
                <Link to="/cart" className="flex-1 ml-3 whitespace-nowrap">
                  Cart
                </Link>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <img
                  src={logout}
                  alt=""
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white pl-1"
                />

                <Link to="/login" className="flex-1 ml-3 whitespace-nowrap">
                  Logout
                </Link>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* end */}
      <div className="p-4 sm:ml-64">
        <div className=" justify-between my-1 text-center">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              LIST BARANG
            </span>
          </h1>
        </div>
        <div>
          <div className="col-10 m-auto">
            {productList.filter(
                (value) =>
                  value.name.toLowerCase().includes(filteredList) ||
                  value.description.toLowerCase().includes(filteredList) ||
                  value.status.toLowerCase().includes(filteredList)
              ).map((value) => (
              <div key={value.id} className="float-left d-inline-block m-4">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                  <img
                    className="w-60 h-60 object-cover"
                    src={value.image}
                    alt="Sunset in the mountains"
                  />
                  <div className="px-6 py-4">
                    <div className="text-gray-700 text-xl text-orange-500">
                      {value.name}
                    </div>
                    <p className="text-gray-700 text-base font-bold">
                      {value.description}
                    </p>
                    <p className="text-gray-700 text-base font-bold">Status: {value.status}</p>
                    <button
                      className="text-center pl-5 block w-full select-none rounded-lg bg-pink-500 py-3 font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      data-ripple-light="true"
                      disabled={value.status == "Reserved" ? true : false}
                      onClick={() =>
                        handleOnClick(
                          value.id,
                          value.name,
                          value.description,
                          value.image
                        )
                      }
                    >
                      add to cart        
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
