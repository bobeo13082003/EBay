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

                        <div className="flex items-center">
                            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700">
                                Shop by category
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="flex flex-1 items-stretch overflow-hidden gap-4 relative w-full">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search for anything"
                                className="flex-1 pl-10 px-4 py-3 text-sm border-2 border-gray-700 rounded-3xl outline-none focus:outline-none focus:ring-0 focus-visible:outline-none placeholder:font-normal placeholder:text-base placeholder:text-gray-500"
                            />

                            <button className="flex items-center justify-center h-12 w-40 gap-2 rounded-3xl bg-blue-600 px-6 font-medium text-white hover:bg-blue-700">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
