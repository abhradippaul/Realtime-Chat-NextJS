"use client";
import { useUserContext } from "@/context/UserContextProvider";
import { useEffect, useState } from "react";

function Friends({value} : {value: any}) {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserContext();
  const [friends, setFriends] = useState([
    {
      name: "",
      email: "",
      image: "",
    },
  ]);
  useEffect(() => {
    if(value.length) {
      setFriends(value)
      console.log(value);
    }
    // console.log(value);
  }, [user,value]);
  return (
    <div className="w-full">
      {friends?.length && friends[0]?.email &&
        friends.map((friend) => {
          return (
            <div
              className="flex items-center justify-between py-2 px-4 border"
              key={friend.email}
            >
              <img src={`${friend.image}`} className="size-8 object-cover rounded-full" alt="" />
              <h1 className="text-lg">{friend.name.split(" ")[0]}</h1>
            </div>
          );
        })}
    </div>
  );
}

export default Friends;
