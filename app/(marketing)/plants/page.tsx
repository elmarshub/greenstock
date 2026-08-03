import { Droplets, Leaf, Smile, Sparkles, Sun, Thermometer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { safePlantMetadata } from "@/lib/metadata";
import { PLANT_CATEGORIES } from "@/lib/validations/plant";
import {
  categoryDescriptions,
  categoryImages,
  categorySlugs,
} from "@/lib/plant-images";
import { stackServerApp } from "@/stack";

export const metadata: Metadata = safePlantMetadata();

const reasons = [
  {
    icon: Sparkles,
    title: "Cleaner-feeling air",
    description:
      "Plants are known to freshen up a room, adding a bit of green life to any space they occupy.",
  },
  {
    icon: Smile,
    title: "Better mood & focus",
    description:
      "Many people find caring for plants calming a small daily ritual that's good for the mind.",
  },
  {
    icon: Leaf,
    title: "A rewarding hobby",
    description:
      "Watching something you planted grow and thrive is one of the simplest, most satisfying hobbies.",
  },
];

const careTips = [
  {
    icon: Sun,
    title: "Light",
    description:
      "Match each plant to its ideal light level bright indirect, direct sun, or low light for steady growth.",
  },
  {
    icon: Droplets,
    title: "Water",
    description:
      "Water when the top inch of soil feels dry for most plants; succulents want even less.",
  },
  {
    icon: Thermometer,
    title: "Humidity & temperature",
    description:
      "Ferns and tropicals prefer higher humidity, while succulents and outdoor shrubs tolerate drier air.",
  },
  {
    icon: Leaf,
    title: "Repotting",
    description:
      "Move up a pot size every year or two once roots start circling the bottom of the container.",
  },
];

const categories = PLANT_CATEGORIES;

export default async function PlantsGuidePage() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  const primaryHref = user ? "/dashboard" : app.signUp;

  return (
    <div>
      <section className="bg-brand-dark py-20 text-brand-dark-foreground sm:py-28">
        <Reveal className="mx-auto max-w-2xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Plant Care Guide
          </h1>
          <p className="mt-4 text-brand-dark-muted">
            Everything you need to know about plant categories, why people
            keep them, and how to keep yours healthy.
          </p>
        </Reveal>
      </section>

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why people keep plants
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
            {reasons.map((reason) => (
              <RevealItem
                key={reason.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary">
                  <reason.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{reason.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {reason.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-secondary/40 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Plant categories
            </h2>
            <p className="mt-4 text-muted-foreground">
              Not sure where to start? Here&apos;s what each category needs.
            </p>
          </Reveal>

          <div className="mt-14 space-y-6">
            {categories.map((category, index) => (
              <Reveal key={category} delay={index * 0.05}>
                <div
                  id={categorySlugs[category]}
                  className="grid scroll-mt-24 gap-6 overflow-hidden rounded-2xl border border-border bg-card sm:grid-cols-3"
                >
                  <Image
                    src={categoryImages[category]}
                    alt={`${category} plants`}
                    width={400}
                    height={300}
                    className="h-48 w-full object-cover sm:h-full"
                  />
                  <div className="flex flex-col justify-center p-6 sm:col-span-2">
                    <h3 className="text-xl font-semibold">{category}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {categoryDescriptions[category]}
                    </p>
                    <Link
                      href={`/dashboard/plants?category=${category}`}
                      className="mt-4 text-sm font-medium text-primary hover:underline"
                    >
                      Manage your {category.toLowerCase()} plants &rarr;
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-dark py-20 text-brand-dark-foreground sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Keeping your plants healthy
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {careTips.map((tip) => (
              <RevealItem
                key={tip.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-brand-lime text-brand-lime-foreground">
                  <tip.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{tip.title}</h3>
                <p className="mt-2 text-sm text-brand-dark-muted">
                  {tip.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="py-16">
        <Reveal className="mx-auto max-w-xl px-4 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to track your own collection?
          </h2>
          <p className="mt-3">
            Create an account and start managing your plant inventory in
            minutes.
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              size="lg"
              className="rounded-full bg-brand-lime text-brand-lime-foreground hover:bg-brand-lime/90"
              asChild
            >
              <Link href={primaryHref}>
                {user ? "Go to Dashboard" : "Sign Up Free"}
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
