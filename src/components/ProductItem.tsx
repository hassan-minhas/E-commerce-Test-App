import { Product } from "@/types";
import LazyImage from "./LazyImage";
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
    <div
      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col transform hover:-translate-y-1 hover:scale-[1.025] duration-200"
      aria-label={`Product: ${product.title}`}
      tabIndex={0}
    >
      <Link
        href={`/products/${product.id}`}
        className="flex-1 flex flex-col"
        aria-labelledby={`product-title-${product.id}`}
      >
        <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
          <LazyImage
            src={product?.images?.[0]}
            alt={product.title || "Product image"}
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3
            id={`product-title-${product.id}`}
            className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition mb-2 line-clamp-2"
          >
            {product.title}
          </h3>
          <span className="text-2xl font-extrabold text-blue-700 mb-2">
            ${product.price.toFixed(2)}
          </span>
          <span className="mt-auto pt-3">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
              Free Shipping
            </span>
          </span>
        </div>
      </Link>
      {showAddToCartCta &&
        (isAddedToCart ? (
          <button
            className="bg-red-600 text-white py-2 px-4 m-4 rounded-lg hover:bg-red-700 transition-colors cursor-pointer font-semibold shadow"
            onClick={() => onRemoveFromCart(product)}
            type="button"
            aria-pressed="true"
            aria-label={`Remove ${product.title} from cart`}
          >
            Remove from Cart
          </button>
        ) : (
          <>
            {showAddToCartCta && (
              <button
                className="bg-blue-600 text-white py-2 px-4 m-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-semibold shadow"
                onClick={() => onAddToCart(product)}
                type="button"
                aria-pressed="false"
                aria-label={`Add ${product.title} to cart`}
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
