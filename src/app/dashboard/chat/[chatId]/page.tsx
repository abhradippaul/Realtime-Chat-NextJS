"use client";
import { useUserContext } from "@/context/UserContextProvider";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function page() {
  const { chatId: friendEmail } = useParams();
  const { user } = useUserContext();
  const userEmail = user.email;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    image: "",
  });
  useEffect(() => {
    if (userEmail && friendEmail) {
      (async () => {
        const response = await fetch(
          `/api/chats?userEmail=${userEmail}&friendEmail=${friendEmail}`
        );
        const chat = await response.json();
        if (chat.success) {
          setUserInfo({
            ...chat.friendInfo,
            email: friendEmail,
          });
          setIsLoading(false);
        }
        console.log(chat);
        setIsLoading(false);
      })();
    }
  }, [friendEmail, userEmail]);

  const sendMessage = useCallback(() => {
    console.log(message);
    setMessage("");
  }, [message]);
  return (
    <div className="w-full min-h-dvh flex flex-col justify-between">
      {isLoading ? (
        <div className="min-h-16 w-full flex items-center px-6">
          <Loader2 className="animate-spin size-10" />
        </div>
      ) : (
        <div className="min-h-16 w-full border flex items-center px-6">
          <img
            src={`${userInfo.image}`}
            className="size-10 rounded-full"
            alt=""
          />
          <div className="mx-6">
            <h1 className="sm:text-xl text-lg my-1">{userInfo.name}</h1>
            <h3 className="text-gray-700 my-1">{userInfo.email}</h3>
          </div>
        </div>
      )}
      <div className="min-h-16 w-full border flex items-center justify-around">
        <input
          className="border w-[80%] px-2 py-1 rounded-md text-lg sm:text-xl "
          placeholder="Enter a message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <div
          className="rounded-full cursor-pointer flex items-center justify-center p-2 border border-black overflow-hidden hover:bg-indigo-100"
          onClick={sendMessage}
        >
          <img src="../../send.png" className="size-6" alt="send" />
        </div>
      </div>
    </div>
  );
}

export default page;
