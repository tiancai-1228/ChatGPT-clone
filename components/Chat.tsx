"use client";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { db } from "../firebast";
import Message from "./Message";

interface Props {
  chatId: string;
}

function Chat({ chatId }: Props) {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createAt", "asc")
      )
  );

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">Ask your Question</p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}
      {messages?.docs.map((message, index) => (
        <Message
          key={message.id}
          message={message.data()}
          isLast={index === messages.docs.length - 1}
        />
      ))}
    </div>
  );
}

export default Chat;
