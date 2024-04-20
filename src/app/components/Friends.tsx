"use client";
import { useUserContext } from "@/context/UserContextProvider";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function Friends({ value }: { value: any }) {
  const { user } = useUserContext();
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
              href={`/dashboard/chat/${friend.email}`}
              className="flex items-center justify-between py-2 px-4 border rounded-md hover:bg-indigo-50 cursor-pointer"
              key={friend.email}
            >
              <img
                src={`${friend.image}`}
                className="size-8 object-cover rounded-full"
                alt=""
              />
              <h1 className="text-lg">{friend.name.split(" ")[0]}</h1>
            </Link>
          );
        })}
    </div>
  );
}

export default Friends;
