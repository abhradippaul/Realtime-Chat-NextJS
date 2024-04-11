"use client";
import Button from "@/app/components/ui/Button";
import { useUserContext } from "@/context/UserContextProvider";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface successValue {
  success: boolean;
  data?: object | null;
  message?: string | null;
}
function page() {
  const [test, setTest] = useState(0);
  const [success, setSuccess] = useState<successValue>({
    success: false,
    data: null,
    message: null,
  });
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUserContext();

  const addFriend = useCallback(async (email: string) => {
    try {
      if (!email) {
        throw new Error("Please enter valied email address");
      }
      console.log(email);
      const response = await fetch("http://localhost:3000/api/addfriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data?.user?.name && data?.user?.image) {
        setSuccess({
          success: true,
          data,
        });
      } else {
        setSuccess({
          success: false,
          message: data.message,
        });
      }
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      setSuccess({
        success: false,
        message: err.message,
      });
      setIsLoading(false);
      console.log("The error is ", err.message);
    }
  }, []);

  if (user.email) {
    return (
      <main className="min-h-dvh flex items-center justify-evenly flex-col">
        <h1 className="text-2xl sm:text-4xl my-4">Add a friend</h1>
        <form
          className="text-xl my-4 sm:text-2xl"
          onSubmit={(e) => {
            setIsLoading(true);
            e.preventDefault();
            addFriend(input);
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
              {/* <img src="plus.png" alt="image" /> */}
              Add
            </Button>
          </div>
          {success?.success ? (
            <h1 className="text-center text-green-500">
              Friend request send successfully
            </h1>
          ) : (
            <h1 className="text-center text-red-500">{success.message}</h1>
          )}
        </form>

        {/* <button onClick={() => setTest((prev) => prev + 1)}>Button {test}</button> */}
      </main>
    );
  } else {
    // const router = useRouter();
    // (() => {
    //   setTimeout(() => {
    //     router.replace("/login");
    //   }, 1000);
    // })();
    // return <h1>Login first</h1>;
  }
}

export default page;
