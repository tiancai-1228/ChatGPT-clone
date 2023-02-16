// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { adminDb } from "../../firebaseAdmin";
import query from "../../lib/queryApi";
import admin from "firebase-admin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "please provide a prompt!" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "please provide a valid chat id!" });
    return;
  }
  const response = await query(prompt, chatId, model);

  const message: Message = {
    text: response || "chatGPT was unable to find",
    createAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "ChatGPT",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email!)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
