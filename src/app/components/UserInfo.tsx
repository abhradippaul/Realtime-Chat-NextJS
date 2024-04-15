"use client";

import { useUserContext } from "@/context/UserContextProvider";
import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { memo } from "react";

function UserInfo() {
  const { user } = useUserContext();
  const router = useRouter();
  if (user.name) {
    return (
      <div className="w-full border flex justify-between items-center py-4 px-2 rounded-md">
        <img
          src={`${user.image}`}
          className="size-10 rounded-full"
          alt="user image"
        />
        <div>
          <h1 className="text-lg">{user.name}</h1>
        </div>
        <img
          src="../logout.png"
          className="size-8 cursor-pointer"
          alt="logout"
          onClick={async () => {
            await signOut();
            router.push("/");
          }}
        />
      </div>
    );
  } else {
    return (
      <div className="w-full border flex justify-center items-center py-4 px-2 rounded-md">
        <Loader2 className="animate-spin size-8" />
      </div>
    );
  }
}

export default memo(UserInfo);
