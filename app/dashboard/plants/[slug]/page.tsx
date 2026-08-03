import React from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import PlantDetailView from "@/components/plants/plant-detail-view";
import { getPlantsById } from "@/app/actions/plant.action";
import { plantKeys } from "@/lib/query-keys";
import { getQueryClient } from "@/providers/get-query-client";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const [id] = slug.split("--");
    const plant = await getPlantsById(id);
    const title = plant
      ? `${plant.name} - Greenstock`
      : "Plant Details - Greenstock";
    const description = plant
      ? plant.description ||
        `Explore ${plant.name} and its details on Greenstock.`
      : "Discover a wide variety of plants on Greenstock, your go-to source for green living.";

    return {
      title,
      description,
    };
  } catch {
    return {
      title: "Plant Details",
      description: "Plant details page",
    };
  }
}

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [id] = slug.split("--");

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: plantKeys.detail(id),
    queryFn: () => getPlantsById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlantDetailView id={id} />
    </HydrationBoundary>
  );
}

export default Page;
