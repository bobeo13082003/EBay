import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

export function SimilarItems({ title, products }) {
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
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>

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
                    {products.map(product => (
                        <a
                            key={product.id}
                            href="#"
                            className="flex-shrink-0 w-[180px] rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-shadow"
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-[180px] w-full rounded-t-lg object-cover"
                            />
                            <div className="p-3">
                                <h3 className="mb-2 line-clamp-2 text-sm text-gray-900">
                                    {product.title}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-gray-900">
                                        {product.price}
                                    </span>
                                    {product.rating && (
                                        <span className="text-xs text-gray-600">
                                            ★ {product.rating}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </a>
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
    )
}
