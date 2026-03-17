import { ChevronLeft, ChevronRight, Search, Heart, ShoppingCart } from "lucide-react"
import { useState, useRef } from "react"
import { ProductCard } from "./ProductCard"
import { Link } from "react-router-dom"

export function ProductSection({ title, subheading, products, viewMode = "grid" }) {
    const scrollRef = useRef(null)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);

    const paginatedProducts = viewMode === "list"
        ? products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : products;

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
                        {subheading && <h3 className="text-base text-gray-700 mt-1 font-normal">{subheading}</h3>}
                    </div>
                </div>

                {products.length === 0 && (
                    <div className="py-10 text-center">
                        <div className="text-gray-400 mb-4">
                            <Search size={48} className="mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No products found
                        </h3>
                        <p className="text-gray-500">
                            We couldn't find any products matching your criteria.
                        </p>
                    </div>
                )}

                {products.length > 0 && viewMode === "grid" && (
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
                            {paginatedProducts.map((product, index) => (
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

                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-50"
                        >
                            <ChevronRight className="h-5 w-5 text-gray-700" />
                        </button>
                    </div>
                )}

                {products.length > 0 && viewMode == "list" && (
                    <div className="flex flex-col gap-6">
                        {paginatedProducts.map((product, index) => (
                            <div
                                key={product._id || index}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex flex-col sm:flex-row">
                                    <Link
                                        to={`/products/${product._id}`}
                                        className="sm:w-52 aspect-square flex-shrink-0 overflow-hidden"
                                    >
                                        <img
                                            src={`${product.images?.[0]}/300`}
                                            alt={product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </Link>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="flex justify-between items-start">
                                            <Link to={`/products/${product._id}`} className="block w-full">
                                                <h3 className="font-medium text-xl text-gray-900 mb-2 hover:underline hover:text-blue-600">
                                                    {product.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                                                    {product.description || "No description available for this product. Check the product page for more details."}
                                                </p>
                                            </Link>
                                            <button
                                                className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-gray-100 ml-4"
                                            >
                                                <Heart className="h-5 w-5 text-gray-400" />
                                            </button>
                                        </div>
                                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
                                            <div>
                                                <span className="text-2xl font-bold text-gray-900 block">
                                                    ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                                                </span>
                                                {product.originalPrice && (
                                                    <span className="text-sm text-gray-500 line-through">
                                                        ${typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(2) : product.originalPrice}
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 flex items-center transition-colors shadow-sm"
                                            >
                                                <ShoppingCart className="mr-2 h-4 w-4" />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-8 space-x-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>

                                {Array.from({ length: totalPages }).map((_, idx) => {
                                    const pageNum = idx + 1;
                                    // Complex logic hidden for brevity: display ellipsis if many pages
                                    if (totalPages <= 7 || pageNum === 1 || pageNum === totalPages || Math.abs(currentPage - pageNum) <= 1) {
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`w-10 h-10 rounded-md font-medium text-sm ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50 text-gray-700'}`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    } else if (pageNum === 2 && currentPage > 3) {
                                        return <span key="ellipsis-start" className="w-10 text-center text-gray-500">...</span>;
                                    } else if (pageNum === totalPages - 1 && currentPage < totalPages - 2) {
                                        return <span key="ellipsis-end" className="w-10 text-center text-gray-500">...</span>;
                                    }
                                    return null;
                                })}

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
