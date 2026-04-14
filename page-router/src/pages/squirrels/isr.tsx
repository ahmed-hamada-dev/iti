import { GetStaticProps } from "next";
import { Squirrel } from "@/lib/squirrels";
import { getSquirrels } from "@/lib/api";
import SquirrelCard from "@/components/squirrels/SquirrelCard";

interface ISRProps {
  squirrels: Squirrel[];
  revalidatedAt: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const squirrels = await getSquirrels();

  return {
    props: {
      squirrels: squirrels,
      revalidatedAt: new Date().toLocaleTimeString(),
    },
    revalidate: 10,
  };
};

export default function ISRPage({ squirrels, revalidatedAt }: ISRProps) {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4 text-green-600">
        Incremental Static Regeneration (ISR)
      </h1>
      <p className="mb-8 text-sm text-gray-500">
        Last revalidated at: <span className="font-mono">{revalidatedAt}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {squirrels.map((squirrel) => (
          <SquirrelCard key={squirrel.id} squirrel={squirrel} />
        ))}
      </div>
    </div>
  );
}
