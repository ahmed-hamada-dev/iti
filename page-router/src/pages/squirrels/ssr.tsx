import { GetServerSideProps } from "next";
import { Squirrel } from "@/lib/squirrels";
import { getSquirrels } from "@/lib/api";
import SquirrelCard from "@/components/squirrels/SquirrelCard";

interface SSRProps {
  squirrels: Squirrel[];
  fetchedAt: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const squirrels = await getSquirrels();

  return {
    props: {
      squirrels: squirrels,
      fetchedAt: new Date().toLocaleTimeString(),
    },
  };
};

export default function SSRPage({ squirrels, fetchedAt }: SSRProps) {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">
        Server-Side Rendering (SSR)
      </h1>
     
      <p className="mb-8 text-sm text-gray-500">
        Page generated at: <span className="font-mono">{fetchedAt}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {squirrels.map((squirrel) => (
          <SquirrelCard key={squirrel.id} squirrel={squirrel} />
        ))}
      </div>
    </div>
  );
}
