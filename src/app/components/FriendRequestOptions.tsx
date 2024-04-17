"use client";

import { useUserContext } from "@/context/UserContextProvider";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

function FriendRequestOptions({value} : {value:any}) {
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
    if(value.length) {
      setFriendRequest(value)
      setIsLoading(false)
    } else {
      setFriendRequest([
        {
          name: "",
          email: "",
          image: "",
        },
      ])
      setIsLoading(false)
    }
    // console.log(value);
  }, [user,value]);

  const acceptFriend = useCallback(async(friendEmail:string) => {
    const response = await fetch(`/api/friendrequest?userEmail=${user.email}&friendEmail=${friendEmail}`,{
      method:"POST"
    })
    const data = await response.json()
    if(data.success){
      toast.success(data.message)
    }
  },[user])

  const rejectFriend = useCallback(async(friendEmail:string) => {
    const response = await fetch(`/api/friendrequest?userEmail=${user.email}&friendEmail=${friendEmail}`,{
      method:"DELETE"
    })
    const data = await response.json()
    if(data.success){
      toast.success(data.message)
    }
  },[user])

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
      ) : friendRequest.length && friendRequest[0].email ? (
        friendRequest.map((data) => (
          <div
            className="w-full mb-4 flex items-center hover:bg-indigo-50 cursor-default rounded-lg py-2 justify-between"
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
                  acceptFriend(data.email)
                }}
              />
              <img
                src="../reject.png"
                className="size-8 mx-1 cursor-pointer hover:scale-125"
                alt=""
                onClick={() => {
                  rejectFriend(data.email)
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-center text-lg mb-4">No Friend Request</h1>
      )}
    </>
  );
}

export default FriendRequestOptions;
