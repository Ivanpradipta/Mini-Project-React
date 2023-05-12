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
import HeaderDetailUser from "../Header/HeaderDetailUser";


function DetailUser() {
  const [productCart, setProductCart] = useState([]);

  const cartCollectionRef = collection(db, "cart");
  const productQuery = query(
    cartCollectionRef,
    where("userId", "==", `${getAuth()?.currentUser?.uid}`)
  );

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
  return (

    <>
    <HeaderDetailUser/>
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
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

export default DetailUser;
