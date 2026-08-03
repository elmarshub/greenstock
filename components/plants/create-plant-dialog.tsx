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
import { Sprout } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Combobox } from "./plant-category-combobox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PlantImageUpload from "./plant-image-upload";
import { useCreatePlant } from "@/hooks/use-plants";
import {
  plantFormDefaultValues,
  plantFormSchema,
  type PlantFormInput,
  type PlantFormValues,
} from "@/lib/validations/plant";

export default function CreatePlantDialog() {
  const [open, setOpen] = useState(false);
  const createPlant = useCreatePlant();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PlantFormInput, unknown, PlantFormValues>({
    resolver: zodResolver(plantFormSchema),
    defaultValues: plantFormDefaultValues,
  });

  const onSubmit = async (data: PlantFormValues) => {
    try {
      await createPlant.mutateAsync(data);
      toast.success("Plant added successfully!");
      reset(plantFormDefaultValues);
      setOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add plant. Please try again.");
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset(plantFormDefaultValues);
      }}
    >
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className="ml-auto flex items-center gap-2 cursor-pointer"
          asChild
        >
          <span>
            <Sprout className="w-4 h-4" />
            Add Plant
          </span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-[95vw] w-full max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Add a Plant</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the form below to add a new plant to your inventory.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
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
            <div className="space-y-2">
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

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Type your message here."
              rows={4}
              {...register("description")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
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

            <div className="space-y-2">
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

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Image</Label>
            <PlantImageUpload
              endpoint="postImage"
              value={watch("imageUrl") ?? ""}
              onChange={(url) => setValue("imageUrl", url)}
            />
          </div>

          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={createPlant.isPending}
            >
              {createPlant.isPending ? "Adding..." : "Add"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
