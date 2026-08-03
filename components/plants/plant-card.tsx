import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";
import Image from "next/image";
import type { PlantDetail } from "@/types/plant";

interface PlantCardProps {
  plant: PlantDetail | null;
}

export default function PlantCard({ plant }: PlantCardProps) {
  if (!plant) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-2">Plant Not Found</h1>
        <p className="text-muted-foreground">
          The plant you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
    );
  }

  return (
    <Reveal>
      <Link
        href="/dashboard/plants"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to inventory
      </Link>

      <Card className="w-full max-w-5xl mx-auto overflow-hidden py-0">
        <div className="flex flex-col lg:flex-row">
          <div className="relative w-full lg:w-1/2">
            {plant.imageUrl ? (
              <div className="flex h-64 w-full items-center justify-center bg-muted lg:h-full">
                <Image
                  src={plant.imageUrl}
                  alt={`${plant.name} plant`}
                  width={600}
                  height={400}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="flex h-64 w-full items-center justify-center bg-muted text-muted-foreground lg:h-full">
                No image
              </div>
            )}
            <Badge className="absolute left-4 top-4 bg-brand-lime text-brand-lime-foreground">
              {plant.category}
            </Badge>
          </div>

          <div className="flex w-full flex-col justify-between lg:w-1/2">
            <CardHeader className="gap-2 p-6">
              <CardTitle className="text-3xl font-bold leading-tight sm:text-4xl">
                {plant.name}
              </CardTitle>
              <CardTitle className="text-xl font-bold text-primary sm:text-2xl">
                ${plant.price}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 p-6 pt-0">
              <div className="rounded-xl border border-border bg-secondary/50 p-4">
                <p className="text-xs text-muted-foreground">In stock</p>
                <p className="text-lg font-semibold">{plant.stock} units</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Description</h3>
                <CardDescription className="rounded-lg border-l-4 border-primary/30 bg-muted p-4 text-sm leading-relaxed sm:text-base">
                  {plant.description || "No description provided."}
                </CardDescription>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </Reveal>
  );
}
