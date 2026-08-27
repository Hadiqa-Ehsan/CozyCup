import { z } from "zod";

export const checkoutSchema = z
  .object({
    customerName: z.string().min(2, "Enter your full name"),
    phone: z.string().min(7, "Enter a valid phone number"),
    fulfillmentType: z.enum(["DELIVERY", "PICKUP"]),
    branchId: z.string().min(1, "Please select a branch"),
    address: z.string().optional(),
    city: z.string().optional(),
    area: z.string().optional(),
    notes: z.string().max(500).optional(),
    items: z
      .array(
        z.object({
          productId: z.string(),
          name: z.string(),
          quantity: z.number().int().positive(),
          unitPriceCents: z.number().int().positive(),
        })
      )
      .min(1, "Your cart is empty"),
  })
  .refine(
    (data) => data.fulfillmentType !== "DELIVERY" || (data.address && data.city && data.area),
    {
      message: "Address, city and area are required for delivery orders",
      path: ["address"],
    }
  );

export type CheckoutInput = z.infer<typeof checkoutSchema>;
