"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Combobox } from "./plant-category-combobox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PlantImageUpload from "./plant-image-upload";
import { useEditPlant } from "@/hooks/use-plants";
import {
  plantFormSchema,
  type PlantFormInput,
  type PlantFormValues,
} from "@/lib/validations/plant";
import type { Plant } from "@/types/plant";

interface EditPlantDialogProps {
  plant: Plant;
}

export default function EditPlantDialog({ plant }: EditPlantDialogProps) {
  const [open, setOpen] = useState(false);
  const editPlant = useEditPlant();

  const defaultValues: PlantFormInput = {
    name: plant.name.trim(),
    description: (plant.description ?? "").trim(),
    price: plant.price,
    category: plant.category as PlantFormInput["category"],
    imageUrl: plant.imageUrl ?? "",
    stock: plant.stock,
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PlantFormInput, unknown, PlantFormValues>({
    resolver: zodResolver(plantFormSchema),
    defaultValues,
  });

  // Keep the form in sync if the underlying plant data changes (e.g. after
  // a refetch) while the dialog is closed.
  useEffect(() => {
    if (!open) reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plant, open]);

  const onSubmit = async (data: PlantFormValues) => {
    try {
      await editPlant.mutateAsync({ id: plant.id, data });
      toast.success("Plant updated successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to update plant. Please try again.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className="ml-auto flex items-center gap-2"
          asChild
        >
          <span>
            <EditIcon className="w-4 h-4 cursor-pointer" />
          </span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Plant</AlertDialogTitle>
          <AlertDialogDescription>
            Update the details below and save your changes.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Combobox
                id="category"
                value={watch("category") ?? ""}
                onChange={(val) =>
                  setValue("category", val as PlantFormInput["category"], {
                    shouldValidate: true,
                  })
                }
              />
              {errors.category && (
                <p className="text-sm text-destructive">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-2">
            <Label htmlFor="description" className="mt-2">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Type your message here."
              rows={5}
              {...register("description")}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                placeholder="Enter amount"
                {...register("stock")}
              />
              {errors.stock && (
                <p className="text-sm text-destructive">{errors.stock.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter price"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price.message}</p>
              )}
            </div>
          </div>

          {/* Image Edit */}
          <div className="space-y-2 mt-2">
            <Label>Image</Label>
            <PlantImageUpload
              endpoint="postImage"
              value={watch("imageUrl") ?? ""}
              onChange={(url) => setValue("imageUrl", url)}
            />
          </div>

          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={editPlant.isPending}
            >
              {editPlant.isPending ? "Updating..." : "Update"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
