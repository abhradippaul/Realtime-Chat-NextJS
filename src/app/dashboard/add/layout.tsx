import Dashboard from "@/app/components/Dashboard";
import FriendRequestOptions from "@/app/components/FriendRequestOptions";
import Friends from "@/app/components/Friends";
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

async function  Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex items-center justify-between h-screen">
      <Dashboard />
      {children}
    </div>
  );
}

export default Layout;
