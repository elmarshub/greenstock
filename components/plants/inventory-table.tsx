"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Combobox } from "./plant-category-combobox";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PlantTableSkeleton from "./plant-table-skeleton";
import CreatePlantDialog from "./create-plant-dialog";
import EditPlantDialog from "./edit-plant-dialog";
import DeletePlantDialog from "./delete-plant-dialog";
import { usePlants } from "@/hooks/use-plants";
import type { PlantCategory } from "@/lib/validations/plant";

interface InventoryTableProps {
  initialCategory?: PlantCategory;
}

export default function InventoryTable({ initialCategory }: InventoryTableProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory ?? ""
  );
  const [searchTerm, setSearchTerm] = useState("");

  const { data: plants, isLoading } = usePlants();

  if (isLoading) {
    return <PlantTableSkeleton />;
  }

  const filteredPlants = plants?.userPlants?.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || plant.category === selectedCategory)
  );

  return (
    <div className="w-full space-y-4 rounded-2xl border border-border bg-card p-4 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative max-w-xl w-full">
          <Input
            placeholder="Filter plants..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div>
        <div className="relative max-w-52 w-full">
          <Combobox
            value={selectedCategory}
            onChange={(val) => setSelectedCategory(val)}
            includeAllOption
          />
        </div>

        <CreatePlantDialog />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="cursor-pointer">
          {filteredPlants && filteredPlants.length > 0 ? (
            filteredPlants.map((plant) => {
              const slugifiedName = plant.name
                .toLowerCase()
                .replace(/\s+/g, "-");
              const slug = `${plant.id}--${slugifiedName}`;
              const plantUrl = `/dashboard/plants/${slug}`;
              return (
                <TableRow
                  key={plant.id}
                  onClick={() => router.push(plantUrl)}
                  className="hover:bg-muted/50"
                >
                  <TableCell className="font-medium">
                    <Link href={plantUrl} className="block">
                      {plant.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{plant.category}</Badge>
                  </TableCell>
                  <TableCell>${plant.price}</TableCell>
                  <TableCell className="font-bold">{plant.stock}</TableCell>
                  <TableCell className="text-right">
                    <div
                      className="flex justify-end space-x-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EditPlantDialog plant={plant} />
                      <DeletePlantDialog plant={plant} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                No plants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
