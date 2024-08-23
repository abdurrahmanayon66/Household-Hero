import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid, getUserIdFromToken } from "../assets/tokenUtils";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contracts = () => {
  const userId = getUserIdFromToken();
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isTokenValid()) {
      setIsLoading(true);
      axios
        .get(`http://localhost:8000/api/order/getOrders/${userId}`)
        .then((response) => {
          setOrders(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/login");
    }
  }, []);

  const deleteOrder = async (orderId) => {
    setIsProcessing(true);
    try {
      await axios.delete(`http://localhost:8000/api/order/delete/${orderId}`);
      const newOrders = orders.filter((order) => order.orderId !== orderId);
      setOrders(newOrders);
      toast.success("Order has been terminated.");
      setIsProcessing(false);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting order.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-16 pb-20 pt-10">
      <h1 className="text-black text-2xl font-bold mb-8 flex justify-center w-full">
        Your Current Orders
      </h1>
      <div>
        <table className="table text-black max-h-[600px] max-w-[100%] overflow-y-scroll overflow-x-hidden">
          {/* head */}
          <thead>
            <tr className="text-black text-lg font-semibold">
              <th></th>
              <th>Name</th>
              <th>Service</th>
              <th>Contract Type</th>
              <th>Total Bill</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr>
                <td>
                  <div className="avatar">
                    <div className="size-12 rounded-md">
                      <img
                        src={`data:image/jpeg;base64,${order.Helper.helperImage}`}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td className="font-bold">{order.Helper.name}</td>
                <td>{order.Helper.serviceTitle}</td>
                <td>{order.contractType}</td>
                <td>${order.bill}</td>
                <td>
                  <span
                    className={`font-bold ${
                      order.status === "pending"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <button
                    className="bg-red-500 p-2 rounded-lg text-white relative"
                    onClick={() => deleteOrder(order.orderId)}
                    disabled={isProcessing} // Disable button while processing
                  >
                    {isProcessing && (
                      <span className="loading loading-spinner absolute inset-0 text-white"></span>
                    )}
                    Terminate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contracts;
