export function ProductCard({ image, title, price, originalPrice, discount }) {
    return (
        <a
            href="#"
            className="flex-shrink-0 w-[200px] rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-shadow"
        >
            <div className="relative">
                <img
                    src={image}
                    alt={title}
                    className="h-[200px] w-full rounded-t-lg object-cover"
                />
                {discount && (
                    <span className="absolute top-2 left-2 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white">
                        {discount}
                    </span>
                )}
            </div>
            <div className="p-3">
                <h3 className="mb-2 line-clamp-2 text-sm text-gray-900">{title}</h3>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">{price}</span>
                    {originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                            {originalPrice}
                        </span>
                    )}
                </div>
            </div>
        </a>
    )
}
