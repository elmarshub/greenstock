import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import type { PlantCategory } from "@/lib/validations/plant";
import { categoryImages, categorySlugs } from "@/lib/plant-images";

const categories = Object.keys(categoryImages) as PlantCategory[];

export function Categories() {
  return (
    <section className="bg-brand-dark py-20 text-brand-dark-foreground sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore by category
          </h2>
          <p className="mt-4 text-brand-dark-muted">
            Learn what each category needs before you start growing.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((category) => (
            <RevealItem key={category}>
              <Link
                href={`/plants#${categorySlugs[category]}`}
                className="group relative block overflow-hidden rounded-2xl"
              >
                <Image
                  src={categoryImages[category]}
                  alt={`${category} plants`}
                  width={400}
                  height={400}
                  className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-3 left-3 font-semibold text-white">
                  {category}
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
