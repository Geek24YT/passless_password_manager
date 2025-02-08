import { AddCards } from "@/components/AddCards";
import { AddPassword } from "@/components/AddPassword";
import { YourCards } from "@/components/YourCards";
import { YourPasswords } from "@/components/YourPasswords";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Passless",
  description: "A simple pasword manager for you.",
};

export default async function Home() {
  const user = await currentUser();
  console.log(user?.privateMetadata);
  return (
    <div>
      <div className="flex flex-col md:flex-row p-4 mt-10 mb-5 gap-4 pl-5 pr-5">
        <div className="mx-auto w-full mb-5">
          <AddCards />
        </div>
        <div className="mx-auto w-full mb-5">
          <AddPassword />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4 pl-5 pr-5 mb-10">
        <div className="w-full">
          <YourCards
            cards={
              Array.isArray(user?.privateMetadata?.cards)
                ? user?.privateMetadata?.cards
                : []
            }
          />
        </div>

        <div className="w-full">
          <YourPasswords
            passwords={
              Array.isArray(user?.privateMetadata?.passwords)
                ? user?.privateMetadata?.passwords
                : []
            }
          />
        </div>
      </div>
    </div>
  );
}
