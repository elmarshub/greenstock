import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { Benefits } from "@/components/home/benefits";
import { Categories } from "@/components/home/categories";
import { Cta } from "@/components/home/cta";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Benefits />
      <Categories />
      <Cta />
    </div>
  );
}
