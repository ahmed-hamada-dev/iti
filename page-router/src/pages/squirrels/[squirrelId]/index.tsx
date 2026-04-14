import { useRouter } from "next/router";
import { squirrels } from "@/lib/squirrels";
import SquirrelDetails from "@/components/squirrels/SquirrelDetails";
import SquirrelDetailsSkeleton from "@/components/squirrels/SquirrelDetailsSkeleton";

function SquirrelPage() {
  const router = useRouter();
  const { squirrelId } = router.query;

  if (!router.isReady) {
    return (
      <div className="p-16">
        <SquirrelDetailsSkeleton />
      </div>
    );
  }

  const squirrel = squirrels.find((s) => s.id === Number(squirrelId));

  if (!squirrel) {
    return (
      <div className=" p-16 text-center text-xl text-gray-500">
        Squirrel not found
      </div>
    );
  }

  return (
    <div className=" p-16 ">
      <SquirrelDetails squirrel={squirrel} />
    </div>
  );
}

export default SquirrelPage;
