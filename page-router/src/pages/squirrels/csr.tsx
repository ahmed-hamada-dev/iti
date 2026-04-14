import { useEffect, useState } from "react";
import { Squirrel } from "@/lib/squirrels";
import { getSquirrels } from "@/lib/api";
import SquirrelCard from "@/components/squirrels/SquirrelCard";

export default function CSRPage() {
  const [squirrels, setSquirrels] = useState<Squirrel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await getSquirrels();
        setSquirrels(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4 text-purple-600">
        Client-Side Rendering (CSR)
      </h1>
    
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-80 rounded-lg"
            ></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 text-center font-bold text-xl py-12">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {squirrels.map((squirrel) => (
            <SquirrelCard key={squirrel.id} squirrel={squirrel} />
          ))}
        </div>
      )}
    </div>
  );
}
