import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { TopUtilityBar } from "../components/TopUtilityBar";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        setWatchlist(storedWatchlist);
    }, []);

    const removeFromWatchlist = (productId) => {
        const updatedWatchlist = watchlist.filter(product => product.id !== productId);
        setWatchlist(updatedWatchlist);
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    };

    return (
        <div className="min-h-screen bg-white">
            <TopUtilityBar />
            <Header />

            <div className="max-w-[1300px] mx-auto p-4 mb-10">
                <h1 className="text-2xl font-bold text-gray-800 my-5">My Watchlist</h1>

                {watchlist.length === 0 ? (
                    <div className="text-center flex flex-col items-center py-10 gap-5">
                        Your watchlist is empty.
                        <Link to="/home">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Back to Home</button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {watchlist.map(product => (
                            <div key={product.id} className="flex gap-4 p-4 border rounded-lg items-center">
                                <div className="relative w-48 h-48 bg-gray-100 rounded-lg overflow-hidden">
                                    <img
                                        src={`${product.image}/300`}
                                        alt={product.title}
                                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    />
                                    <button
                                        onClick={() => removeFromWatchlist(product.id)}
                                        className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white"
                                    >
                                        <Heart size={20} color="red" fill="red" />
                                    </button>
                                </div>
                                <div className="flex-1">
                                    <Link to={`/products/${product.id}`}>
                                        <h3 className="text-lg font-bold hover:text-blue-600 cursor-pointer">
                                            {product.title}
                                        </h3>
                                    </Link>
                                    <div className="text-sm text-gray-600 mt-1">
                                        {product.status === "available" ? "In Stock" : "Out of Stock"} · {product.category}
                                    </div>
                                    <div className="mt-2">
                                        <div className="text-xl font-semibold text-black">
                                            ${product.price.toFixed(2)}
                                        </div>
                                        {product.originalPrice && (
                                            <div className="text-sm text-gray-500 line-through">
                                                Was: ${product.originalPrice.toFixed(2)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-2 text-sm text-gray-600">Free shipping</div>
                                    <div className="mt-2 text-sm text-gray-600">{product.sold || 0} sold</div>
                                    <div className="mt-2 text-sm">{product.description}</div>
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
