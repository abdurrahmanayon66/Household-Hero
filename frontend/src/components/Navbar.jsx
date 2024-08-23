import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserIdFromToken, isTokenValid } from "../assets/tokenUtils";
import { IoMenu } from "react-icons/io5";
import { HiHome } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import axios from "axios";
import io from "socket.io-client";
// Import the ClearRoundedIcon
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

const socket = io("http://localhost:8000"); // Ensure this matches your server URL

const Navbar = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const userId = getUserIdFromToken();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/getUserInfo/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (!isTokenValid()) {
      navigate("/login");
    } else {
      fetchUserData();
    }
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/order/getNotifications/${userId}`
      );
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    socket.on("notification", (newNotification) => {
      console.log("Received notification:", newNotification);
      fetchNotifications(); // Fetch all notifications when a new one is received
    });

    return () => {
      socket.off("notification");
    };
  }, [userId]);

  useEffect(() => {
    if (isTokenValid()) {
      fetchNotifications();
    }else{
      navigate("/login");
      setUser(null);
      sessionStorage.removeItem("token");
    }
  }, [userId]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    return `${time}, ${formattedDate}`;
  };

  const deleteNotification = async (notificationId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/order/deleteNotification/${notificationId}`
      );
      setNotifications(
        notifications.filter(
          (notification) => notification.notificationId !== notificationId
        )
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const renderAuthButtons = () => (
    <>
      {isTokenValid() && user ? (
        <div className="drawer drawer-end relative z-20">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex justify-end pr-2">
            <label htmlFor="my-drawer-4" className="drawer-button">
              <IoMenu className="size-10 hover:cursor-pointer" />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu min-h-full w-80 p-4 bg-darkBlue text-white text-xl font-semibold">
              <li>
                <div className="border-b-2 rounded-none mb-4 pb-4">
                  <div className="avatar">
                    <div className="size-16 rounded-full">
                      <img
                        className="object-cover"
                        src={`data:image/jpeg;base64,${user.userImage}`}
                        alt="user avatar"
                      />
                    </div>
                  </div>
                  <div className="ml-2 text-lg font-semibold">
                    <span>{user.name}</span>
                  </div>
                </div>
              </li>
              <ul className="space-y-4">
                <li>
                  <Link to={"/"}>
                    <HiHome /> Home
                  </Link>
                </li>
                <li>
                  <a>
                    <FaUser /> Profile
                  </a>
                </li>
                <li>
                  <Link to={"/contracts"}>
                    <FaList /> Orders
                  </Link>
                </li>
                <li>
                  <a className="relative" onClick={toggleNotifications}>
                    <IoNotifications />
                    Notifications
                    {notifications.length > 0 && (
                      <span className="size-2 bg-green-500 rounded-full absolute left-[170px] top-[13px]"></span>
                    )}
                  </a>
                  {showNotifications && notifications.length > 0 && (
                    <div className="bg-darkBlue hover:bg-darkBlue text-black absolute p-4 flex flex-col gap-y-4 right-[320px] w-[600px] max-h-[300px] overflow-y-scroll">
                      {notifications.map((notification, index) => (
                        <div
                          className="flex p-3 w-[550px] bg-[#213a69] rounded-md relative"
                          key={index}
                        >
                          <ClearRoundedIcon
                            className="absolute top-1 right-1 text-customNeutral"
                            onClick={() =>
                              deleteNotification(notification.notificationId)
                            }
                          />
                          <section>
                            <div className="avatar">
                              <div className="mask mask-squircle size-14">
                                {notification.Helper && (
                                  <img
                                    src={`data:image/jpeg;base64,${notification.Helper.helperImage}`}
                                    alt="Helper"
                                  />
                                )}
                              </div>
                            </div>
                          </section>
                          <section className="ml-3">
                            <span className="text-lightOrange">{notification.Helper.name}</span>
                            <span className="text-customNeutral ml-2 text-lg">
                              has {notification.notificationType} your order
                              request.
                            </span>
                            <p className="text-customNeutral text-sm mt-1">
                              {formatDateTime(notification.createdAt)}
                            </p>
                          </section>
                        </div>
                      ))}
                    </div>
                  )}
                  {showNotifications && notifications.length === 0 && (
                    <div className="bg-neutral-100 text-black absolute right-[320px] w-[600px] max-h-[300px] overflow-y-scroll hover:bg-neutral-100">
                      <p className="text-center p-4">No notifications found.</p>
                    </div>
                  )}
                </li>
                <li onClick={handleLogout}>
                  <a>
                    <RiLogoutBoxRFill /> Logout
                  </a>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="bg-purple-500 p-3 rounded-lg text-xl text-white font-semibold w-[100px] text-center"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );

  return (
    <div className="overflow-hidden">
      <ToastContainer />
      <div className="navbar bg-darkBlue flex justify-between w-screen h-20 px-16 text-lightOrange">
        <div className="navbar-start w-[500px]">
          <Link to="/" className="text-4xl font-bold">
            HouseHold Hero
          </Link>
        </div>
        <div className="navbar-end flex items-center">
          {renderAuthButtons()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
