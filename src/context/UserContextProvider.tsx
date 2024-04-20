"use client";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useMemo } from "react";

interface User {
  name: string;
  email: string;
  image: string;
}
interface UserObject {
  user: User;
}

const UserContext = createContext<UserObject>({
  user: {
    name: "",
    email: "",
    image: "",
  },
});

const User_Context_Provider = UserContext.Provider;

export const useUserContext = () => {
  return useContext(UserContext);
};
function UserContextProvider({ children }: { children: React.ReactNode }) {
  const { data } = useSession();

  const user = useMemo(
    () => ({
      name: data?.user?.name || "",
      email: data?.user?.email || "",
      image: data?.user?.image || "",
    }),
    [data]
  );

  return (
    <User_Context_Provider value={{ user }}>{children}</User_Context_Provider>
  );
}

export default UserContextProvider;
