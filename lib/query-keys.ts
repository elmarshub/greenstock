export const plantKeys = {
  all: ["plants"] as const,
  list: (searchTerm?: string) => [...plantKeys.all, "list", searchTerm ?? ""] as const,
  detail: (id: string) => [...plantKeys.all, "detail", id] as const,
};
