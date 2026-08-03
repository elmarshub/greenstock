import { ArrowRight, Layers, Leaf, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { stackServerApp } from "@/stack";
import { PLANT_CATEGORIES } from "@/lib/validations/plant";

async function Hero() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
              <Leaf className="h-3.5 w-3.5 text-primary" />
              Simple plant inventory management
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Your plant collection,{" "}
              <span className="text-primary">finally organized</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Track inventory, categories, prices, and stock levels for every
              plant you grow from windowsill succulents to nursery rows out
              back.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {user ? (
                <Button
                  size="lg"
                  className="rounded-full bg-brand-lime text-brand-lime-foreground hover:bg-brand-lime/90"
                  asChild
                >
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="rounded-full bg-brand-lime text-brand-lime-foreground hover:bg-brand-lime/90"
                  asChild
                >
                  <Link href={app.signUp}>Sign Up Free</Link>
                </Button>
              )}

              <Button size="lg" variant="outline" className="group rounded-full" asChild>
                <Link href="/about">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
              <div className="col-span-2 overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1641816482997-515cdf9bb054?q=80&w=1200&auto=format&fit=crop"
                  alt="A bright room filled with green houseplants"
                  width={800}
                  height={600}
                  className="h-56 w-full object-cover sm:h-64"
                  priority
                />
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <Layers className="h-5 w-5 text-primary" />
                <p className="mt-3 text-2xl font-bold">
                  {PLANT_CATEGORIES.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  Plant categories supported
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <Search className="h-5 w-5 text-primary" />
                <p className="mt-3 text-2xl font-bold">Fast</p>
                <p className="text-sm text-muted-foreground">
                  Search &amp; filter your inventory
                </p>
              </div>

              <div className="col-span-2 rounded-2xl bg-brand-dark p-5 text-brand-dark-foreground">
                <p className="text-sm font-medium text-brand-dark-muted">
                  Built for growers
                </p>
                <p className="mt-1 text-lg font-semibold">
                  Organized &amp; effortless plant tracking
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export { Hero };
