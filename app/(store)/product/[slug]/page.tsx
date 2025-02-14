import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails"; // Import the ProductDetails Client Component
import ProductCarousel from "./ProductCarousel"; // Import the ProductCarousel Client Component

export const dynamic = "force-static";
export const revalidate = 60;

async function ProductPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  console.log(
    crypto.randomUUID().slice(0, 5) +
      `>>> Rerendered the product page cache for ${slug}`
  );

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  // Ensure product.images is an array

  const images = product.images || [];
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Use the ProductCarousel Client Component */}
        <ProductCarousel
          images={images}
          isOutOfStock={isOutOfStock}
          productName={product.name ?? "Product"}
        />

        {/* Use the ProductDetails Client Component */}
        <ProductDetails product={product} isOutOfStock={isOutOfStock} />
      </div>
    </div>
  );
}

export default ProductPage;