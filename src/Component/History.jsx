import { useState } from "react";
import { db } from "../firebase";
import { useEffect } from "react";
import {
    getDocs,
    collection,
    deleteDoc,
    doc,
  } from "firebase/firestore";

function History() {
  const [userHistory, setUserHistory] = useState([]);
  const historyCollectionref = collection(db, "users");

  useEffect(() => {
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
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    const alert = window.confirm("Apakah anda yakin?");
    if (alert) {
      const productDoc = doc(db, "users", id);
      await deleteDoc(productDoc);

      const updatedProducts = userHistory.filter(
        (product) => product.id !== id
      );
      setUserHistory(updatedProducts);
    }
  };

  return (
    <>
      <div className="flex flex-col">
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
                      Action
                    </th>
                  </tr>
                </thead>
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
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          className="bg-green-500 text-white active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          onClick={() => handleDelete(value.id)}
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
