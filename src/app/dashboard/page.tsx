"use client";
import React, { useEffect, useState } from "react";
import Friends from "../components/Friends";
import { useUserContext } from "@/context/UserContextProvider";
import { pusherClient } from "@/lib/pusher";

interface friendlistValue {
  name: string;
  image: string;
  email: string;
}
function page() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserContext();
  const [friendlist, setFriendlist] = useState<friendlistValue[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [pendingMsg, setPendingMsg] = useState([]);

  useEffect(() => {
    if (user.email) {
      (async () => {
        const reponse = await fetch(`/api/dashboard?userEmail=${user.email}`);
        const data = await reponse.json();
        if (data.success) {
          setFriendlist(data.friendlist);
          setIsLoading(false);
          setPendingMsg(data.pendingChat);
        }
      })();
    }
  }, [user, reload]);

  useEffect(() => {
    (async () => {
      if (user.email) {
        pusherClient.subscribe(`user__${user.email}__dashboard_data`);
        pusherClient.bind(`dashboard_data`, () => {
          setReload((prev) => !prev);
        });
      }
    })();
    return () => {
      pusherClient.unsubscribe(`user__${user.email}__dashboard_data`);
      pusherClient.unbind(`dashboard_data`);
    };
  }, [user]);
  return (
    !isLoading && (
      <main className="w-full sm:px-[100px] flex flex-col h-full items-center justify-center">
        <h1 className="text-xl my-8">Recent Chats</h1>
        {friendlist.length ? (
          <Friends value={friendlist} pendingMsg={pendingMsg} />
        ) : (
          <h1>You do not have any friend</h1>
        )}
      </main>
    )
  );
}

export default page;
