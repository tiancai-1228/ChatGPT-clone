"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import NewChart from "./NewChart";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebast";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

function SideBar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createAt", "asc")
      )
  );

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChart />

          <div className="hidden sm:inline">
            <ModelSelection />
          </div>

          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animate-pulse text-center text-white">
                Loading Chats...
              </div>
            )}

            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      {session && (
        <>
          <img
            src={session.user?.image!}
            alt="user img"
            className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2"
          />
          <div
            className="text-white flex my-4 items-center text-xl justify-center  hover:opacity-50 hover:cursor-pointer"
            onClick={() => {
              signOut();
            }}
          >
            <ArrowRightOnRectangleIcon className="h-8 w-8 " />
            <p className="ml-4"> Log out</p>
          </div>
        </>
      )}
    </div>
  );
}

export default SideBar;
