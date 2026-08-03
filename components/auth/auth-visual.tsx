import Image from "next/image";
import { AnimatedLeaves } from "@/components/shared/animated-leaves";
import { GrowingPlant } from "@/components/shared/growing-plant";

export function AuthVisual() {
  return (
    <div className="relative hidden h-full overflow-hidden bg-brand-dark lg:block">
      <Image
        src="https://images.unsplash.com/photo-1658865696406-96ec1a545f26?q=80&w=1200&auto=format&fit=crop"
        alt="A sunlit greenhouse filled with plants"
        fill
        className="object-cover opacity-40"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/30" />
      <AnimatedLeaves className="absolute inset-0 overflow-hidden" />

      <div className="relative z-10 flex h-full flex-col items-center justify-end gap-6 p-12 pb-20 text-center text-brand-dark-foreground">
        <GrowingPlant className="h-40 w-40" />
        <div>
          <p className="text-xl font-semibold">Grow your collection with GreenStock</p>
          <p className="mt-2 max-w-sm text-sm text-brand-dark-muted">
            Track every plant you own, organized by category, stock, and
            care details — all in one calm, simple place.
          </p>
        </div>
      </div>
    </div>
  );
}
