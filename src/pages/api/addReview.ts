// src/pages/api/addReview.ts

import { getSession } from "@auth0/nextjs-auth0";
import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

const supabaseService = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // service key (never exposed client-side)
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const session = await getSession(req, res);
  if (!session || !session.user)
    return res.status(401).json({ error: "Unauthorized" });

  const { stars, content } = req.body;
  if (!stars || !content?.trim()) {
    return res.status(400).json({ error: "Invalid review data" });
  }

  const user = session.user;

  const { error } = await supabaseService.from("reviews").insert([
    {
      user_id: user.sub,
      name: user.name || user.email,
      avatar_url: user.picture,
      stars,
      content,
    },
  ]);

  if (error) {
    console.error("Supabase insert error:", error.message);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ success: true });
}
