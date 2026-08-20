import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().min(2).max(200),
  description: z.string().min(1),
  unit: z.string().max(50).optional(),
  priceCents: z.number().int().positive(),
  dealPriceCents: z.number().int().positive().optional(),
  currency: z.string().length(3).default("PKR"),
  imageUrl: z.string().url().optional(),
  stock: z.number().int().nonnegative().default(0),
  isFeatured: z.boolean().default(false),
  isDeal: z.boolean().default(false),
  categoryId: z.string().cuid().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
