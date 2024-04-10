"use client";

import { useCallback, useState } from "react";
import Button from "../components/ui/Button";
import { signIn, signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useUserContext } from "@/context/UserContextProvider";
import { useRouter } from "next/navigation";

function page() {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false);
  const [isLoadingGithub, setIsLoadingGithub] = useState<boolean>(false);

  const {user} = useUserContext()
  console.log(user);

  const signInType = [
    {
      name: "Sign in with Google",
      provider: "google",
      logo: "google.png",
      isLoading: isLoadingGoogle,
      setLoading: (e: boolean) => setIsLoadingGoogle(e),
    },
    {
      name: "Sign in with Github",
      provider: "github",
      logo: "github.png",
      isLoading: isLoadingGithub,
      setLoading: (e: boolean) => setIsLoadingGithub(e),
    },
  ];
  const router = useRouter()
  const loginFunction = async ({ provider, setLoading }: any) => {
    setLoading(true);
    try {
      const response =  await signIn(provider);
      console.log("Next auth response ",response);
    } catch (err: any) {
      console.log("The error is ", err.message);
      toast.error("The error is ", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full flex flex-col items-center max-w-md space-y-8">
        <div className="flex flex-col items-center gap-8">
          logo
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account{" "}
          </h2>
        </div>
        <div className="max-w-80 w-[90%]">
          {signInType.map((item) => (
            <Button
              key={item.name}
              isLoading={item.isLoading}
              type="button"
              variant="signin"
              size="default"
              onClick={() => {
                const provider = item.provider;
                const setLoading = item.setLoading;
                loginFunction({ provider, setLoading });
              }}
            >
              {!item.isLoading && (
                <img
                  src={item.logo}
                  className="w-6 h-6 object-cover mr-4"
                  alt=""
                />
              )}
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
