import {
  Boxes,
  ImagePlus,
  LayoutList,
  PackageSearch,
  SearchCheck,
  Tags,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";

const features = [
  {
    icon: Boxes,
    title: "Inventory Tracking",
    description:
      "Keep an accurate, always up-to-date record of every plant you own or sell.",
  },
  {
    icon: Tags,
    title: "Category Organization",
    description:
      "Group plants by Indoor, Outdoor, Succulent, Flowering, and more.",
  },
  {
    icon: PackageSearch,
    title: "Stock Management",
    description:
      "Know exactly how many units of each plant are in stock at a glance.",
  },
  {
    icon: ImagePlus,
    title: "Image Uploads",
    description:
      "Attach a real photo to every plant so your inventory is easy to browse.",
  },
  {
    icon: LayoutList,
    title: "Detailed Plant Profiles",
    description:
      "Name, description, category, price, and stock all in one place.",
  },
  {
    icon: SearchCheck,
    title: "Fast Search & Filtering",
    description:
      "Find any plant in your collection instantly by name or category.",
  },
];

export function Features() {
  return (
    <section className="bg-brand-dark py-20 text-brand-dark-foreground sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to manage your plants
          </h2>
          <p className="mt-4 text-brand-dark-muted">
            Simple, focused tools that make plant inventory management
            effortless whether it&apos;s a hobby or a nursery.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <RevealItem
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-brand-lime text-brand-lime-foreground">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-brand-dark-muted">
                {feature.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
