"use client";

import { useUserContext } from "@/context/UserContextProvider";
import { Loader2 } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

function FriendRequestOptions({ value }: { value: any }) {
  // const acceptFriend = useCallback(
  //   async (friendEmail: string) => {
  //     const response = await fetch(
  //       `/api/friendrequest?userEmail=${user.email}&friendEmail=${friendEmail}`,
  //       {
  //         method: "POST",
  //       }
  //     );
  //     const data = await response.json();
  //     if (data.success) {
  //       const newArrPending = [];
  //       const newArrFriend = [];
  //       for (let i = 0; i < friendRequest.length; i++) {
  //         // console.log(friendRequest[i]);
  //         if (friendRequest[i].email === friendEmail) {
  //           newArrFriend.push(friendRequest[i]);
  //         } else {
  //           newArrPending.push(friendRequest[i]);
  //         }
  //       }
  //       setDashboardData({
  //         pendingFriend: newArrPending,
  //         friendlist: newArrFriend,
  //       });
  //       // setFriendRequest(newArr);
  //       toast.success(data.message);
  //     }
  //   },
  //   [user, friendRequest]
  // );

  // const rejectFriend = useCallback(
  //   async (friendEmail: string) => {
  //     const response = await fetch(
  //       `/api/friendrequest?userEmail=${user.email}&friendEmail=${friendEmail}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );
  //     const data = await response.json();
  //     if (data.success) {
  //       const newArrPending: any = [];
  //       for (let i = 0; i < friendRequest.length; i++) {
  //         console.log(friendRequest[i]);
  //         if (friendRequest[i].email !== friendEmail) {
  //           newArrPending.push(friendRequest[i]);
  //         }
  //       }
  //       setDashboardData((prev: any) => ({
  //         ...prev,
  //         pendingFriend: newArrPending,
  //       }));
  //       toast.success(data.message);
  //     }
  //   },
  //   [user, friendRequest]
  // );

  return (
    <>
      {value.map((data: any) => (
        <div
          className="w-full mb-4 flex items-center hover:bg-indigo-50 cursor-default rounded-lg py-2 shadow-md justify-between"
          key={data.email}
        >
          <img
            src={`${data.image}`}
            className="size-10 rounded-full object-cover"
            alt="icon"
          />
          <h1 className="text-lg">{data.name}</h1>
          <div className="flex">
            <img
              src="../right.png"
              className="size-8 mx-1 cursor-pointer rounded-full hover:scale-125"
              alt=""
              onClick={() => {
                // acceptFriend(data.email);
              }}
            />
            <img
              src="../reject.png"
              className="size-8 mx-1 cursor-pointer hover:scale-125"
              alt=""
              onClick={() => {
                // rejectFriend(data.email);
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default FriendRequestOptions;
