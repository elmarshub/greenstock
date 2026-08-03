"use client";

import PlantCard from "./plant-card";
import PlantDetailSkeleton from "./plant-detail-skeleton";
import { usePlant } from "@/hooks/use-plants";

interface PlantDetailViewProps {
  id: string;
}

export default function PlantDetailView({ id }: PlantDetailViewProps) {
  const { data: plant, isLoading } = usePlant(id);

  if (isLoading) {
    return <PlantDetailSkeleton />;
  }

  if (!plant) {
    return (
      <div className="mx-auto max-w-7xl text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Plant Not Found</h1>
        <p className="text-muted-foreground">
          The plant you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <PlantCard plant={plant} />
    </div>
  );
}
