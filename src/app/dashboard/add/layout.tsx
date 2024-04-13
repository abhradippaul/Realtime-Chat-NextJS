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
      <div className="flex flex-col h-full w-full max-w-xs border-r overflow-y-auto p-4">
        <Link href="/">Logo</Link>
        <h1 className="">Your chats</h1>
        <nav className="flex flex-col">
          <ul className="flex flex-col">
            {overviewOptions.map((option) => (
              <li key={option.name} className="my-4 border-indigo-50 rounded-lg cursor-pointer hover:bg-indigo-50">
                <div className="w-full flex items-center justify-between h-12">
                  <img src={option.icon} alt="Add user" className="w-8 h-8 ml-4" />
                  <h1 className="text-center w-full text-lg sm:text-xl">{option.name}</h1>
                </div>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col">
            <li>First Chat</li>
            <li>Second Chat</li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
}

export default Layout;
