import { ChevronDown, Bell, ShoppingCart } from "lucide-react"

export function TopUtilityBar() {
    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-[1400px] px-4">
                <div className="flex items-center justify-between py-2 text-xs">
                    {/* Left side */}
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">
                            Hi!{" "}
                            <span className="text-blue-600 hover:text-blue-700 cursor-pointer underline">
                                Sign in
                            </span>{" "}
                            or{" "}
                            <span className="text-blue-600 hover:text-blue-700 cursor-pointer underline">
                                register
                            </span>
                        </span>
                        <span className="text-gray-400">|</span>
                        <a href="#" className="text-gray-700 hover:text-blue-600">
                            Daily Deals
                        </a>
                        <a href="#" className="text-gray-700 hover:text-blue-600">
                            Help & Contact
                        </a>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-gray-700 hover:text-blue-600">
                            Sell
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
                        >
                            Watchlist
                            <ChevronDown className="h-3 w-3" />
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
                        >
                            My eBay
                            <ChevronDown className="h-3 w-3" />
                        </a>
                        <button className="text-gray-700 hover:text-blue-600">
                            <Bell className="h-5 w-5" />
                        </button>
                        <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
                            <ShoppingCart className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
