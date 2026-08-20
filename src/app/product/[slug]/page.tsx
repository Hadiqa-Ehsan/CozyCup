import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug } from "@/lib/services/product-service";
import { formatPrice } from "@/lib/types";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { BranchRequiredNotice } from "@/components/branch-selector";

export const revalidate = 60;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const effectivePrice = product.isDeal && product.dealPriceCents ? product.dealPriceCents : product.priceCents;

  return (
    <main className="mx-auto max-w-4xl px-6 py-8">
      <BranchRequiredNotice />

      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/shop" className="hover:underline">Shop</Link>
        {product.category && (
          <>
            {" / "}
            <Link href={`/shop/${product.category.slug}`} className="hover:underline">
              {product.category.name}
            </Link>
          </>
        )}
        {" / "}
        <span>{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-lg border bg-muted text-muted-foreground">
          {/* No real product images available — placeholder block. */}
          No image available
        </div>

        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          {product.unit && <p className="mt-1 text-sm text-muted-foreground">{product.unit}</p>}

          <div className="mt-4">
            {product.isDeal && product.dealPriceCents ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold">{formatPrice(product.dealPriceCents, product.currency)}</span>
                <span className="text-muted-foreground line-through">
                  {formatPrice(product.priceCents, product.currency)}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold">{formatPrice(product.priceCents, product.currency)}</span>
            )}
          </div>

          <p className="mt-4 text-sm text-muted-foreground">{product.description}</p>

          <p className="mt-2 text-sm">
            {product.stock > 0 ? (
              <span className="text-green-600">In stock ({product.stock} available)</span>
            ) : (
              <span className="text-destructive">Out of stock</span>
            )}
          </p>

          <div className="mt-6">
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                priceCents: effectivePrice,
                imageUrl: product.imageUrl,
                stock: product.stock,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
