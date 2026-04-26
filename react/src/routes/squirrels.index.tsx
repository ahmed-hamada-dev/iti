import { createFileRoute } from "@tanstack/react-router";
import SquirrelList from "@/features/squirrels/components/SquirrelList";

export const Route = createFileRoute("/squirrels/")({
  component: SquirrelsPage,
});

function SquirrelsPage() {
  return (
    <main className="">
      <SquirrelList />
    </main>
  );
}
