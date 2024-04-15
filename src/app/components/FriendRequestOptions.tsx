"use client";

import { useUserContext } from "@/context/UserContextProvider";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

function FriendRequestOptions() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [friendRequest, setFriendRequest] = useState([
    {
      name: "",
      email: "",
      image: "",
    },
  ]);
  const { user } = useUserContext();
  useEffect(() => {
    fetch(`/api/friendrequest?userEmail=${user.email}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setFriendRequest(data.userInfo);
          console.log(data.userInfo);
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);
  return (
    <>
      <h1 className="text-center my-4 text-2xl font-semibold">
        Friend Request
      </h1>
      {}
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <Loader2 className="animate-spin size-8" />
        </div>
      ) : friendRequest.length ? (
        friendRequest.map((data) => (
          <div
            className="w-full mb-4 flex items-center justify-between"
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
                className="size-6 mx-1 cursor-pointer rounded-full hover:scale-150"
                alt=""
              />
              <img
                src="../reject.png"
                className="size-6 mx-1 cursor-pointer hover:scale-150"
                alt=""
              />
            </div>
          </div>
        ))
      ) : (
        <h1>No Friend Request</h1>
      )}
    </>
  );
}

export default FriendRequestOptions;
