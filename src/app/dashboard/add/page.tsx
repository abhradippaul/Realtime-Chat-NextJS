"use client"
import Button from "@/app/components/ui/Button";

function page() {
  return (
    <main className="min-h-dvh flex items-center justify-evenly flex-col">
      <h1 className="text-2xl sm:text-4xl my-4">Add a friend</h1>
      <form
        className="text-xl my-4 sm:text-2xl"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="addfriend" className="text-xl sm:text-2xl">
          Add friend by E-Mail
        </label>
        <br />
        <div className="w-full flex items-center">
          <input
            id="addfriend"
            className="border focus:border-2 outline-none rounded-md my-4 mr-4 px-4 py-2 text-lg sm:text-xl"
            placeholder="abc@example.com"
          />
          <Button variant="add" size="default">
            {" "}
            Add{" "}
          </Button>
        </div>
      </form>
    </main>
  );
}

export default page;
