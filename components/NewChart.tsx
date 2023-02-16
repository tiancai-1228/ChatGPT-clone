"use client";
import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebast";
import { useRouter } from "next/navigation";

function NewChart() {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChart = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        messages: [],
        userId: session?.user?.email!,
        createAt: serverTimestamp(),
      }
    );

    router.push(`/chat/${doc.id}`);
  };

  return (
    <div onClick={createNewChart} className="border-gray-700 border chatRow">
      <PlusIcon className="h-4 w-4" />
      <p>New Chat</p>
    </div>
  );
}

export default NewChart;
