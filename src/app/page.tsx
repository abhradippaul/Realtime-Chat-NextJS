"use client";
import { useEffect, useState } from "react";
import Button from "./components/ui/Button";
import { useSession } from "next-auth/react";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(false);
    // test("key","value")
    // console.log(data);
  }, []);
  return (
    <div>
      <h1>This is my website</h1>
      <Button variant="default" size="default" isLoading={isLoading}>
        Button
      </Button>
      <Button isLoading={isLoading}>Button</Button>
    </div>
  );
}
