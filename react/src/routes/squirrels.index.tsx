import { createFileRoute } from "@tanstack/react-router";
import SquirrelList from "#/components/squirrels/SquirrelList";

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
