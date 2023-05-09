import { db, storage } from "../firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import gambar from "../Image/barcode.jpg";
import HeaderCart from "../Header/HeaderCart";

function Cartt() {
  const [productCart, setProductCart] = useState([]);
  const [userList, setUserList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showBarcode, setShowBarcode] = useState(false);
  const [userName, setUserName] = useState("");
  const [userNim, setUserNim] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [productId, setProductId] = useState("");
  const userCollectionRef = collection(db, "users");
  const cartCollectionRef = collection(db, "cart");
  const productQuery = query(
    cartCollectionRef,
    where("userId", "==", `${getAuth()?.currentUser?.uid}`)
  );

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
  
  const handleDelete = async (id) => {
    
      const productDoc = doc(db, "cart", id);
      await deleteDoc(productDoc);
      
      getProducts();
    };
    
    const handleOnClick = async () => {
      const user = {
        name: userName,
        nim: userNim,
        pinjam: dateStart,
        balik: dateEnd,
      };
      await addDoc(userCollectionRef, user);
      alert("berhasil reserve");
      getProducts();
      setUserName("");
      setDateStart("");
      setDateEnd("");
      setUserNim("");
    };
    useEffect(() => {
      getProducts();
    }, []);
  
  return (
    <>
      <HeaderCart />
      <div className="flex flex-col items-center">
        <div className="overflow-x-auto">
          <div className=" p-7 inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      className="px-[4.3rem] py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="px-[2.8rem] py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-[3rem] py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Deskripsi
                    </th>
                    <th
                      scope="col"
                      className="px-[4.8rem] py-3 text-xs font-bold text-right text-gray-500 uppercase"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
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
                  {productCart.map((value) => (
                    <tr>
                      <td className="px-12 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        <img
                          src={value.image}
                          width={70}
                          className="rounded-full"
                        />
                      </td>
                      <td className="px-12 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {value.name}
                      </td>
                      <td className="px-12 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {value.description}
                      </td>
                      <td className="px-12 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          className="bg-red-500 text-white active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          onClick={()=>{setShowModalDelete(true);setProductId(value.id)}}

                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {showModal ? (
                    <>
                      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                              <h3 className="text-3xl font=semibold">
                                General Info
                              </h3>
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
                                  onChange={(event) =>
                                    setUserName(event.target.value)
                                  }
                                />
                                <label className="block text-black text-sm font-bold mb-1 ">
                                  NIM
                                </label>
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                  value={userNim}
                                  onChange={(event) =>
                                    setUserNim(event.target.value)
                                  }
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
                                    onChange={(event) =>
                                      setDateEnd(event.target.value)
                                    }
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
                            <div className=" p-1 border-b border-solid border-gray-300 rounded-t text-center">
                              <h3 className="text-3xl font=semibold">
                                Simpan Barcode
                              </h3>
                            </div>
                            <div className="relative p-12 flex-auto">
                              <img src={gambar} alt="" />
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button
          className="h-12 w-[42.8rem] bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600"
          onClick={() => setShowModal(true)}
        >
          Check Out
        </button>
      </div>
    </>
  );
}

export default Cartt;
