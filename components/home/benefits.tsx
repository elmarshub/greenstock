import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";

const benefits = [
  {
    title: "Track Stock Levels Easily",
    description:
      "See exactly what's running low so you never lose track of what you have.",
  },
  {
    title: "Organize by Category",
    description:
      "Indoor, Outdoor, Succulent, Flowering, Herb, Fern, Tree, or Shrub sorted your way.",
  },
  {
    title: "Visual Plant Gallery",
    description:
      "Upload a photo for every plant to build a collection you can actually browse.",
  },
];

export function Benefits() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1658865696467-7e6de48922fe?q=80&w=1200&auto=format&fit=crop"
                alt="A greenhouse filled with plants and trees"
                width={800}
                height={640}
                className="h-72 w-full object-cover sm:h-96"
              />
            </div>

            <div className="absolute -bottom-6 -right-4 w-56 rounded-xl border border-border bg-card p-4 shadow-lg sm:-right-8">
              <p className="text-xs font-medium text-muted-foreground">
                Monstera Deliciosa
              </p>
              <p className="mt-1 text-sm font-semibold">
                Indoor &middot; 12 in stock
              </p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-3/4 rounded-full bg-primary" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for growers who like things tidy
            </h2>
            <p className="mt-4 text-muted-foreground">
              GreenStock keeps your collection organized so you spend less
              time managing spreadsheets and more time growing.
            </p>

            <ul className="mt-8 space-y-6">
              {benefits.map((benefit) => (
                <li key={benefit.title} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold">{benefit.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
