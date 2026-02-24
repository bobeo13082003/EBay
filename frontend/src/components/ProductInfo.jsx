import { Star, Heart, Share2 } from "lucide-react"

export function ProductInfo({
    title,
    condition,
    rating,
    reviewCount,
    highlights
}) {
    return (
        <div className="space-y-4">
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                        />
                    ))}
                </div>
                <span className="text-sm text-gray-600">
                    {rating} ({reviewCount.toLocaleString()} reviews)
                </span>
                <span className="text-gray-400">|</span>
                <a
                    href="#reviews"
                    className="text-sm text-blue-600 hover:text-blue-700"
                >
                    See all reviews
                </a>
            </div>

            {/* Condition */}
            <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">Condition:</span>
                <span className="rounded bg-green-100 px-2 py-1 text-sm font-semibold text-green-800">
                    {condition}
                </span>
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
                <div>
                    <h3 className="mb-2 text-sm font-semibold text-gray-900">
                        Key Features:
                    </h3>
                    <ul className="space-y-1">
                        {highlights.map((highlight, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-sm text-gray-700"
                            >
                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-4 border-t border-gray-200 pt-4">
                <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
                    <Heart className="h-5 w-5" />
                    Add to Watchlist
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
                    <Share2 className="h-5 w-5" />
                    Share
                </button>
            </div>
        </div>
    )
}
