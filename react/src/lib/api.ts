import axios from "axios";
import type { Squirrel } from "./squirrels";
import type { SquirrelFormData } from "../components/squirrels/ControlledSquirrelForm";

const API_URL = "http://localhost:5000/squirrels";

export async function getSquirrels(search?: string, type?: string): Promise<Squirrel[]> {
  const params: Record<string, string> = {};
  if (type && type !== "all") params.type = type;
  
  const res = await axios.get<Squirrel[]>(API_URL, { params });
  let data = res.data;
  
  if (search) {
    const s = search.toLowerCase();
    data = data.filter(sq => 
      String(sq.id).toLowerCase().includes(s) || 
      sq.name.toLowerCase().includes(s) || 
      sq.description.toLowerCase().includes(s)
    );
  }
  
  return data;
}

export async function getSquirrel(id: string | number): Promise<Squirrel> {
  const res = await axios.get<Squirrel>(`${API_URL}/${id}`);
  return res.data;
}

export async function createSquirrel(data: SquirrelFormData): Promise<Squirrel> {
  const res = await axios.post<Squirrel>(API_URL, data);
  return res.data;
}

export async function updateSquirrel(id: string | number, data: Partial<SquirrelFormData>): Promise<Squirrel> {
  const res = await axios.patch<Squirrel>(`${API_URL}/${id}`, data);
  return res.data;
}

export async function deleteSquirrel(id: string | number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
