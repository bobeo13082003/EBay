import { ThumbsUp, ThumbsDown, Minus } from "lucide-react"

// export function SellerFeedback({
//     positivePercentage,
//     totalFeedback,
//     feedbackBreakdown,
//     recentFeedback
// }) {
//     return (
//         <div className="space-y-6">
//             <h2 className="text-xl font-bold text-gray-900">Seller Feedback</h2>

//             {/* Feedback Summary */}
//             <div className="rounded-lg border border-gray-200 bg-white p-6">
//                 <div className="mb-6 flex items-center gap-4">
//                     <div className="text-4xl font-bold text-gray-900">
//                         {positivePercentage}%
//                     </div>
//                     <div className="text-sm text-gray-600">
//                         Positive feedback
//                         <br />
//                         <span className="font-semibold">
//                             {totalFeedback.toLocaleString()} ratings
//                         </span>
//                     </div>
//                 </div>

//                 {/* Feedback Breakdown */}
//                 <div className="space-y-3">
//                     <div className="flex items-center justify-between text-sm">
//                         <div className="flex items-center gap-2">
//                             <ThumbsUp className="h-4 w-4 text-green-600" />
//                             <span className="text-gray-700">Positive</span>
//                         </div>
//                         <span className="font-semibold text-gray-900">
//                             {feedbackBreakdown.positive.toLocaleString()}
//                         </span>
//                     </div>
//                     <div className="flex items-center justify-between text-sm">
//                         <div className="flex items-center gap-2">
//                             <Minus className="h-4 w-4 text-gray-600" />
//                             <span className="text-gray-700">Neutral</span>
//                         </div>
//                         <span className="font-semibold text-gray-900">
//                             {feedbackBreakdown.neutral.toLocaleString()}
//                         </span>
//                     </div>
//                     <div className="flex items-center justify-between text-sm">
//                         <div className="flex items-center gap-2">
//                             <ThumbsDown className="h-4 w-4 text-red-600" />
//                             <span className="text-gray-700">Negative</span>
//                         </div>
//                         <span className="font-semibold text-gray-900">
//                             {feedbackBreakdown.negative.toLocaleString()}
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             {/* Recent Feedback */}
//             <div>
//                 <h3 className="mb-4 font-semibold text-gray-900">Recent feedback</h3>
//                 <div className="space-y-3">
//                     {recentFeedback.map(feedback => (
//                         <div
//                             key={feedback.id}
//                             className="rounded-lg border border-gray-200 bg-white p-4"
//                         >
//                             <div className="mb-2 flex items-center gap-2">
//                                 {feedback.type === "positive" && (
//                                     <ThumbsUp className="h-4 w-4 text-green-600" />
//                                 )}
//                                 {feedback.type === "neutral" && (
//                                     <Minus className="h-4 w-4 text-gray-600" />
//                                 )}
//                                 {feedback.type === "negative" && (
//                                     <ThumbsDown className="h-4 w-4 text-red-600" />
//                                 )}
//                                 <span
//                                     className={`text-sm font-semibold ${feedback.type === "positive"
//                                             ? "text-green-700"
//                                             : feedback.type === "neutral"
//                                                 ? "text-gray-700"
//                                                 : "text-red-700"
//                                         }`}
//                                 >
//                                     {feedback.type.charAt(0).toUpperCase() +
//                                         feedback.type.slice(1)}
//                                 </span>
//                             </div>
//                             <p className="mb-2 text-sm text-gray-700">{feedback.comment}</p>
//                             <div className="flex items-center gap-2 text-xs text-gray-500">
//                                 <span>{feedback.buyer}</span>
//                                 <span>•</span>
//                                 <span>{feedback.date}</span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

export function SellerFeedback({ seller, product }) {
    return (
        <div className="bg-[#F7F7F7] grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">About this seller: {seller}</h2>
            </div>
            <div className="lg:col-span-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Seller Feedback: {product}</h2>
            </div>
        </div>
    )
}
