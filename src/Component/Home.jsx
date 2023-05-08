import "../App2.css";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import back from "../Image/back.png";
import blm from "../Image/download.png";
import logout from "../Image/logout.png";
import history from "../Image/history.png";
import logo from "../Image/logo.png";
import { Link } from "react-router-dom";

function Home() {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState();
  const [productStatus, setProductStatus] = useState("");
  const [productList, setProductList] = useState([]);
  const [productId, setProductId] = useState("");
  const [filteredList, setFilteredList] = useState(productList);
  const [getLink, setGetLink] = useState("");
  const formRef = useRef(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const productsCollectionRef = collection(db, "products");

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

  const handleDelete = async (id) => {
    
      const productDoc = doc(db, "products", id);
      await deleteDoc(productDoc);

      const updatedProducts = productList.filter(
        (product) => product.id !== id
      );
      setProductList(updatedProducts);
      getProducts();
    
  };

  const handleUpdate = async (id) => {
    try {
      console.log(id);
      const product = {
        id: uuidv4(),
        name: productName,
        description: productDescription,
        status: productStatus,
      };
      const productDoc = doc(db, "products", id);
      await updateDoc(productDoc, product);
      alert("berhasil update data");

      getProducts();
    } catch (error) {
      console.error(error);
    }
    setProductName("");
    setProductDescription("");
    setProductStatus("");

    formRef.current.reset();
  };

  const handleonClick = async (event) => {
    const filesFolderRef = ref(storage, `products/${productImage.name}`);

    try {
      await uploadBytes(filesFolderRef, productImage);
      const getLink = await getDownloadURL(
        ref(storage, `products/${productImage.name}`)
      );
      const product = {
        id: uuidv4(),
        name: productName,
        description: productDescription,
        status: productStatus,
        image: getLink,
      };

      await addDoc(productsCollectionRef, product);
      setProductList([...productList, product]);
      setGetLink(getLink);
      alert("berhasil tambah data");
    } catch (error) {
      console.error(error);
    }

    setProductName("");
    setProductDescription("");
    setProductStatus("");

    formRef.current.reset();
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
                href=""
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
                onClick={() => setShowModalAdd(true)}
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Add Item +
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
                  src={blm}
                  alt=""
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white pl-1"
                />
                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Sort by Name ({sortOrder === "asc" ? "A-Z" : "Z-A"})
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <img
                  src={history}
                  alt=""
                  className="flex-shrink-0 w-8 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white "
                />

                <Link to="/history" className="flex-1 ml-2 whitespace-nowrap">
                  History
                </Link>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <img
                  src={logout}
                  alt=""
                  className="flex-shrink-0 w-8 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white "
                />

                <Link to="/login" className="flex-1 ml-2 whitespace-nowrap">
                  Logout
                </Link>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* end */}

      {/* start list */}
      <div className="p-4 sm:ml-64">
        <div className="pl-[30rem] ">
          <div className="justify-between my-1">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                LIST BARANG
              </span>
            </h1>

            {showModalAdd ? (
              <>
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                        <h3 className="text-3xl font=semibold">General Info</h3>
                        <button
                          className="bg-transparent border-0 text-black float-right"
                          onClick={() => setShowModalAdd(false)}
                        >
                          <span className="text-black text-3xl">x</span>
                        </button>
                      </div>
                      <div className="relative p-12 flex-auto">
                        <form
                          className="bg-gray-200 shadow-md rounded px-12 pt-12 pb-8 w-full"
                          ref={formRef}
                        >
                          <label className="block text-black text-sm font-bold mb-1">
                            Nama Barang
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                            value={productName}
                            onChange={(event) =>
                              setProductName(event.target.value)
                            }
                            maxLength={10}
                          />
                          <label className="block text-black text-sm font-bold mb-1">
                            Kategori
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                            value={productDescription}
                            onChange={(event) =>
                              setProductDescription(event.target.value)
                            }
                            maxLength={10}
                          />
                          <label className="block text-black text-sm font-bold mb-1">
                            Status
                          </label>
                          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                            <input
                              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5  rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                              type="radio"
                              name="flexRadioDefault"
                              id="radioDefault01"
                              value="Ready"
                              checked={productStatus === "Ready"}
                              onChange={(event) =>
                                setProductStatus(event.target.value)
                              }
                            />
                            <label
                              className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                              htmlFor="radioDefault01"
                            >
                              Ready
                            </label>
                          </div>
                          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                            <input
                              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                              type="radio"
                              name="flexRadioDefault"
                              id="radioDefault02"
                              value="Reserved"
                              checked={productStatus === "Reserved"}
                              onChange={(event) =>
                                setProductStatus(event.target.value)
                              }
                            />
                            <label
                              className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                              htmlFor="radioDefault02"
                            >
                              Reserved
                            </label>
                          </div>
                          <label
                            htmlFor="formFile"
                            className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                          >
                            Upload Gambar
                          </label>
                          <input
                            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                            type="file"
                            id="formFile"
                            onChange={(event) =>
                              setProductImage(event.target.files[0])
                            }
                          />
                        </form>
                      </div>
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="text-white bg-blue-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          onClick={handleonClick}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            {showModalEdit ? (
              <>
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                        <h3 className="text-3xl font=semibold">General Info</h3>
                        <button
                          className="bg-transparent border-0 text-black float-right"
                          onClick={() => setShowModalEdit(false)}
                        >
                          <span className="text-black text-3xl">x</span>
                        </button>
                      </div>
                      <div className="relative p-12 flex-auto">
                        <form
                          className="bg-gray-200 shadow-md rounded px-12 pt-12 pb-8 w-full"
                          ref={formRef}
                        >
                          <label className="block text-black text-sm font-bold mb-1">
                            Nama Barang
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black pr-[150px]"
                            value={productName}
                            onChange={(event) =>
                              setProductName(event.target.value)
                            }
                            maxLength={10}
                          />
                          <label className="block text-black text-sm font-bold mb-1">
                            Deskripsi
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                            value={productDescription}
                            onChange={(event) =>
                              setProductDescription(event.target.value)
                            }
                            maxLength={15}
                          />
                          <label className="block text-black text-sm font-bold mb-1">
                            Status
                          </label>
                          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                            <input
                              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5  rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                              type="radio"
                              name="flexRadioDefault"
                              id="radioDefault01"
                              value="Ready"
                              checked={productStatus === "Ready"}
                              onChange={(event) =>
                                setProductStatus(event.target.value)
                              }
                            />
                            <label
                              className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                              htmlFor="radioDefault01"
                            >
                              Ready
                            </label>
                          </div>
                          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                            <input
                              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                              type="radio"
                              name="flexRadioDefault"
                              id="radioDefault02"
                              value="Reserved"
                              checked={productStatus === "Reserved"}
                              onChange={(event) =>
                                setProductStatus(event.target.value)
                              }
                            />
                            <label
                              className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                              htmlFor="radioDefault02"
                            >
                              Reserved
                            </label>
                          </div>
                        </form>
                      </div>
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="text-white bg-blue-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          onClick={() => handleUpdate(productId)}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            {showModalDelete ? (
              <>
                
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                          type="button"
                          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                          data-modal-hide="popup-modal"
                          onClick={() => setShowModalDelete(false)}

                        >
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>

                        </button>
                        <div className="p-6 text-center">
                          <svg
                            aria-hidden="true"
                            className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this product?
                          </h3>
                          <button
                            data-modal-hide="popup-modal"
                            type="button"
                            onClick={() => {handleDelete(productId); setShowModalDelete(false)}}
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                          >
                            Yes, I'm sure
                          </button>
                          <button
                            data-modal-hide="popup-modal"
                            type="button"
                            onClick={() => setShowModalDelete(false)}
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                          >
                            No, cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  
                
              </>
            ) : null}
          </div>
        </div>
        <div>
          <div className="col-10 ml-3">
            {productList
              .filter(
                (value) =>
                  value.name.toLowerCase().includes(filteredList) ||
                  value.description.toLowerCase().includes(filteredList) ||
                  value.status.toLowerCase().includes(filteredList)
              )
              .map((value) => (
                <div key={value.id} className="float-left d-inline-block m-4">
                  <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <img
                      className="w-60 h-60 object-cover"
                      src={value.image}
                      alt="Sunset in the mountains"
                    />
                    <div className="px-6 py-6">
                      <div className="text-gray-700 text-xl text-orange-500">
                        {value.name}
                      </div>
                      <p className="text-gray-700 font-bold">
                        {value.description}
                      </p>
                      <p className="text-gray-700 text-base">
                        Status : {value.status}
                      </p>
                      <button
                        className="block w-full select-none rounded-lg bg-yellow-500 py-3 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mb-3"
                        type="button"
                        data-ripple-light="true"
                        onClick={() => {
                          setShowModalEdit(true);
                          setProductId(value.id);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="block w-full select-none rounded-lg bg-red-500 py-3 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        data-ripple-light="true"
                        onClick={()=>{setShowModalDelete(true);setProductId(value.id)}}
                      >
                        Delete
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

export default Home;
