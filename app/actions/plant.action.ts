"use server";

import { cache } from "react";
import { getCurrentUserId, requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  plantFormSchema,
  type PlantFormValues,
} from "@/lib/validations/plant";

export async function getPlants(searchTerm?: string) {

  const currentUserId = await getCurrentUserId();
  if (!currentUserId) {
    return { success: true, userPlants: [] };
  }

  try {
    const userPlants = await prisma.plants.findMany({
      where: {
        userId: currentUserId,
        ...(searchTerm
          ? { name: { contains: searchTerm, mode: "insensitive" as const } }
          : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, userPlants };
  } catch (error) {
    console.error("Error fetching plants:", error);
    throw new Error("Failed to fetch plants");
  }
}

const getPlantByIdForUser = cache(async (id: string, userId: string | undefined) => {
  if (!userId) return null;

  const plant = await prisma.plants.findUnique({ where: { id } });

  // Don't leak other users' plants to someone guessing ids.
  if (!plant || plant.userId !== userId) return null;

  return plant;
});

export async function getPlantsById(id: string) {
  const currentUserId = await getCurrentUserId();
  return getPlantByIdForUser(id, currentUserId);
}

async function assertPlantOwnership(id: string, userId: string) {
  const plant = await prisma.plants.findUnique({ where: { id } });
  if (!plant) {
    throw new Error("Plant not found");
  }
  if (plant.userId !== userId) {
    throw new Error("Unauthorized: you don't own this plant");
  }
  return plant;
}

export async function createPlant(data: PlantFormValues) {
  const currentUserId = await requireUserId();
  const plantData = plantFormSchema.parse(data);

  try {
    const newPlant = await prisma.plants.create({
      data: {
        ...plantData,
        userId: currentUserId,
      },
    });

    return newPlant;
  } catch (error) {
    console.error("Error creating plant:", error);
    throw error;
  }
}

export async function editPlant(id: string, data: PlantFormValues) {
  const currentUserId = await requireUserId();
  const plantData = plantFormSchema.parse(data);

  try {
    await assertPlantOwnership(id, currentUserId);

    const updatedPlant = await prisma.plants.update({
      where: { id },
      data: plantData,
    });

    return updatedPlant;
  } catch (error) {
    console.error("Error updating plant:", error);
    throw error;
  }
}

export async function deletePlant(id: string) {
  const currentUserId = await requireUserId();

  try {
    await assertPlantOwnership(id, currentUserId);

    const deletedPlant = await prisma.plants.delete({
      where: { id },
    });

    return deletedPlant;
  } catch (error) {
    console.error("Error deleting plant:", error);
    throw error;
  }
}
