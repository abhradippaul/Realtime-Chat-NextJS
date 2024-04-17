"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FriendRequestOptions from "./FriendRequestOptions";
import Friends from "./Friends";
import UserInfo from "./UserInfo";
import { useUserContext } from "@/context/UserContextProvider";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    pendingFriend: [],
    friendlist: [],
  });
  const { user } = useUserContext();
  // console.log(user);
  useEffect(() => {
    if (user.email) {
      (async () => {
        const reponse = await fetch(`/api/dashboard?userEmail=${user.email}`, {
          cache: "no-cache",
        });
        const data = await reponse.json();
        if (data.success) {
          setDashboardData({
            pendingFriend: data.pendingFriend,
            friendlist: data.friendlist,
          });
        }
        console.log(data);
      })();
    }
  }, [user]);
  return (
    <div className="flex flex-col justify-between h-full w-full max-w-xs border-r overflow-y-auto p-4">
      <Link href="/">Logo</Link>
      <nav className="flex flex-col">
        <FriendRequestOptions value={dashboardData.pendingFriend} />
        <hr />
        <ul className="flex flex-col">
          <h1 className="mt-4 text-2xl font-semibold text-center">
            Explore Friends
          </h1>
          {/* {overviewOptions.map((option) => ( */}
          <li
            // key={option.name}
            className="my-4 border-indigo-50 rounded-lg cursor-pointer hover:bg-indigo-50"
          >
            <div className="w-full flex items-center justify-between h-12">
              <img
                // src={option.icon}
                src="../adduser.png"
                alt="Add user"
                className="size-6 ml-4"
              />
              <h1 className="text-center w-full text-lg sm:text-xl">
                {/* {option.name} */}
                Add User
              </h1>
            </div>
          </li>
          {/* ))} */}
        </ul>
        <hr />
        <h1 className="text-center font-semibold my-2 text-xl sm:text-2xl">
          Your chats
        </h1>
        <div className="flex flex-col">
          <Friends value={dashboardData.friendlist} />
        </div>
      </nav>
      <UserInfo />
    </div>
  );
}

export default Dashboard;
