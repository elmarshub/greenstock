import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import InventoryTable from "@/components/plants/inventory-table";
import { getPlants } from "@/app/actions/plant.action";
import { plantKeys } from "@/lib/query-keys";
import { getQueryClient } from "@/providers/get-query-client";
import type { PlantCategory } from "@/lib/validations/plant";
import { PLANT_CATEGORIES } from "@/lib/validations/plant";

interface PlantsProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Plants({ searchParams }: PlantsProps) {
  const { category } = await searchParams;
  const initialCategory = PLANT_CATEGORIES.includes(category as PlantCategory)
    ? (category as PlantCategory)
    : undefined;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: plantKeys.list(),
    queryFn: () => getPlants(),
  });

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Your Plant Inventory
        </h1>
        <p className="mt-1 text-muted-foreground">
          Search, filter, and manage every plant in your collection.
        </p>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <InventoryTable initialCategory={initialCategory} />
      </HydrationBoundary>
    </div>
  );
}
