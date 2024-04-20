"use client";

import { useUserContext } from "@/context/UserContextProvider";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback } from "react";
import toast from "react-hot-toast";

function FriendRequestOptions({
  value,
  setValue,
}: {
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
}) {
  const { user } = useUserContext();

  const router = useRouter();

  const acceptFriend = useCallback(
    async (friendEmail: string) => {
      const response = await fetch(
        `/api/friendrequest?userEmail=${user.email}&friendEmail=${friendEmail}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (data.success) {
        const newArrPending: any = [];
        for (let i = 0; i < value.length; i++) {
          if (value[i].email !== friendEmail) {
            newArrPending.push(value[i]);
          }
        }
        setValue((prev: any) => ({
          ...prev,
          pendingFriend: newArrPending,
        }));
        toast.success(data.message);
      }
    },
    [user, value]
  );

  const rejectFriend = useCallback(
    async (friendEmail: string) => {
      const response = await fetch(
        `/api/friendrequest?userEmail=${user.email}&friendEmail=${friendEmail}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.success) {
        const newArrPending: any = [];
        for (let i = 0; i < value.length; i++) {
          if (value[i].email !== friendEmail) {
            newArrPending.push(value[i]);
          }
        }
        setValue((prev: any) => ({
          ...prev,
          pendingFriend: newArrPending,
        }));
        toast.success(data.message);
      }
    },
    [user, value]
  );

  return (
    <>
      {value?.length ? (
        value.map((data: any) => (
          <div
            className="w-full mb-4 flex items-center hover:bg-indigo-50 cursor-default rounded-lg py-2 px-1 border shadow-md justify-between"
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
                  acceptFriend(data.email);
                }}
              />
              <img
                src="../reject.png"
                className="size-8 mx-1 cursor-pointer hover:scale-125"
                alt=""
                onClick={() => {
                  rejectFriend(data.email);
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <h1>You do not have any friend request</h1>
      )}
    </>
  );
}

export default FriendRequestOptions;
