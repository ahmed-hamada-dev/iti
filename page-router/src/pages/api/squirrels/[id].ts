import type { NextApiRequest, NextApiResponse } from "next";
import { squirrels, Squirrel } from "@/lib/squirrels";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Squirrel | { error: string }>
) {
  const { id } = req.query;
  const squirrel = squirrels.find((s) => s.id === Number(id));

  if (!squirrel) {
    return res.status(404).json({ error: "Squirrel not found" });
  }

  res.status(200).json(squirrel);
}
