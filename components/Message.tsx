import { DocumentData } from "firebase/firestore";
import React, { useState } from "react";
import ChatPGT from "../public/image/ChatPGT.png";
import { Typewriter } from "react-simple-typewriter";

interface Props {
  message: DocumentData;
  isLast: boolean;
}

function Message({ message, isLast }: Props) {
  const isChatGPT = message.user.name === "ChatGPT";

  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img
          src={isChatGPT ? ChatPGT.src : message.user.avatar}
          alt=""
          className="h-8 w-8"
        />
        <p className="pt-1 text-sm">
          {isLast ? (
            <Typewriter
              words={[message.text]}
              loop={1}
              cursor
              cursorStyle={false}
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          ) : (
            <p>{message.text}</p>
          )}
        </p>
      </div>
    </div>
  );
}

export default Message;
