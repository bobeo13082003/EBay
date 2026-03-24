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
import { MockProductSection } from "../components/MockProductSection"

// Mock product data
const trendingProducts = [
    {
        id: "7",
        image:
            "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=500&h=500&fit=crop",
        title: "Designer Leather Handbag Crossbody Shoulder Bag",
        price: "149.99"
    },
    {
        id: "8",
        image:
            "https://images.unsplash.com/photo-1695028644151-1ec92bae9fb0?w=500&h=500&fit=crop",
        title: "Gaming Console Controller Wireless Pro Edition",
        price: "69.99"
    },
    {
        id: "9",
        image:
            "https://images.unsplash.com/photo-1636678827521-09587493f2df?w=500&h=500&fit=crop",
        title: "Modern Ceramic Planter Set Home Decor Indoor",
        price: "34.99"
    },
    {
        id: "10",
        image:
            "https://images.unsplash.com/photo-1662928245746-6b4a1e90f8e4?crop=entropy?w=500&h=500&fit=crop",
        title: "Polarized Sunglasses UV Protection Fashion Style",
        price: "49.99"
    },
    {
        id: "11",
        image:
            "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&h=500&fit=crop",
        title: "Mountain Bike 21-Speed Aluminum Frame 26 Inch",
        price: "399.99"
    },
    {
        id: "12",
        image:
            "https://images.unsplash.com/photo-1605227686219-4318a9bce7c5?w=500&h=500&fit=crop",
        title: "Electric Guitar Solid Body with Amplifier Bundle",
        price: "549.99"
    }
]

const recommendedProducts = [
    {
        id: "13",
        image:
            "https://images.unsplash.com/photo-1613945407943-59cd755fd69e?w=500&h=500&fit=crop",
        title: "Diamond Ring 14K Gold Engagement Wedding Band",
        price: "1,299.99"
    },
    {
        id: "14",
        image:
            "https://plus.unsplash.com/premium_photo-1723649902734-60ec42167731?w=500&h=500&fit=crop",
        title: "Travel Backpack Waterproof Laptop Compartment",
        price: "79.99"
    },
    {
        id: "15",
        image:
            "https://images.unsplash.com/photo-1645020089957-608f1f0dfb61?w=500&h=500&fit=crop",
        title: "Bluetooth Speaker Waterproof Portable Bass",
        price: "59.99"
    },
    {
        id: "16",
        image:
            "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?w=500&h=500&fit=crop",
        title: "Drone with 4K Camera GPS FPV Quadcopter",
        price: "899.99"
    },
    {
        id: "17",
        image:
            "https://images.unsplash.com/photo-1612442058361-178007e5e498?w=500&h=500&fit=crop",
        title: "Smartphone Accessories Bundle Case Screen Protector",
        price: "29.99"
    },
    {
        id: "18",
        image:
            "https://images.unsplash.com/photo-1634680582783-0b06ca18a449?w=500&h=500&fit=crop",
        title: "Camera Tripod Professional Heavy Duty Aluminum",
        price: "119.99"
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
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState("featured");
    const [priceRange, setPriceRange] = useState([0, 5000]);

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

            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

            return matchesCategory && matchesPrice;
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
    }, [products, selectedCategory, sortBy, priceRange]);

    const selectedCategoryName = selectedCategory
        ? categories.find(c => c._id === selectedCategory)?.name
        : "Today's Deals";

    return (
        <div className="min-h-screen bg-gray-50">
            <TopUtilityBar />
            <Header />
            <CategoryNav />

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
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                onReset={() => {
                    setSelectedCategory(null);
                    setPriceRange([0, 5000]);
                    setSortBy("featured");
                    setSearchQuery("");
                }}
            />

            <ProductSection title={selectedCategoryName} subheading='All With Free Shipping' products={sortedProducts} viewMode={viewMode} />

            <div className="h-px bg-gray-200" />

            <MockProductSection title="Trending Now" products={trendingProducts} />

            <PromoBanner />

            <MockProductSection title="Recommended for you" products={recommendedProducts} />

            <Footer />
        </div>
    )
}
