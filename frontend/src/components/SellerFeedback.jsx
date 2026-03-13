import { ThumbsUp, ThumbsDown, Minus, Calendar, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { StarRating } from "../components/StarRating"

export function SellerFeedback({ sellerId, productId }) {
    const [seller, setSeller] = useState(null)
    const [reviews, setReviews] = useState([])

    const fetchSellerInfo = async () => {
        try {
            const sellerRes = await fetch(`http://localhost:9999/user/${sellerId}`)
            const sellerData = await sellerRes.json()

            setSeller(sellerData)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const fetchReviewsList = async () => {
        try {
            const reviewRes = await fetch(`http://localhost:9999/products/${productId}/reviews`)
            const reviewData = await reviewRes.json()

            setReviews(reviewData)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    useEffect(() => {
        fetchSellerInfo()
        fetchReviewsList()
    }, [sellerId, productId])

    const formatMonthYear = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString('en-US', {
            month: 'short',
            year: 'numeric'
        })
    }

    return (
        <div className="bg-[#F7F7F7] grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4 lg:border-r lg:border-gray-300 lg:pr-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">About this seller</h2>

                <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-6">
                        {/* <img
                            src={seller?.avatarURL}
                            className="w-32 h-32 rounded-full"
                        /> */}
                        {seller?.avatarURL ? (
                            <img
                                src={seller.avatarURL}
                                className="w-32 h-32 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-5xl">
                                {seller?.username?.charAt(0)?.toUpperCase()}
                            </div>
                        )}
                        <div className="flex flex-col gap-1">
                            <span className="text-2xl font-semibold text-gray-800">
                                {seller?.username}
                            </span>
                        </div>
                    </div>
                    <span className="flex items-center gap-2 mt-5 text-base">
                        <Calendar size={16} />
                        Joined {formatMonthYear(seller?.createdAt)}
                    </span>

                    <button className="mt-5 mb-2 flex w-full items-center justify-center gap-2 rounded-3xl bg-blue-600 px-6 py-3 font-semibold text-white text-base hover:bg-blue-700">
                        Visit Store
                    </button>
                </div>
            </div>
            <div className="lg:col-span-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Seller Feedback</h2>

                <div className="p-1 rounded-md">
                    {!reviews || reviews.length === 0 ? (
                        <p className="text-gray-500">No reviews yet</p>
                    ) : (
                        reviews.map(review => (
                            <div key={review._id} className="mb-6">
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-700 text-white">
                                        <Plus size={14} />
                                    </span>

                                    <span className="font-medium text-sm text-gray-500">
                                        {review.reviewerId.username}
                                    </span>

                                    <span className="font-normal text-sm text-gray-500">
                                        · {formatMonthYear(review.createdAt)}
                                    </span>

                                    <span className="ml-2">
                                        <StarRating rating={review.rating} />
                                    </span>
                                </div>

                                <p className="text-gray-900 font-medium">
                                    {review.comment}
                                </p>
                            </div>
                        )))}
                </div>
            </div>
        </div >
    )
}
