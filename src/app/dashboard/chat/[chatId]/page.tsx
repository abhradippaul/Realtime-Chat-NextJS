"use client";
import { useUserContext } from "@/context/UserContextProvider";
import { pusherClient } from "@/lib/pusher";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ReactTextareaAutosize from "react-textarea-autosize";

interface MsgValue {
  message: string;
  timeStamp?: string;
  sender?: string;
  receiver?: string;
}

function page() {
  const { chatId: friendEmail } = useParams();
  const { user } = useUserContext();
  const userEmail = user.email;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<MsgValue[]>([
    {
      message: "",
      timeStamp: "",
      sender: "",
      receiver: "",
    },
  ]);
  const [userInput, setUserInput] = useState<string>("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    image: "",
    chatId: "",
  });
  const lastMessage: any = useRef(null);
  useEffect(() => {
    if (userEmail && friendEmail) {
      (async () => {
        const response = await fetch(
          `/api/chats?userEmail=${userEmail}&friendEmail=${
            friendEmail + "@gmail.com"
          }`
        );
        const chat = await response.json();
        // console.log(chat);
        if (chat.success) {
          setUserInfo({
            ...chat.friendInfo,
            email: friendEmail + "@gmail.com",
          });
          // setMessage([JSON.parse(chat.data)]);
          const temp: any = [];
          for (let i = 0; i < chat.data.length; i++) {
            // console.log(chat.data[i]);
            temp.push(JSON.parse(chat.data[i]));
          }
          // pusherClient.subscribe(`chat__${chat.friendInfo.chatId}__messages`);
          // pusherClient.bind(
          //   `messages`,
          //   ({
          //     msg,
          //     sender,
          //     receiver,
          //     timeStamp,
          //   }: {
          //     msg: string;
          //     sender: string;
          //     receiver: string;
          //     timeStamp: string;
          //   }) => {
          //     setMessage((prev: any) => [
          //       ...prev,
          //       {
          //         message: msg,
          //         timeStamp: timeStamp,
          //         sender: sender,
          //         receiver: receiver,
          //       },
          //     ]);
          //     console.log({
          //       message: msg,
          //       timeStamp: timeStamp,
          //       sender: sender,
          //       receiver: receiver,
          //     });
          //   }
          // );
          setMessage(temp);
          setIsLoading(false);
        } else {
          toast.error(chat.message);
        }
      })();
    }
  }, [friendEmail, userEmail]);

  useEffect(() => {
    if (userInfo.chatId && userEmail) {
      pusherClient.subscribe(`chat__${userInfo.chatId}__messages`);
      pusherClient.bind(
        `messages`,
        ({
          msg,
          sender,
          receiver,
          timeStamp,
        }: {
          msg: string;
          sender: string;
          receiver: string;
          timeStamp: string;
        }) => {
          if (userEmail === receiver) {
            setMessage((prev: any) => [
              ...prev,
              {
                message: msg,
                timeStamp: timeStamp,
                sender: sender,
                receiver: receiver,
              },
            ]);
          }
        }
      );
    }
  }, [userEmail, userInfo]);

  useEffect(() => {
    lastMessage?.current?.scrollIntoView([{ behavior: "smooth" }]);
  }, [message]);

  const sendMessage = useCallback(async () => {
    if (userInput) {
      const response = await fetch(
        `/api/chats?chatId=${
          userInfo.chatId
        }&userEmail=${userEmail}&friendEmail=${friendEmail + "@gmail.com"}`,
        {
          method: "POST",
          body: JSON.stringify({
            msg: userInput,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        if (message[0]?.message) {
          setMessage((prev) => [...prev, data.message]);
        } else {
          setMessage([data.message]);
        }
      } else {
        toast.error(data.message);
      }
      setUserInput("");
    } else {
      toast.error("Empty message");
    }
  }, [userInput, message, userInfo, userEmail, friendEmail]);

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
      <div className="max-h-[80dvh] flex-grow overflow-y-auto p-4">
        {message[0]?.message &&
          message.map((msg, i) => (
            <div
              key={msg.timeStamp}
              className={`w-full my-2 flex items-center ${
                userEmail === msg.receiver && "flex-row-reverse"
              } justify-between`}
            >
              <div className="w-[45%]"></div>
              <div
                className={`w-[45%] max-w-max px-4 py-2 rounded-md ${
                  userEmail === msg.receiver
                    ? "bg-gray-100 text-black rounded-bl-none"
                    : "bg-indigo-700 text-white rounded-br-none"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        <div ref={lastMessage}></div>
      </div>
      <div className="h-16 w-full border flex overflow-y-hidden items-center justify-around">
        <ReactTextareaAutosize
          className="border w-[80%] px-2 py-1 rounded-md text-lg sm:text-xl resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              sendMessage();
            }
          }}
          rows={1}
          placeholder="Enter a message"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
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
