import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sporting Goods",
    "Toys",
    "Motors",
    "Collectibles & Art",
    "Books, Movies & Music",
    "Health & Beauty",
    "Business & Industrial",
    "Jewelry & Watches",
    "Baby Essentials"
]

export function CategoryNav() {
    const scrollRef = useRef(null)

    const scroll = direction => {
        if (scrollRef.current) {
            const scrollAmount = 300
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            })
        }
    }

    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-[1400px] px-4">
                <div className="relative flex items-center">
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 z-10 h-full bg-gradient-to-r from-white to-transparent px-2 text-gray-600 hover:text-gray-900"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto py-3 scrollbar-hide"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {categories.map(category => (
                            <a
                                key={category}
                                href="#"
                                className="whitespace-nowrap text-sm text-gray-700 hover:text-blue-600 hover:underline underline-offset-8"
                            >
                                {category}
                            </a>
                        ))}
                    </div>

                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 z-10 h-full bg-gradient-to-l from-white to-transparent px-2 text-gray-600 hover:text-gray-900"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
