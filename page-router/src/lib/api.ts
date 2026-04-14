import { Squirrel } from "./squirrels";
export const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export async function getSquirrels(): Promise<Squirrel[]> {
  try {
    const res = await fetch(`${baseUrl}/api/squirrels`);
    if (!res.ok) {
      throw new Error(`Failed to fetch squirrels: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching squirrels:", error);

    return [];
  }
}

export async function getSquirrelById(
  id: number | string,
): Promise<Squirrel | null> {
  try {
    const res = await fetch(`${baseUrl}/api/squirrels/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch squirrel ${id}: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Error fetching squirrel ${id}:`, error);
    return null;
  }
}
