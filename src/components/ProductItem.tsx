import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

type ProductItemProps = {
  product: Product;
  showAddToCartCta?: boolean;
  onAddToCart?: (product: Product) => void;
  onRemoveFromCart?: (product: Product) => void;
  isAddedToCart?: boolean;
};

const ProductItem = ({
  product,
  onAddToCart = () => {},
  onRemoveFromCart = () => {},
  showAddToCartCta = true,
  isAddedToCart,
}: ProductItemProps) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col">
      <Link href={`/products/${product.id}`} className="flex-1 flex flex-col">
        <div className="relative aspect-square w-full bg-gray-50">
          <Image
            src={product?.images?.[0]}
            alt={product.title || "Product image"}
            fill
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
            {product.title}
          </h3>
          <span className="mt-auto text-xl font-bold text-gray-800">
            ${product.price.toFixed(2)}
          </span>
          <span className="mt-2 pt-4">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
              Free Shipping
            </span>
          </span>
        </div>
      </Link>
      {showAddToCartCta &&
        (isAddedToCart ? (
          <button
            className="bg-red-600 text-white py-2 px-4 m-4 rounded hover:bg-red-700 transition-colors cursor-pointer"
            onClick={() => onRemoveFromCart(product)}
            type="button"
          >
            Remove from Cart
          </button>
        ) : (
          <>
            {showAddToCartCta && (
              <button
                className="bg-blue-600 text-white py-2 px-4 m-4 rounded hover:bg-blue-700 transition-colors cursor-pointer"
                onClick={() => onAddToCart(product)}
                type="button"
              >
                Add to Cart
              </button>
            )}
          </>
        ))}
    </div>
  );
};

export default ProductItem;
