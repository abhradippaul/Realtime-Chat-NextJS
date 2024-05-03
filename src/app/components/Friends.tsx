"use client";
import { useUserContext } from "@/context/UserContextProvider";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function Friends({ value, pendingMsg }: { value: any; pendingMsg: any }) {
  const { user } = useUserContext();
  const { chatId } = useParams();
  const [friends, setFriends] = useState([
    {
      name: "",
      email: "",
      image: "",
    },
  ]);
  useEffect(() => {
    if (value.length) {
      setFriends(value);
    }
  }, [user, value]);
  return (
    <div className="w-full">
      {friends?.length &&
        friends[0]?.email &&
        friends.map((friend) => {
          return (
            <Link
              href={`/dashboard/chat/${friend.email.split("@")[0]}`}
              className="flex items-center justify-between py-2 px-4 my-2 border rounded-md hover:bg-indigo-50 cursor-pointer"
              key={friend.email}
            >
              <img
                src={`${friend.image}`}
                className="size-8 object-cover rounded-full"
                alt=""
              />
              <h1 className="text-lg">{friend.name.split(" ")[0]}</h1>
              {parseInt(pendingMsg[friend.email]) !== 0 &&
                pendingMsg[friend.email] !== undefined &&
                chatId !== friend.email.split("@")[0] && (
                  <div className="bg-indigo-500 size-6 rounded-full flex items-center justify-center text-white">
                    {pendingMsg[friend.email]}
                  </div>
                )}
            </Link>
          );
        })}
    </div>
  );
}

export default Friends;
