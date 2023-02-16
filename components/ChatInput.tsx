"use client";
import React, { FormEvent, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "../firebast";
import { toast } from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

interface Props {
  chatId: string;
}

function ChatInput({ chatId }: Props) {
  const [inputVal, setInputVal] = useState("");

  const { data: session } = useSession();
  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputVal) return;
    const text = inputVal.trim();
    setInputVal("");

    const message: Message = {
      text: text,
      createAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    const notification = toast.loading("ChatGPT is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text, chatId, model, session }),
    }).then((res) => {
      toast.success("ChatGPT has responded", { id: notification });
    });
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg test-sm">
      <form
        onSubmit={(e) => {
          sendMessage(e);
          return false;
        }}
        className="p-5 space-x-5 flex"
      >
        <input
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          type="text"
          placeholder="input message..."
        />

        <button
          type="submit"
          className="bg-[#11a37f] hover:opacity-50 text-white font-bold px-4 py-2
          rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>

      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
