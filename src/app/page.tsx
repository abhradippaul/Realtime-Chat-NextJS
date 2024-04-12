"use client";
import { useEffect, useState } from "react";
import Button from "./components/ui/Button";
import { useUserContext } from "@/context/UserContextProvider";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useUserContext();
  console.log(user);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div>
      <h1>This is my website</h1>
      {user.name ? (
        <div>
          <h1>Your name is : {user?.name}</h1>
          <h1>Your email is : {user?.email}</h1>
          <img src={user?.image || ""} alt="User image" />
        </div>
      ) : <Loader2 className="animate-spin" />}
      <Button variant="default" size="default" isLoading={isLoading}>
        Button
      </Button>
      <Button isLoading={isLoading}>Button</Button>
    </div>
  );
}