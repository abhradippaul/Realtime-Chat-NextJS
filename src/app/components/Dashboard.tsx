"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Friends from "./Friends";
import UserInfo from "./UserInfo";
import { useUserContext } from "@/context/UserContextProvider";
import { Loader2 } from "lucide-react";
import { pusherClient } from "@/lib/pusher";

interface friendlistValue {
  name: string;
  image: string;
  email: string;
}
interface dashboardDataValue {
  pendingFriendLength: number;
  friendlist: friendlistValue[];
}

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserContext();
  const [dashboardData, setDashboardData] = useState<dashboardDataValue>({
    pendingFriendLength: 0,
    friendlist: [],
  });

  useEffect(() => {
    if (user.email) {
      (async () => {
        const reponse = await fetch(`/api/dashboard?userEmail=${user.email}`);
        const data = await reponse.json();
        if (data.success) {
          setDashboardData({
            pendingFriendLength: data.pendingFriendLength,
            friendlist: data.friendlist,
          });
          setIsLoading(false);
        }
      })();
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      if (user.email) {
        pusherClient.subscribe(`user__${user.email}__dashboard_data`);
        pusherClient.bind(`dashboard_data`, (data: any) => {
          console.log(data.friendlist);
          // setDashboardData((prev: any) => ({
          //   friendlist: [...prev.friendlist, data.friendlist],
          //   pendingFriendLength: data.pendingFriendLength,
          // }));
        });
        return () => {
          pusherClient.unsubscribe(`user__${user.email}__dashboard_data`);
          pusherClient.unbind(`dashboard_data`);
        };
      }
    })();
  }, [user]);

  return (
    <div className="flex flex-col justify-between h-full w-full max-w-xs border-r overflow-y-auto p-4">
      <Link href="/">Logo</Link>
      <nav className="flex flex-col">
        <div>
          <h1 className="text-center my-4 text-2xl font-semibold">
            Friend Request
          </h1>
          <Link
            href="/dashboard/requests"
            className="flex items-center justify-center gap-2 hover:bg-indigo-50 py-2 cursor-pointer rounded-md mb-4"
          >
            <h1 className="text-center text-lg  sm:text-xl">Pending</h1>{" "}
            {isLoading ? (
              <Loader2 className="animate-spin size-8" />
            ) : dashboardData.pendingFriendLength ? (
              <div className="bg-indigo-600 text-white rounded-full size-8 flex items-center justify-center sm:text-lg">
                {dashboardData.pendingFriendLength}
              </div>
            ) : (
              <div></div>
            )}
          </Link>
        </div>
        <hr />
        <ul className="flex flex-col">
          <h1 className="mt-4 text-2xl font-semibold text-center">
            Explore Friends
          </h1>
          <li className="my-4 border-indigo-50 rounded-lg cursor-pointer hover:bg-indigo-50">
            <Link
              href="/dashboard/add"
              className="w-full flex items-center justify-between h-12"
            >
              <img
                src="../../adduser.png"
                alt="Add user"
                className="size-6 ml-4"
              />
              <h1 className="text-center w-full text-lg sm:text-xl">
                Add User
              </h1>
            </Link>
          </li>
        </ul>
        <hr />
        <h1 className="text-center font-semibold my-2 text-xl sm:text-2xl">
          Your chats
        </h1>
        <div className="flex flex-col items-center">
          {isLoading ? (
            <Loader2 className="animate-spin size-8" />
          ) : (
            <Friends value={dashboardData.friendlist} />
          )}
        </div>
      </nav>
      <UserInfo />
    </div>
  );
}

export default Dashboard;
