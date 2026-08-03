"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useDeletePlant } from "@/hooks/use-plants";

interface DeletePlantDialogProps {
  plant: {
    id: string;
  };
}

export default function DeletePlantDialog({ plant }: DeletePlantDialogProps) {
  const deletePlant = useDeletePlant();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await deletePlant.mutateAsync(plant.id);
      toast.success("Plant deleted successfully");
    } catch (error) {
      console.error("Error deleting plant:", error);
      toast.error("Failed to delete plant");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="ml-auto flex items-center gap-2"
          asChild
        >
          <span>
            <Trash2 className="w-4 h-4 text-default" />
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-[15px]">
            This action cannot be undone. This will permanently delete the plant
            from our database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletePlant.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction type="submit" disabled={deletePlant.isPending}>
              {deletePlant.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Confirm Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
