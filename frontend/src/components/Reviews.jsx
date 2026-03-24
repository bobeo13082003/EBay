import { Star } from "lucide-react"

export function Reviews({
    averageRating,
    totalReviews,
    ratingDistribution,
    reviews
}) {
    return (
        <div className="space-y-6" id="reviews">
            <h2 className="text-xl font-bold text-gray-900">
                Customer Reviews & Ratings
            </h2>

            {/* Rating Summary */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Overall Rating */}
                    <div>
                        <div className="mb-2 text-4xl font-bold text-gray-900">
                            {averageRating.toFixed(1)}
                        </div>
                        <div className="mb-2 flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-5 w-5 ${i < Math.floor(averageRating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "fill-gray-200 text-gray-200"
                                        }`}
                                />
                            ))}
                        </div>
                        <p className="text-sm text-gray-600">
                            Based on {totalReviews.toLocaleString()} reviews
                        </p>
                    </div>

                    {/* Rating Distribution */}
                    <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map(star => {
                            const count = ratingDistribution[star - 1]
                            const percentage =
                                totalReviews > 0 ? (count / totalReviews) * 100 : 0

                            return (
                                <div key={star} className="flex items-center gap-3">
                                    <span className="w-12 text-sm text-gray-700">
                                        {star} star
                                    </span>
                                    <div className="h-2 flex-1 rounded-full bg-gray-200">
                                        <div
                                            className="h-full rounded-full bg-yellow-400"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="w-12 text-right text-sm text-gray-600">
                                        {count}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
                {reviews.map(review => (
                    <div
                        key={review.id}
                        className="rounded-lg border border-gray-200 bg-white p-6"
                    >
                        <div className="mb-3 flex items-start justify-between">
                            <div>
                                <div className="mb-1 flex items-center gap-2">
                                    <span className="font-semibold text-gray-900">
                                        {review.reviewer}
                                    </span>
                                    {review.verified && (
                                        <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
                                            Verified Purchase
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < review.rating
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "fill-gray-200 text-gray-200"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                        </div>

                        <h4 className="mb-2 font-semibold text-gray-900">{review.title}</h4>
                        <p className="text-sm leading-relaxed text-gray-700">
                            {review.content}
                        </p>
                    </div>
                ))}
            </div>

            {/* View More Button */}
            <button className="w-full rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                View all reviews
            </button>
        </div>
    )
}
