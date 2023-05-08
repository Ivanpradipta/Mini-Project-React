
import { db, storage } from "../firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";
import {getAuth} from "firebase/auth"
import React, { useEffect, useRef, useState } from "react";
import gambar from "../Image/download.png";
import HeaderCart from "../Header/HeaderCart";

function Cart() {
  const [productCart, setProductCart] = useState([]);
  const [userList, setUserList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showBarcode, setShowBarcode] = useState(false);
  const [userName, setUserName] = useState("");
  const [userNim, setUserNim] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const userCollectionRef = collection(db, "users");
  const cartCollectionRef = collection(db, "cart");
  const productQuery = query(cartCollectionRef, where("userId" ,"==" , `${(getAuth() ?.currentUser?.uid)}`))


  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getDocs(productQuery);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProductCart(filterData);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    const alert = window.confirm("Apakah kalian ingin menghapus?");
    if (alert) {
      const productDoc = doc(db, "cart", id);
      await deleteDoc(productDoc);

      const updatedProducts = productCart.filter(
        (product) => product.id !== id
      );
      setProductCart(updatedProducts);
    }
  };

  const handleOnClick = async () => {
    const user = {
      name: userName,
      nim: userNim,
      pinjam: dateStart,
      balik: dateEnd,
    };
    await addDoc(userCollectionRef, user);
    setUserList([...userList, user]);
    alert("berhasil reserve");

    setUserName("");
    setDateStart("");
    setDateEnd("");
    setUserNim("");
  };

  return (
    <>
      <HeaderCart />
      <div className="">
        <div className="py-12">
          <h1 className="text-4xl font-medium text-center mb-4">
            Shopping Cart
          </h1>
          {productCart.map((value) => (
            <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg md:max-w-5xl mb-5">
              <div className="md:flex">
                <div className="w-full p-4 px-5 py-5">
                  <div className="">
                    <div className="col-span-2 p-5">
                      <div className="">
                        <div className="flex items-center">
                          <img
                            src={value.image}
                            width={80}
                            className="rounded-full"
                          />
                          <div className="flex flex-col ml-3">
                            <span className="text-md font-medium">
                              {value.name}
                            </span>
                            <span className="text-xl font-light text-black-400">
                              {value.description}
                            </span>
                          </div>
                              <button
                                className="bg-blue-200 text-black active:bg-blue-500 font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-[40rem]"
                                type="button"
                                onClick={() => handleDelete(value.id)}
                              >
                                Delete
                              </button>
                        </div>
                        <div className="relative float-right"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col items-center">
            <button
              className="h-12 w-[64rem] bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600"
              onClick={() => setShowModal(true)}
            >
              Check Out
            </button>
          </div>
          {showModal ? (
            <>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                      <h3 className="text-3xl font=semibold">General Info</h3>
                      <button
                        className="bg-transparent border-0 text-black float-right"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="text-black text-3xl">x</span>
                      </button>
                    </div>
                    <div className="relative p-12 flex-auto">
                      <form className="bg-gray-200 shadow-md rounded px-12 pt-12 pb-8 w-full">
                        <label className="block text-black text-sm font-bold mb-1 ">
                          Nama
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-1 text-black pr-[150px]"
                          value={userName}
                          onChange={(event) => setUserName(event.target.value)}
                        />
                        <label className="block text-black text-sm font-bold mb-1 ">
                          NIM
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                          value={userNim}
                          onChange={(event) => setUserNim(event.target.value)}
                        />
                        <label className="block text-black text-sm font-bold mb-1">
                          Tanggal Pinjam
                        </label>
                        <div className="relative max-w-sm">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-gray-500 dark:text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            datepicker=""
                            type="date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={dateStart}
                            onChange={(event) =>
                              setDateStart(event.target.value)
                            }
                          />
                        </div>
                        <label className="block text-black text-sm font-bold mb-1">
                          Tanggal kembali
                        </label>
                        <div className="relative max-w-sm">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-gray-500 dark:text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            datepicker=""
                            type="date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={dateEnd}
                            onChange={(event) => setDateEnd(event.target.value)}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-white bg-blue-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          handleOnClick();
                          setShowBarcode(true);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          {showBarcode ? (
            <>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-1 border-b border-solid border-gray-300 rounded-t ">
                      <h3 className="text-3xl font=semibold">Barcode</h3>
                      <button
                        className="bg-transparent border-0 text-black float-right"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="text-black text-3xl">x</span>
                      </button>
                    </div>
                    <div className="relative p-12 flex-auto">
                      <img src={gambar} alt="" />
                      <span className="">Show the barcode to the gate </span>
                    </div>
                    <div className="flex items-center justify-end p-1 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-white bg-blue-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => {
                          setShowBarcode(false);
                        }}
                      >
                        Okay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Cart;