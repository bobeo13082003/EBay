export function ProductCard({ image, title, price, originalPrice, discount }) {
    return (
        <a
            href="#"
            className="group flex-shrink-0 w-[260px]"
        >
            {/* Image Container */}
            <div className="relative w-[260px] h-[260px] overflow-hidden rounded-xl bg-gray-100">
                <img
                    src={image}
                    alt={title}
                    className="
                        h-full
                        w-full 
                        object-cover 
                        transition-transform 
                        duration-300 
                        ease-in-out 
                        group-hover:scale-105
                    "
                />

                {discount && (
                    <span className="absolute top-2 left-2 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white">
                        {discount}
                    </span>
                )}
            </div>

            {/* Info Section */}
            <div className="mt-3 space-y-1">
                <h3 className="line-clamp-2 text-base font-medium text-gray-900 group-hover:text-black transition-colors">
                    {title}
                </h3>

                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                        ${price}
                    </span>

                    {originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                            ${originalPrice}
                        </span>
                    )}
                </div>
            </div>
        </a>
    );
}