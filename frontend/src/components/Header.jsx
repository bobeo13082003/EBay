import { Search, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

export function Header() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productRes = await fetch('http://localhost:9999/products')
                const productData = await productRes.json()

                setProducts(productData)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData();
    }, [])

    const filteredProducts = products.filter((product) => {
        const query = searchQuery.toLowerCase()
        const matchesTitle = product.title.toLowerCase().includes(query)
        const matchesId = product._id?.toString().toLowerCase().includes(query)

        return matchesTitle || matchesId;
    }).slice(0, 10);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-[1400px] px-4">
                <div className="flex items-center gap-6 py-3">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/home" className="flex items-center">
                            <img
                                src="/images/logo.png"
                                alt="Ebay"
                                className="h-10 w-auto"
                            />
                        </Link>
                    </div>

                    <div className="flex flex-1 items-center gap-2">

                        <div className="flex items-center">
                            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700">
                                Shop by category
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="flex flex-1 items-stretch gap-4 w-full">
                            <div className="relative flex-1">
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex items-center w-full relative"
                                >
                                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                                    <input
                                        type="text"
                                        placeholder="Search for anything"
                                        value={searchQuery || ""}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="flex-1 pl-10 px-4 py-3 text-sm border-2 border-gray-700 rounded-3xl outline-none focus:outline-none focus:ring-0 focus-visible:outline-none placeholder:font-normal placeholder:text-base placeholder:text-gray-500"
                                    />
                                </form>

                                {searchQuery.length > 0 && (
                                    <div className="absolute top-full left-0 w-full bg-white border mt-2 rounded-lg shadow-lg z-50">
                                        {filteredProducts.length > 0 ? (
                                            filteredProducts.map((product) => (
                                                <div key={product._id} className="p-1">
                                                    <a
                                                        href={`/products/${product._id}`}
                                                        className="flex items-center justify-between w-full cursor-pointer hover:bg-gray-200 p-2 px-2"
                                                    >
                                                        <div className="flex items-center">
                                                            <div className="truncate ml-2">
                                                                {product.title}
                                                            </div>
                                                        </div>
                                                        <div className="truncate">
                                                            ${product.price}
                                                        </div>
                                                    </a>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-3 text-gray-500">No products found</div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="flex items-center justify-center h-12 w-40 gap-2 rounded-3xl bg-blue-600 px-6 font-medium text-white hover:bg-blue-700">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
