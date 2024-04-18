"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FriendRequestOptions from "./FriendRequestOptions";
import Friends from "./Friends";
import UserInfo from "./UserInfo";
import { useUserContext } from "@/context/UserContextProvider";
import { Loader2 } from "lucide-react";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    pendingFriendLength: 0,
    friendlist: [],
  });
  const [isLoading, setIsLoading] = useState(true);
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
            pendingFriendLength: data.pendingFriendLength,
            friendlist: data.friendlist,
          });
          // console.log(data);
          setIsLoading(false);
        }
        // console.log(data);
      })();
    }
  }, [user]);
  return (
    <div className="flex flex-col justify-between h-full w-full max-w-xs border-r overflow-y-auto p-4">
      <Link href="/">Logo</Link>
      <nav className="flex flex-col">
        {/* <FriendRequestOptions value={dashboardData.pendingFriend} setDashboardData={setDashboardData} /> */}
        <div>
          <h1 className="text-center my-4 text-2xl font-semibold">
            Friend Request
          </h1>
          <Link href="/dashboard/requests" className="flex items-center justify-center gap-2 hover:bg-indigo-50 py-2 cursor-pointer rounded-md mb-4">
            <h1 className="text-center text-lg sm:text-xl">Pending</h1>{" "}
            {isLoading ? (
              <Loader2 className="animate-spin size-8" />
            ) : (
              <div className="bg-indigo-600 text-white rounded-full size-8 flex items-center justify-center text-lg sm:text-xl">
                {dashboardData.pendingFriendLength}
              </div>
            )}
          </Link>
        </div>
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
            <Link href="/dashboard/add" className="w-full flex items-center justify-between h-12">
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
            </Link>
          </li>
          {/* ))} */}
        </ul>
        <hr />
        <h1 className="text-center font-semibold my-2 text-xl sm:text-2xl">
          Your chats
        </h1>
        <div className="flex flex-col">
          <Friends
            value={dashboardData.friendlist}
          />
        </div>
      </nav>
      <UserInfo />
    </div>
  );
}

export default Dashboard;
