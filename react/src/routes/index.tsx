import Hero from "#/components/hero/Hero";
import Features from "#/components/features/Features";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
}
