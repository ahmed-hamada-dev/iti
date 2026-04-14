import SquirrelList from "@/components/squirrels/SquirrelList";
import Link from "next/link";
import { squirrelStrategies } from "@/lib/constants";

function SquirrelsPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Squirrel Data Fetching Strategies</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {squirrelStrategies.map((s) => (
          <Link key={s.href} href={s.href}>
            <div className={`${s.color} hover:opacity-90 text-white p-4 rounded-lg text-center font-bold cursor-pointer transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1`}>
              {s.name}
            </div>
          </Link>
        ))}
      </div>

      <hr className="my-12" />
      
      <SquirrelList />
    </div>
  );
}

export default SquirrelsPage;
