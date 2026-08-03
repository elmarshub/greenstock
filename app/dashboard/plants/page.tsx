import InventoryTable from "@/components/plants/inventory-table";
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
      <InventoryTable initialCategory={initialCategory} />
    </div>
  );
}
