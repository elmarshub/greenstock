import type { PlantCategory } from "@/lib/validations/plant";

export const categoryImages: Record<PlantCategory, string> = {
  Indoor:
    "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=600&auto=format&fit=crop",
  Outdoor:
    "https://images.unsplash.com/photo-1664418808836-a45e0a30c621?q=80&w=600&auto=format&fit=crop",
  Succulent:
    "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=600&auto=format&fit=crop",
  Flowering:
    "https://images.unsplash.com/photo-1719296624843-033df81926e6?q=80&w=600&auto=format&fit=crop",
  Herb: "https://images.unsplash.com/photo-1607529107925-04e67ae44b09?q=80&w=600&auto=format&fit=crop",
  Fern: "https://images.unsplash.com/photo-1554709248-9ca715a0c86b?q=80&w=600&auto=format&fit=crop",
  Tree: "https://images.unsplash.com/photo-1566633806368-2755d6a6afe9?q=80&w=600&auto=format&fit=crop",
  Shrub:
    "https://images.unsplash.com/photo-1710127944880-0c175b956431?q=80&w=600&auto=format&fit=crop",
};

export const categoryDescriptions: Record<PlantCategory, string> = {
  Indoor:
    "Houseplants that thrive year-round indoors, from low-light pothos to bright-window ficus.",
  Outdoor:
    "Garden and patio plants built to handle sun, wind, and seasonal weather.",
  Succulent:
    "Drought-tolerant plants that store water in thick leaves perfect for infrequent watering.",
  Flowering:
    "Plants grown for their blooms, from long-lasting orchids to seasonal annuals.",
  Herb: "Culinary favorites like basil, mint, and rosemary you can grow on a windowsill or in a garden bed.",
  Fern: "Lush, feathery foliage that loves humidity and indirect light.",
  Tree: "Indoor and outdoor trees, from compact citrus to statement fiddle-leaf figs.",
  Shrub:
    "Woody, bushy plants used for hedges, borders, and year-round structure.",
};

export const categorySlugs: Record<PlantCategory, string> = {
  Indoor: "indoor",
  Outdoor: "outdoor",
  Succulent: "succulent",
  Flowering: "flowering",
  Herb: "herb",
  Fern: "fern",
  Tree: "tree",
  Shrub: "shrub",
};
