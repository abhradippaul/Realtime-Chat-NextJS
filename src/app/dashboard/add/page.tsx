"use client";
import Button from "@/app/components/ui/Button";
import { useUserContext } from "@/context/UserContextProvider";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

function page() {
  const [success, setSuccess] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUserContext();

  const addFriend = useCallback(async (email: string, userEmail: string) => {
    try {
      if (!email) {
        throw new Error("Please enter valied email address");
      }
      // console.log(userEmail);
      const response = await fetch("http://localhost:3000/api/addfriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          userEmail: userEmail,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        toast.success("Friend request send successfully");
      } else {
        setSuccess(false);
        toast.error(data.message);
      }
      setIsLoading(false);
    } catch (err: any) {
      setSuccess(false);
      toast.error(err.message);
      setIsLoading(false);
    }
    setInput("");
  }, []);

  return (
    <main className="min-h-dvh w-full flex items-center justify-center flex-col">
      <h1 className="text-2xl sm:text-4xl my-8">Add a friend</h1>
      <form
        className="text-xl my-8 sm:text-2xl"
        onSubmit={(e) => {
          setIsLoading(true);
          e.preventDefault();
          if (input === user.email) {
            setSuccess(false);
            toast.error("You cannot add you as a friend");
            setIsLoading(false);
            setInput("");
          } else {
            addFriend(input, user.email);
          }
        }}
      >
        <label htmlFor="addfriend" className="text-xl sm:text-2xl">
          Add friend by E-Mail
        </label>
        <br />
        <div className="w-full flex items-center">
          <input
            id="addfriend"
            className="border focus:border-black outline-none rounded-md my-4 mr-4 px-4 py-2 text-lg sm:text-xl"
            placeholder="abc@example.com"
            value={input}
            required
            type="email"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button variant="add" size="default" isLoading={isLoading}>
            Add
          </Button>
        </div>
      </form>
    </main>
  );
}

export default page;
