import { useState } from "react";
import { db } from "../firebase";
import { useEffect } from "react";
import {
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";import { Link } from "react-router-dom";
import HeaderHistoryUser from "../Header/HeaderHistoryUser";

function HistoryUser() {
  const [userHistory, setUserHistory] = useState([]);
  const historyCollectionref = collection(db, "users");
  const cartCollectionref = collection(db, "cart");
  const productQuery = query(
    historyCollectionref,
    where("userId", "==", `${getAuth()?.currentUser?.uid}`)
  );


  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(productQuery);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserHistory(filterData);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  return (
    <>
    <HeaderHistoryUser/>
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
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-[2.8rem] py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      date start
                    </th>
                    <th
                      scope="col"
                      className="px-[2.8rem] py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      date end
                    </th>
                    <th
                      scope="col"
                      className="px-[2.8rem] py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      List Item
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {userHistory.map((value) => (
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {value.id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {value.pinjam}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {value.balik}
                      </td>
                      <td className="px- py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          className="bg-pink-500 text-white active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <Link
                            to="/detailuser"
                            className="flex-1 ml-2 whitespace-nowrap"
                          >
                            List Item
                          </Link>
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

export default HistoryUser;
