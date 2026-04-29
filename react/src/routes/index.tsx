import Hero from "#/components/hero/Hero";
import AboutPage from "#/components/about/AboutPage";
import Features from "#/components/features/Features";
import Contact from "#/components/contact/Contact";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <>
      <Hero />
      <AboutPage />
      <Features />
      <Contact />
    </>
  );
}
