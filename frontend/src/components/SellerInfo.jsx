import { Star, Store } from "lucide-react"

export function SellerInfo({
    name,
    rating,
    feedbackCount,
    location,
    memberSince
}) {
    return (
        <div className="rounded-lg border border-gray-300 bg-white p-6">
            <h3 className="mb-4 text-lg font-bold text-gray-900">
                Seller Information
            </h3>

            <div className="space-y-4">
                {/* Seller Name */}
                <div>
                    <a
                        href="#"
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                        {name}
                    </a>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                        <span>{rating}% positive feedback</span>
                        <span className="text-gray-400">|</span>
                        <span>{feedbackCount.toLocaleString()} ratings</span>
                    </div>
                </div>

                {/* Rating Display */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor((rating / 100) * 5)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-gray-200 text-gray-200"
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-700">
                        ({Math.floor((rating / 100) * 5).toFixed(1)})
                    </span>
                </div>

                {/* Additional Info */}
                <div className="space-y-2 text-sm text-gray-700">
                    <div>
                        <span className="font-semibold">Location:</span> {location}
                    </div>
                    <div>
                        <span className="font-semibold">Member since:</span> {memberSince}
                    </div>
                </div>

                {/* Visit Store Button */}
                <button className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                    <Store className="h-4 w-4" />
                    Visit store
                </button>

                {/* Contact Seller */}
                <button className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                    Contact seller
                </button>

                {/* Trust Indicators */}
                <div className="space-y-1 border-t border-gray-200 pt-4 text-xs text-gray-600">
                    <p>✓ Fast shipping</p>
                    <p>✓ Top-rated seller</p>
                    <p>✓ Excellent customer service</p>
                </div>
            </div>
        </div>
    )
}
