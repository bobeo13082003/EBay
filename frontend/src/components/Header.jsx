import { Search, ChevronDown, ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"

export function Header() {
    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-[1400px] px-4">
                <div className="flex items-center gap-6 py-3">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <img
                                src="/images/logo.png"
                                alt="Ebay"
                                className="h-10 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="flex flex-1 items-center gap-2">
                        <div className="flex flex-1 items-stretch rounded-md border border-gray-300 overflow-hidden">
                            <div className="flex items-center border-r border-gray-300">
                                <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    Shop by category
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Search for anything"
                                className="flex-1 px-4 py-2 text-sm outline-none"
                            />
                            <button className="bg-blue-600 px-6 text-white hover:bg-blue-700 flex items-center gap-2">
                                <Search className="h-4 w-4" />
                                Search
                            </button>
                        </div>
                        <button className="text-gray-700 hover:text-blue-600 px-2">
                            Advanced
                        </button>
                    </div>

                    {/* Cart */}
                    <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
