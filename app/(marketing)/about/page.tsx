import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { stackServerApp } from "@/stack";

const reasons = [
  {
    title: "Simple Management",
    description:
      "Managing your plant collection shouldn't be a chore. GreenStock is designed with simplicity in mind, making it easy to add and organize your plants.",
  },
  {
    title: "Detailed Tracking",
    description:
      "Keep track of important details like plant names, descriptions, categories, prices, and stock levels all in one place.",
  },
  {
    title: "Visual Organization",
    description:
      "Upload images of your plants to create a visual inventory that helps you identify and manage your collection.",
  },
  {
    title: "Category System",
    description:
      "Organize your plants by categories like Indoor, Outdoor, Succulent, Flowering, Herb, Fern, Tree, and Shrub.",
  },
  {
    title: "Stock Management",
    description:
      "Track how many of each plant you have in stock, perfect for nurseries, garden centers, or personal collections.",
  },
];

export default async function AboutPage() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  return (
    <div>
      <section className="bg-brand-dark py-20 text-brand-dark-foreground sm:py-28">
        <Reveal className="mx-auto max-w-2xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            About GreenStock
          </h1>
          <p className="mt-4 text-brand-dark-muted">
            Your personal plant management tool, designed to help you
            organize and track your plant collection with ease.
          </p>
        </Reveal>
      </section>

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <p className="text-lg text-muted-foreground">
              GreenStock lets you easily <strong className="text-foreground">add, edit, and manage</strong>{" "}
              your plants with detailed information including names,
              descriptions, categories, prices, and stock levels. Our
              intuitive interface makes plant inventory management simple and
              efficient.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Why GreenStock?
            </h2>
          </Reveal>

          <RevealGroup className="mt-8 space-y-6">
            {reasons.map((reason) => (
              <RevealItem
                key={reason.title}
                className="flex gap-3 rounded-2xl border border-border bg-card p-5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold">{reason.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <Reveal className="mx-auto max-w-xl px-4 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to build your collection?
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            Create an account, start exploring, and build your unique
            GreenStock collection today.
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              size="lg"
              className="rounded-full bg-brand-lime text-brand-lime-foreground hover:bg-brand-lime/90"
              asChild
            >
              <Link href={user ? "/dashboard" : app.signUp}>Get Started</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
