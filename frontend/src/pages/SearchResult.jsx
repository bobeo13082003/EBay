import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TopUtilityBar } from "../components/TopUtilityBar";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Heart, ShoppingCart } from "lucide-react";
import { Button, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

export default function SearchResults() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get("query") || "";

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState("relevance");

    useEffect(() => {
        setTimeout(() => {
            const searchInput = document.querySelector("input[placeholder='Search for anything']");
            if (searchInput) {
                searchInput.value = "";
                searchInput.blur();
            }
        }, 0);
    }, []);

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

    useEffect(() => {
        let result = products.filter((product) =>
            product.title.toLowerCase().includes(keyword.toLowerCase())
        );

        if (sortOrder === "lowToHigh") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "highToLow") {
            result.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(result);
    }, [keyword, products, sortOrder]);

    const sortItems = [
        { key: "relevance", label: "Sort: Best Match" },
        { key: "lowToHigh", label: "Price: Low to High" },
        { key: "highToLow", label: "Price: High to Low" }
    ];

    return (
        <div className="min-h-screen bg-white">
            <TopUtilityBar />
            <Header />

            <div className="mx-auto max-w-[1400px] px-4 py-8">
                <h2 className="text-xl font-bold mb-2">
                    Search Results for: <span className="text-blue-600">"{keyword}"</span>
                </h2>

                <div className="mb-6 flex justify-between items-center">
                    <span className="text-base text-gray-500">
                        {filteredProducts.length} results found
                    </span>

                    <Dropdown
                        menu={{
                            items: sortItems,
                            onClick: ({ key }) => setSortOrder(key),
                        }}
                        trigger={["click"]}
                    >
                        <Button className="flex items-center text-sm">
                            {sortItems.find(i => i.key === sortOrder)?.label}
                            <DownOutlined className="ml-1" />
                        </Button>
                    </Dropdown>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                        No products match your search.
                    </div>
                ) : (
                    <div className="grid grid-col gap-6">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product._id || index}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex flex-col sm:flex-row">
                                    <Link
                                        to={`/products/${product._id}`}
                                        className="sm:w-52 aspect-square flex-shrink-0 overflow-hidden"
                                    >
                                        <img
                                            src={`${product.images?.[0]}/300`}
                                            alt={product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </Link>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="flex justify-between items-start">
                                            <Link to={`/products/${product._id}`} className="block w-full">
                                                <h3 className="font-medium text-xl text-gray-900 mb-2 hover:underline hover:text-blue-600">
                                                    {product.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                                                    {product.description || "No description available for this product. Check the product page for more details."}
                                                </p>
                                            </Link>
                                            <button
                                                className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-gray-100 ml-4"
                                            >
                                                <Heart className="h-5 w-5 text-gray-400" />
                                            </button>
                                        </div>
                                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
                                            <div>
                                                <span className="text-2xl font-bold text-gray-900 block">
                                                    ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                                                </span>
                                                {product.originalPrice && (
                                                    <span className="text-sm text-gray-500 line-through">
                                                        ${typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(2) : product.originalPrice}
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 flex items-center transition-colors shadow-sm"
                                            >
                                                <ShoppingCart className="mr-2 h-4 w-4" />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
