import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import { ProductCard } from "./ProductCard"
import { Link } from "react-router-dom"

export function ProductSection({ title, subheading, products }) {
    const scrollRef = useRef(null)

    const scroll = direction => {
        if (scrollRef.current) {
            const scrollAmount = 400
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            })
        }
    }

    return (
        <div className="bg-white py-8">
            <div className="mx-auto max-w-[1400px] px-4">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex-col">
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                        <h3 className="text-base text-gray-700 mt-1 font-normal">{subheading}</h3>
                    </div>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                        See all
                    </a>
                </div>

                <div className="relative">
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-50"
                    >
                        <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto scrollbar-hide"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {products.map((product, index) => (
                            <Link
                                key={product._id}
                                to={`/products/${product._id}`}
                            >
                                <ProductCard
                                    key={product._id ?? index}
                                    image={product.images?.[0]}
                                    title={product.title}
                                    price={product.price}
                                    originalPrice={product.originalPrice}
                                    discount={product.discount}
                                />
                            </Link>
                        ))}
                    </div>

                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-50"
                    >
                        <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                </div>
            </div>
        </div>
    )
}
