import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().min(2).max(200),
  description: z.string().min(1),
  priceCents: z.number().int().positive(),
  currency: z.string().length(3).default("USD"),
  imageUrl: z.string().url().optional(),
  stock: z.number().int().nonnegative().default(0),
  categoryId: z.string().cuid().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
