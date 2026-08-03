import { z } from "zod";

export const PLANT_CATEGORIES = [
  "Indoor",
  "Outdoor",
  "Succulent",
  "Flowering",
  "Herb",
  "Fern",
  "Tree",
  "Shrub",
] as const;

export type PlantCategory = (typeof PLANT_CATEGORIES)[number];

export const plantFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().optional().default(""),
  category: z.enum(PLANT_CATEGORIES, {
    error: "Category is required",
  }),
  price: z.coerce
    .number({ error: "Price must be a number" })
    .positive("Price must be greater than 0"),
  stock: z.coerce
    .number({ error: "Stock must be a number" })
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),
  imageUrl: z.string().trim().optional().default(""),
});


export type PlantFormInput = z.input<typeof plantFormSchema>;
export type PlantFormValues = z.output<typeof plantFormSchema>;

export const plantFormDefaultValues: PlantFormInput = {
  name: "",
  description: "",
  category: undefined as unknown as PlantCategory,
  price: 0,
  stock: 1,
  imageUrl: "",
};
