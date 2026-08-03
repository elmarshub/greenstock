import type { getPlants, getPlantsById } from "@/app/actions/plant.action";

export type PlantsResult = Awaited<ReturnType<typeof getPlants>>;
export type Plant = NonNullable<PlantsResult["userPlants"]>[number];
export type PlantDetail = NonNullable<Awaited<ReturnType<typeof getPlantsById>>>;
