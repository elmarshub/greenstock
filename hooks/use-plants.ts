"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPlant,
  deletePlant,
  editPlant,
  getPlants,
  getPlantsById,
} from "@/app/actions/plant.action";
import type { PlantFormValues } from "@/lib/validations/plant";
import { plantKeys } from "@/lib/query-keys";

export { plantKeys };

export function usePlants(searchTerm?: string) {
  return useQuery({
    queryKey: plantKeys.list(searchTerm),
    queryFn: () => getPlants(searchTerm),
  });
}

export function usePlant(id: string) {
  return useQuery({
    queryKey: plantKeys.detail(id),
    queryFn: () => getPlantsById(id),
  });
}

export function useCreatePlant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PlantFormValues) => createPlant(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: plantKeys.all });
    },
  });
}

export function useEditPlant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PlantFormValues }) =>
      editPlant(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: plantKeys.all });
    },
  });
}

export function useDeletePlant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePlant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: plantKeys.all });
    },
  });
}
