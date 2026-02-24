import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import { ProductCard } from "./ProductCard"

export function ProductSection({ title, products }) {
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
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
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
                        {products.map(product => (
                            <ProductCard key={product.id} {...product} />
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
