import { Minus, Plus, ShoppingCart, Zap, MapPin, Truck } from "lucide-react"
import { useState } from "react"

export function BuyBox({
    price,
    originalPrice,
    shipping,
    deliveryDate,
    location,
    available
}) {
    const [quantity, setQuantity] = useState(1)

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1)
    }

    const handleIncrease = () => {
        if (quantity < available) setQuantity(quantity + 1)
    }

    return (
        <div className="sticky top-4 rounded-lg border border-gray-300 bg-white p-6">
            {/* Price */}
            <div className="mb-4">
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">{price}</span>
                    {originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                            {originalPrice}
                        </span>
                    )}
                </div>
                {originalPrice && (
                    <span className="text-sm text-green-700 font-semibold">
                        Save{" "}
                        {Math.round(
                            (1 -
                                parseFloat(price.replace(/[$,]/g, "")) /
                                parseFloat(originalPrice.replace(/[$,]/g, ""))) *
                            100
                        )}
                        %
                    </span>
                )}
            </div>

            {/* Shipping */}
            <div className="mb-4 space-y-2 border-t border-gray-200 pt-4">
                <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-700">Shipping:</span>
                    <span className="font-semibold text-gray-900">{shipping}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-700">Delivery:</span>
                    <span className="font-semibold text-gray-900">{deliveryDate}</span>
                </div>
                <div className="text-sm text-gray-600">
                    Ships from: <span className="text-gray-900">{location}</span>
                </div>
            </div>

            {/* Availability */}
            <div className="mb-4 rounded-md bg-green-50 p-3 text-sm">
                <span className="font-semibold text-green-800">In Stock</span>
                <span className="text-green-700"> - {available} available</span>
            </div>

            {/* Quantity Selector */}
            <div className="mb-4">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Quantity:
                </label>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleDecrease}
                        disabled={quantity <= 1}
                        className="rounded border border-gray-300 p-2 hover:bg-gray-50 disabled:opacity-50"
                    >
                        <Minus className="h-4 w-4 text-gray-700" />
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={e =>
                            setQuantity(
                                Math.max(1, Math.min(available, parseInt(e.target.value) || 1))
                            )
                        }
                        className="w-16 rounded border border-gray-300 px-3 py-2 text-center text-sm"
                    />
                    <button
                        onClick={handleIncrease}
                        disabled={quantity >= available}
                        className="rounded border border-gray-300 p-2 hover:bg-gray-50 disabled:opacity-50"
                    >
                        <Plus className="h-4 w-4 text-gray-700" />
                    </button>
                </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
                <button className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
                    <Zap className="h-5 w-5" />
                    Buy It Now
                </button>
                <button className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-blue-600 bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-blue-50">
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                </button>
            </div>

            {/* Additional Info */}
            <div className="mt-4 space-y-2 border-t border-gray-200 pt-4 text-xs text-gray-600">
                <p>✓ 30-day returns. Buyer pays return shipping</p>
                <p>✓ Money Back Guarantee</p>
                <p>✓ Secure payment methods</p>
            </div>
        </div>
    )
}
