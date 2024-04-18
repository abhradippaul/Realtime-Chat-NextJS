"use client";

import FriendRequestOptions from "@/app/components/FriendRequestOptions";
import { useUserContext } from "@/context/UserContextProvider";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

function page() {
  const [isLoading, setIsLoading] = useState(true);
  const [pendingRequests, setPendingRequests] = useState([]);
  const { user } = useUserContext();
  useEffect(() => {
    if (user.email) {
      fetch(`/api/friendrequest?userEmail=${user.email}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setPendingRequests(data.friendRequest);
          }
        })
        .catch((err) => {
          console.log("The error is ", err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user]);
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <h1 className="text-center my-4 text-2xl font-semibold">
        Pending Friend Requests
      </h1>
      <div className="w-1/2 flex items-center justify-center my-4 max-w-[500px]">
        {isLoading ? (
          <Loader2 className="size-8 animate-spin" />
        ) : (
          <FriendRequestOptions value={pendingRequests} />
        )}
      </div>
    </main>
  );
}

export default page;
