import type { NextApiRequest, NextApiResponse } from "next";
import { squirrels, Squirrel } from "@/lib/squirrels";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Squirrel[]>
) {
  res.status(200).json(squirrels);
}
