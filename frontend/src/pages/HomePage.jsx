import { useState, useEffect, useMemo } from "react"
import { TopUtilityBar } from "../components/TopUtilityBar"
import { Header } from "../components/Header"
import { ProductSection } from "../components/ProductSection"
import { Footer } from "../components/Footer"
import { CategoryNav } from "../components/CategoryNav"
import { FeaturedCategories } from "../components/FeaturedCategories"
import { PromoBanner } from "../components/PromoBanner"
import { HeroSlider } from "../components/HeroSlider"
import { ProductToolbar } from "../components/ProductToolbar"

// Mock product data
const trendingProducts = [
    {
        id: "7",
        image:
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwaGFuZGJhZyUyMHByb2R1Y3R8ZW58MXx8fHwxNzcxOTA0NDgxfDA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Designer Leather Handbag Crossbody Shoulder Bag",
        price: "$149.99"
    },
    {
        id: "8",
        image:
            "https://images.unsplash.com/photo-1695028644151-1ec92bae9fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwY29udHJvbGxlcnxlbnwxfHx8fDE3NzE4Mzk4NzB8MA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Gaming Console Controller Wireless Pro Edition",
        price: "$69.99"
    },
    {
        id: "9",
        image:
            "https://images.unsplash.com/photo-1636678827521-09587493f2df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjBwbGFudHxlbnwxfHx8fDE3NzE4NDE4NzF8MA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Modern Ceramic Planter Set Home Decor Indoor",
        price: "$34.99"
    },
    {
        id: "10",
        image:
            "https://images.unsplash.com/photo-1662928245746-6b4a1e90f8e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbiUyMHByb2R1Y3R8ZW58MXx8fHwxNzcxODUzODQzfDA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Polarized Sunglasses UV Protection Fashion Style",
        price: "$49.99"
    },
    {
        id: "11",
        image:
            "https://images.unsplash.com/photo-1605050825473-dddb75d9e703?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWN5Y2xlJTIwb3V0ZG9vciUyMHNwb3J0fGVufDF8fHx8MTc3MTg4OTY5MHww&ixlib=rb-4.1.0&q=80&w=400",
        title: "Mountain Bike 21-Speed Aluminum Frame 26 Inch",
        price: "$399.99"
    },
    {
        id: "12",
        image:
            "https://images.unsplash.com/photo-1761503553976-691e7ac1ef30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGd1aXRhciUyMGluc3RydW1lbnR8ZW58MXx8fHwxNzcxODEyOTQ3fDA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Electric Guitar Solid Body with Amplifier Bundle",
        price: "$549.99"
    }
]

const recommendedProducts = [
    {
        id: "13",
        image:
            "https://images.unsplash.com/photo-1633934542430-0905ccb5f050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwcmluZyUyMGdvbGR8ZW58MXx8fHwxNzcxOTA0NDgyfDA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Diamond Ring 14K Gold Engagement Wedding Band",
        price: "$1,299.99"
    },
    {
        id: "14",
        image:
            "https://images.unsplash.com/photo-1770563182591-892c3180f66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMHRyYXZlbCUyMG91dGRvb3J8ZW58MXx8fHwxNzcxOTA0NDgzfDA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Travel Backpack Waterproof Laptop Compartment",
        price: "$79.99"
    },
    {
        id: "15",
        image:
            "https://images.unsplash.com/photo-1645020089957-608f1f0dfb61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2VyJTIwYXVkaW8lMjBzb3VuZHxlbnwxfHx8fDE3NzE5MDQ0ODN8MA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Bluetooth Speaker Waterproof Portable Bass",
        price: "$59.99"
    },
    {
        id: "16",
        image:
            "https://images.unsplash.com/photo-1697122235975-8cb2d056aed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHRlY2hub2xvZ3klMjBmbHlpbmd8ZW58MXx8fHwxNzcxOTA0NDg0fDA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Drone with 4K Camera GPS FPV Quadcopter",
        price: "$899.99"
    },
    {
        id: "17",
        image:
            "https://images.unsplash.com/photo-1756321426794-6006d7d3f161?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwcHJvZHVjdCUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzE5MDQ0Nzl8MA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Smartphone Accessories Bundle Case Screen Protector",
        price: "$29.99"
    },
    {
        id: "18",
        image:
            "https://images.unsplash.com/photo-1632222623518-bbbd5f1f2489?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzcxOTAzNjk4fDA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Camera Tripod Professional Heavy Duty Aluminum",
        price: "$119.99"
    }
]

const CATEGORY_IMAGES = {
    Fashion:
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&h=500&fit=crop",
    Electronics:
        "https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?w=500&h=500&fit=crop",
    "Home & Kitchen":
        "https://images.unsplash.com/photo-1681718601850-dc32bcf68ad8?w=500&h=500&fit=crop",
    "Health & Fitness":
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=500&fit=crop",
    Entertainment:
        "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&h=500&fit=crop",
};

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [viewMode, setViewMode] = useState("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState("featured");
    const [priceRange, setPriceRange] = useState([0, 1000]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productRes = await fetch('http://localhost:9999/products')
                const productData = await productRes.json()

                setProducts(productData)

                const categoryRes = await fetch('http://localhost:9999/categories')
                const categoryData = await categoryRes.json()

                setCategories(categoryData)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData();
    }, [])

    const sortedProducts = useMemo(() => {
        const filtered = products.filter(product => {
            const categoryId = product.categoryId?._id || product.category;

            const matchesCategory = selectedCategory
                ? categoryId === selectedCategory
                : true;

            const matchesSearch = searchQuery
                ? product.title.toLowerCase().includes(searchQuery.toLowerCase())
                : true;

            return matchesCategory && matchesSearch;
        });

        if (sortBy === "featured") {
            return filtered;
        }
        return [...filtered].sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            if (sortBy === "newest") return b.createdAt - a.createdAt;
            return 0;
        });
    }, [products, selectedCategory, searchQuery, sortBy]);

    const selectedCategoryName = selectedCategory
        ? categories.find(c => c._id === selectedCategory)?.name
        : "Today's Deals";

    return (
        <div className="min-h-screen bg-gray-50">
            <TopUtilityBar />
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <CategoryNav />

            {/* <HeroBanner /> */}
            <HeroSlider />

            <FeaturedCategories
                categories={categories}
                categoryImages={CATEGORY_IMAGES}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            <ProductToolbar
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                viewMode={viewMode}
                setViewMode={setViewMode}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onReset={() => {
                    setSelectedCategory(null);
                    setPriceRange([0, 1000]);
                    setSortBy("featured");
                    setSearchQuery("");
                }}
            />

            <ProductSection title={selectedCategoryName} subheading='All With Free Shipping' products={sortedProducts} viewMode={viewMode} />

            <div className="h-px bg-gray-200" />

            <ProductSection title="Trending Now" products={trendingProducts} />

            <PromoBanner />

            <ProductSection
                title="Recommended for you"
                products={recommendedProducts}
            />

            <Footer />
        </div>
    )
}
