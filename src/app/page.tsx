"use client";
import { useEffect, useState } from "react";
import Button from "./components/ui/Button";
import { useUserContext } from "@/context/UserContextProvider";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    image: "",
  });
  const data = useSession();
  useEffect(() => {
    if (data.status === "authenticated") {
      const { user } = data.data;
      setUserInfo({
        name: user?.name || "",
        email: user?.email || "",
        image: user?.image || "",
      });
      setIsLoading(false);
    } else if (data.status === "loading") {
    } else {
      setIsLoading(false);
    }
  }, [data]);
  return (
    <div>
      <nav className="flex w-full items-center justify-between bg-slate-50 px-2 h-[7dvh]">
        <h1 className="font-semibold text-xl sm:text-2xl">
          <Link href="/">Logo</Link>
        </h1>
        <div className="w-1/2 flex items-center justify-between text-lg sm:text-xl">
          <Link href="/">Home</Link>
          <Link
            href={`${userInfo.name ? "/dashboard/add" : "/"}`}
            className={`${!userInfo.name && "text-gray-500 cursor-text"}`}
          >
            Dashboard
          </Link>
        </div>

        <div className="min-w-32">
          {isLoading && <div></div>}
          {!isLoading &&
            (userInfo.name && userInfo.image ? (
              <div className="w-full h-full flex items-center justify-between">
                <h1 className="mx-2">{userInfo.name.split(" ")[0]}</h1>
                <img
                  className="size-10 object-cover rounded-full"
                  src={userInfo.image}
                  alt=""
                />
                <img
                  src="logout.png"
                  className="m-4 size-8 object-cover cursor-pointer"
                  onClick={async () => {
                    await signOut();
                  }}
                  alt="logout"
                />
              </div>
            ) : (
              <Link
                href="/login"
                className="w-full h-full flex items-center justify-between"
              >
                <div className="mx-2 text-lg sm:text-xl">Login</div>

                <img
                  className="w-12 h-12 object-cover rounded-full"
                  src="login.png"
                  alt="Login"
                />
              </Link>
            ))}
        </div>
      </nav>
      <h1>This is my website</h1>
      {userInfo.name || !isLoading ? (
        <div>
          <h1>Your name is : {userInfo?.name}</h1>
          <h1>Your email is : {userInfo?.email}</h1>
          <img src={userInfo?.image || ""} alt="User image" />
        </div>
      ) : (
        <Loader2 className="animate-spin" />
      )}
      <Button variant="default" size="default" isLoading={isLoading}>
        Button
      </Button>
      <Button isLoading={isLoading}>Button</Button>
    </div>
  );
}
