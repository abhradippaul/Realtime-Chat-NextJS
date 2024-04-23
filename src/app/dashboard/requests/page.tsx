"use client";

import FriendRequestOptions from "@/app/components/FriendRequestOptions";
import { useUserContext } from "@/context/UserContextProvider";
import { pusherClient, toPusherKey } from "@/lib/pusher";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface requestValue {
  name: string;
  email: string;
  image: string;
}

function page() {
  const [isLoading, setIsLoading] = useState(true);
  const [pendingRequests, setPendingRequests] = useState<requestValue[]>([]);
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
            console.log(data.friendRequest);
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

  useEffect(() => {
    if (user.email) {
      if (!pendingRequests?.length) {
        pusherClient.subscribe(`user__${user.email}__pending_friend`);
        pusherClient.bind(`pending_friend`, (data: any) => {
          setPendingRequests([data]);
        });
      } else {
        pusherClient.subscribe(`user__${user.email}__pending_friend`);
        pusherClient.bind(`pending_friend`, (data: any) => {
          console.log("Testing");
          setPendingRequests((prev) => [...prev, data]);
        });
      }
    }
    return () => {
      pusherClient.unsubscribe(`user__${user.email}__pending_friend`);
      pusherClient.unbind(`pending_friend`);
    };
  }, [user, pendingRequests]);
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <h1 className="text-center my-4 text-2xl font-semibold">
        Pending Friend Requests
      </h1>
      <div className="w-[80%] flex flex-col items-center justify-center my-4 max-w-[500px]">
        {isLoading ? (
          <Loader2 className="size-8 animate-spin" />
        ) : (
          <FriendRequestOptions
            value={pendingRequests}
            setValue={setPendingRequests}
          />
        )}
      </div>
    </main>
  );
}

export default page;
