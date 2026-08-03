"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, Boxes, Sprout, Tags } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CreatePlantDialog from "@/components/plants/create-plant-dialog";
import { GrowingPlant } from "@/components/shared/growing-plant";
import { usePlants } from "@/hooks/use-plants";

export default function DashboardOverviewPage() {
  const { data, isLoading } = usePlants();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-4 sm:p-5">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="mt-3 h-7 w-10" />
              <Skeleton className="mt-2 h-4 w-24" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const userPlants = data?.userPlants ?? [];

  if (userPlants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
        <GrowingPlant className="h-48 w-48" />
        <div>
          <h1 className="text-2xl font-bold">Your collection is empty</h1>
          <p className="mt-2 max-w-sm text-muted-foreground">
            Add your first plant to start tracking inventory, categories, and
            stock levels.
          </p>
        </div>
        <CreatePlantDialog />
      </div>
    );
  }

  const totalStock = userPlants.reduce((sum, plant) => sum + plant.stock, 0);
  const categoriesInUse = new Set(userPlants.map((plant) => plant.category)).size;
  const lowStock = userPlants.filter((plant) => plant.stock <= 5).length;
  const recentPlants = userPlants.slice(0, 5);

  const stats = [
    { label: "Total plants", value: userPlants.length, icon: Sprout },
    { label: "Total stock units", value: totalStock, icon: Boxes },
    { label: "Categories in use", value: categoriesInUse, icon: Tags },
    { label: "Low stock (≤5)", value: lowStock, icon: AlertTriangle },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Overview
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here&apos;s what&apos;s happening with your plant collection.
          </p>
        </div>
        <CreatePlantDialog />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 sm:p-5">
            <stat.icon className="h-5 w-5 text-primary" />
            <p className="mt-3 text-xl font-bold sm:text-2xl">{stat.value}</p>
            <p className="text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent plants</h2>
          <Link
            href="/dashboard/plants"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {recentPlants.map((plant) => {
            const slug = `${plant.id}--${plant.name.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <Link
                key={plant.id}
                href={`/dashboard/plants/${slug}`}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary/50"
              >
                <div>
                  <p className="font-medium">{plant.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {plant.stock} units in stock
                  </p>
                </div>
                <Badge variant="secondary">{plant.category}</Badge>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
