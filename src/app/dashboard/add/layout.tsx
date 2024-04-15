import FriendRequestOptions from "@/app/components/FriendRequestOptions";
import UserInfo from "@/app/components/UserInfo";
import Link from "next/link";
import { ReactNode } from "react";
// import logo from "adduser.png"

const overviewOptions = [
  {
    name: "Add Friend",
    icon: "../adduser.png",
  },
];

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex items-center justify-between h-screen">
      <div className="flex flex-col justify-between h-full w-full max-w-xs border-r overflow-y-auto p-4">
        <Link href="/">Logo</Link>
        <nav className="flex flex-col">
          <FriendRequestOptions />
          <hr />
          <ul className="flex flex-col">
            <h1 className="mt-4 text-2xl font-semibold text-center">Explore Friends</h1>
            {overviewOptions.map((option) => (
              <li
                key={option.name}
                className="my-4 border-indigo-50 rounded-lg cursor-pointer hover:bg-indigo-50"
              >
                <div className="w-full flex items-center justify-between h-12">
                  <img
                    src={option.icon}
                    alt="Add user"
                    className="size-6 ml-4"
                  />
                  <h1 className="text-center w-full text-lg sm:text-xl">
                    {option.name}
                  </h1>
                </div>
              </li>
            ))}
          </ul>
          <hr />
          <h1 className="text-center font-semibold my-2 text-xl sm:text-2xl">
            Your chats
          </h1>
          <ul className="flex flex-col">
            <li>First Chat</li>
            <li>Second Chat</li>
          </ul>
        </nav>
        <UserInfo />
      </div>
      {children}
    </div>
  );
}

export default Layout;
