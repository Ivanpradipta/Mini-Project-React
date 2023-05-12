import { useState } from "react";
import { db } from "../firebase";
import { useEffect } from "react";
import { getDocs, collection, deleteDoc, doc ,onSnapshot, query,
  where,} from "firebase/firestore";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

import HeaderHistory from "../Header/HeaderHistory";

function History() {
  const [userHistory, setUserHistory] = useState([]);
  const [Data, setData] = useState([]);
  const [productId, setProductId] = useState("");
  const [showModalDelete, setShowModalDelete] = useState(false);
  const historyCollectionref = collection(db, "users");
  

  const getUsers = async () => {
    try {
      const data = await getDocs(historyCollectionref);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserHistory(filterData);
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    
      const productDoc = doc(db, "users", id);
      await deleteDoc(productDoc);

      const updatedProducts = userHistory.filter(
        (product) => product.id !== id
      );
      setUserHistory(updatedProducts);
    
  };

  return (
    <>
    <HeaderHistory/>
      <div className="flex flex-col ">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      NIM
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Tanggal Pinjam
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Tanggal Kembali
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3 text-xs font-bold text-right text-gray-500 uppercase"
                    >
                      Detail
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3 text-xs font-bold text-right text-gray-500 uppercase"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
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
                            Are you sure you want to Finish this product?
                          </h3>
                          <button
                            data-modal-hide="popup-modal"
                            type="button"
                            onClick={() => {handleDelete(productId); setShowModalDelete(false)}}
                            className="text-white bg-red-500 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
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
                <tbody className="divide-y divide-gray-200">
                  {userHistory.map((value) => (
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {value.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {value.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {value.nim}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {value.pinjam}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {value.balik}
                      </td>
                      <td className="px- py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          className="bg-pink-500 text-white active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <Link
                            to="/detail"
                            className="flex-1 ml-2 whitespace-nowrap"
                          >
                            List Item
                          </Link>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          className="bg-green-500 text-white active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          onClick={()=>{setShowModalDelete(true);setProductId(value.id)}}
                        >
                          Finish
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default History;
