import { ProductCard } from "./ProductCard"
import { Link } from "react-router-dom"

export function SimilarItems({ title, subheading, products }) {

    return (
        <div className="bg-white py-8">
            <div className="mx-auto max-w-[1400px] px-4">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex-col">
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                        {subheading && <h3 className="text-base text-gray-700 mt-1 font-normal">{subheading}</h3>}
                    </div>
                </div>

                <div className="relative">
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide"                        >
                        {products.map((product, index) => (
                            <Link
                                key={product._id || index}
                                to={`/products/${product._id}`}
                            >
                                <ProductCard
                                    image={product.images?.[0]}
                                    title={product.title}
                                    price={product.price}
                                    originalPrice={product.originalPrice}
                                    discount={product.discount}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
