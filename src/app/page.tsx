"use client";
import { useEffect, useState } from "react";
import Button from "./components/ui/Button";
import { useSession } from "next-auth/react";
import { useUserContext } from "@/context/UserContextProvider";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useUserContext();
  console.log(user);
  
  useEffect(() => {
    setIsLoading(false);
    // test("key","value")
    // console.log(data);
  }, []);

  return (
    <div>
      <h1>This is my website</h1>
      {user.email && (
        <div>
          <h1>Your name is : {user.name}</h1>
          <h1>Your email is : {user.email}</h1>
          <img src={user.image} alt="" />
        </div>
      )}
      <Button variant="default" size="default" isLoading={isLoading}>
        Button
      </Button>
      <Button isLoading={isLoading}>Button</Button>
    </div>
  );
}
