import { GetStaticProps } from "next";
import { Squirrel } from "@/lib/squirrels";
import { getSquirrels } from "@/lib/api";
import SquirrelCard from "@/components/squirrels/SquirrelCard";

interface SSGProps {
  squirrels: Squirrel[];
}

export const getStaticProps: GetStaticProps<
  SSGProps | { error: string }
> = async () => {
  const squirrels = await getSquirrels();

  return {
    props: {
      squirrels: squirrels,
    },
  };
};

export default function SSGPage({ squirrels }: SSGProps) {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4 text-orange-600">
        Static Site Generation (SSG)
      </h1>
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {squirrels.map((squirrel) => (
          <SquirrelCard key={squirrel.id} squirrel={squirrel} />
        ))}
      </div>
    </div>
  );
}
